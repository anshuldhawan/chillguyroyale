const fs = require("fs");
const path = require("path");
const Questions = require("../model/questionsModal");
const { InvalidInputError } = require("../errors/invalid_input_error");
const { NotFoundError } = require("../errors/not_found_error");
const Users = require("../model/userModal");
const LeaderBoards = require("../model/leaderBoard");
const { HOSTNAME } = require("../../config/envs");
const { decrypt } = require("../utils/encrypt_helper");
const Minutes = 5 * 60 * 1000;

class QuestionsController {
  // Add a new question
  async addQuestion(req, res) {
    const imageName =
      req.files && req.files.image ? req.files.image[0].filename : null;
    const badgeImageName =
      req.files && req.files.badgeImage
        ? req.files.badgeImage[0].filename
        : null;

    // Validate input data
    const { question, option1, option2, correctOption, badgeName } = req.body;

    if (
      !question ||
      !option1 ||
      !option2 ||
      correctOption === undefined ||
      !badgeName
    ) {
      throw new InvalidInputError("Missing required fields.");
    }

    // Get the highest existing index in the database
    const highestIndexQuestion = await Questions.findOne()
      .sort({ index: -1 })
      .limit(1);
    const index = highestIndexQuestion ? highestIndexQuestion.index + 1 : 1;

    // Create a new question object
    const newQuestion = new Questions({
      index,
      image: `${HOSTNAME}/uploads/${imageName}`,
      question,
      option1,
      option2,
      correctOption,
      badgeImage: `${HOSTNAME}/uploads/${badgeImageName}`,
      badgeName,
    });

    // Save the new question to the database
    const savedQuestion = await newQuestion.save();
    return res.status(201).json({
      message: "Question added successfully",
      question: savedQuestion,
    });
  }

  // Edit an existing question
  async editQuestion(req, res) {
    try {
      const questionId = req.query.id;
      const questionData = await Questions.findById(questionId);
      if (!questionData) {
        throw new NotFoundError("Question not found.");
      }
      const { question, option1, option2, correctOption, badgeName } = req.body;

      if (question) questionData.question = question;
      if (option1) questionData.option1 = option1;
      if (option2) questionData.option2 = option2;
      if (correctOption !== undefined)
        questionData.correctOption = correctOption;
      if (badgeName) questionData.badgeName = badgeName;

      const uploadsDir = path.join(__dirname, "../../uploads");

      // If there is a new image, update the image field and remove the old image
      if (req.files && req.files.image) {
        const oldImagePath = questionData.image?.replace(
          `${HOSTNAME}/uploads/`,
          ""
        );
        if (oldImagePath) {
          const fullPath = path.join(uploadsDir, oldImagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
        questionData.image = `${HOSTNAME}/uploads/${req.files.image[0].filename}`;
      }

      // If there is a new badge image, update the badge image field and remove the old badge image
      if (req.files && req.files.badgeImage) {
        questionData.badgeImage = `${HOSTNAME}/uploads/${req.files.badgeImage[0].filename}`;
      }

      const updatedQuestion = await questionData.save();

      return res.status(200).json({
        message: "Question updated successfully",
        question: updatedQuestion,
      });
    } catch (error) {
      console.error("Error updating question:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a question
  async deleteQuestion(req, res) {
    const questionId = req.query.id;

    // Find the question to delete
    const questionToDelete = await Questions.findById(questionId);
    if (!questionToDelete) {
      throw new NotFoundError("Question not found.");
    }

    // Delete the question
    await Questions.deleteOne({ _id: questionId });
    // Update the index values of remaining questions
    await Questions.updateMany(
      { index: { $gt: questionToDelete.index } },
      { $inc: { index: -1 } }
    );
    return res.status(200).json({
      message: "Question deleted successfully",
    });
  }

  async getAllQuestions(req, res) {
    try {
      const questions = await Questions.find({}).lean();
      const totalCount = await Questions.countDocuments();
      return res.status(200).json({
        questions,
        totalCount,
      });
    } catch (error) {
      console.error("Error fetching all questions:", error);
      return res.status(500).json({ error: "Failed to fetch questions" });
    }
  }

  async getQuestionByEncryptedIndex(req, res) {
    const encryptedIndex = req.query.index;
    const leaderBoardId = req.query.leaderBoardId;
    // Find the leaderboard entry for the user
    const leaderboardEntry = await LeaderBoards.findById(leaderBoardId);
    if (!leaderboardEntry) {
      throw new NotFoundError("Invalid Game");
    }
    if (leaderboardEntry?.active === false) {
      return res.status(400).json({
        message: "Leaderboard session has expired. Please start a new game.",
      });
    }
    const oneHourAgo = new Date().getTime() - Minutes;
    if (new Date(leaderboardEntry.updatedAt).getTime() < oneHourAgo) {
      return res.status(400).json({
        message: "Leaderboard session has expired. Please start a new game.",
      });
    }
    // Decrypt the index value
    const decryptedIndex = await decrypt(encryptedIndex);

    // Validate the decrypted index
    if (isNaN(decryptedIndex) || decryptedIndex < 0) {
      throw new InvalidInputError("Invalid encrypted index.");
    }

    // Find the question by the decrypted index
    const question = await Questions.findOne({
      index: decryptedIndex,
    }).lean();
    delete question.correctOption;
    if (!question) {
      throw new NotFoundError("Question not found.");
    }

    return res.status(200).json({ question });
  }

  async getTotalCount(req, res) {
    const totalCount = await Questions.countDocuments();
    return res.status(200).json({
      totalCount,
    });
  }

  async startGame(req, res) {
    const userId = req.auth.id;
    const user = await Users.findById(userId);

    if (!user) {
      throw new InvalidInputError("User not found.");
    }

    if (user.credits < 1) {
      return res
        .status(400)
        .json({ message: "Not enough credits to start the game." });
    }
    user.credits -= 1;
    await user.save();

    const leaderboardEntry = new LeaderBoards({
      userId,
      score: 0,
    });

    await leaderboardEntry.save();
    return res
      .status(200)
      .json({ message: "Game started", leaderBoard: leaderboardEntry });
  }

  async validateAnswerAndUpdateLeaderboard(req, res) {
    const userId = req.auth.id;
    const { questionId, selectedOption, leaderBoardId } = req.body;

    // Find the leaderboard entry for the user
    const leaderboardEntry = await LeaderBoards.findById(leaderBoardId);
    if (!leaderboardEntry) {
      throw new NotFoundError("Invalid Game");
    }
    const leaderUserId = leaderboardEntry.userId.toString();
    if (leaderUserId !== userId) {
      throw new NotFoundError("Invalid User for this game");
    }
    if (leaderboardEntry?.active === false) {
      return res.status(400).json({
        message: "Leaderboard session has expired. Please start a new game.",
      });
    }
    const oneHourAgo = new Date().getTime() - Minutes;
    if (new Date(leaderboardEntry.updatedAt).getTime() < oneHourAgo) {
      return res.status(400).json({
        message: "Leaderboard session has expired. Please start a new game.",
      });
    }
    // Find the question by ID
    let question = await Questions.findById(questionId)
      .select("index badgeImage correctOption badgeName")
      .lean();
    if (!question) {
      throw new NotFoundError("Question not found.");
    }

    // Check if the selected option is correct
    const isCorrect = selectedOption === question.correctOption;
    const points = isCorrect ? 1 : 0;

    if (isCorrect) {
      leaderboardEntry.score =
        parseInt(leaderboardEntry.score) + parseInt(points);
      leaderboardEntry.badge = question.badgeName;
      leaderboardEntry.badgeImage = question.badgeImage;
      const isLastQuestion =
        (await Questions.countDocuments()) === question.index;
      if (isLastQuestion) {
        leaderboardEntry.active = false;
      }
      await leaderboardEntry.save();
      delete question?.correctOption;
      return res.status(200).json({
        status: true,
        message: "Correct answer!",
        score: leaderboardEntry.score,
        question: question,
      });
    } else {
      leaderboardEntry.active = false;
      await leaderboardEntry.save();
      const index = question.index - 1;
      question = await Questions.findOne({ index: index })
        .select("badgeImage badgeName")
        .lean();
      return res.status(200).json({
        status: false,
        message: "Wrong answer, try again!",
        score: leaderboardEntry.score,
        question: question,
      });
    }
  }

  async leaderBoard(req, res) {
    try {
      const topUsers = await LeaderBoards.aggregate([
        { $match: { score: { $gt: 0 } } },
        { $sort: { userId: 1, score: -1 } },
        {
          $group: {
            _id: "$userId",
            highestScore: { $first: "$score" },
            badge: { $first: "$badge" },
            badgeImage: { $first: "$badgeImage" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        { $sort: { highestScore: -1 } },
        { $limit: 25 },
      ]);
  
      const formattedLeaderboard = topUsers.map((entry) => ({
        userId: {
          name: entry.userDetails.name,
        },
        score: entry.highestScore,
        badge: entry.badge,
        badgeImage: entry.badgeImage,
      }));
  
      return res.status(200).json({
        leaderboard: formattedLeaderboard,
      });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}

module.exports = QuestionsController;
