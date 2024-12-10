const express = require("express");
const router = express.Router();
const QuestionsController = require("../controllers/question.controller");
const { uploader } = require("../utils/upload_helper");

const adminOnly = require("../middlewares/admin.middleware");
const questions = new QuestionsController();

// Add a new question
router.post(
  "/add",
  adminOnly,
  uploader([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "badgeImage",
      maxCount: 1,
    },
  ]),
  questions.addQuestion
);
// Edit an existing question
router.put(
  "/update",
  adminOnly,
  uploader([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "badgeImage",
      maxCount: 1,
    },
  ]),
  questions.editQuestion
);
// delete question
router.delete("/delete", adminOnly, questions.deleteQuestion);

router.get("/", questions.getQuestionByEncryptedIndex);
router.get("/all", questions.getAllQuestions);
router.get("/total", questions.getTotalCount);
router.post("/startGame", questions.startGame);
router.post("/validate", questions.validateAnswerAndUpdateLeaderboard);
router.get("/leaderBoard", questions.leaderBoard);

module.exports = router;
