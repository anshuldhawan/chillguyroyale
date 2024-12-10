const Credit = require("../model/creditModal");
const { InvalidInputError } = require("../errors/invalid_input_error");
const { NotFoundError } = require("../errors/not_found_error");
const Transaction = require("../model/transaction");
const Users = require("../model/userModal");

class CreditController {
  // Add a new credit package
  async addCreditPackage(req, res) {
    const { currency, amountIn, credit } = req.body;

    if (!currency || !amountIn || !credit) {
      throw new InvalidInputError("All fields are required.");
    }

    const newCreditPackage = new Credit({ currency, amountIn, credit });
    await newCreditPackage.save();

    return res.status(201).json({
      message: "Credit package added successfully",
      creditPackage: newCreditPackage,
    });
  }

  // getAll credit package
  async getAllCredits(req, res) {
    try {
      const credit = await Credit.find({}).lean();
      const totalCount = await Credit.countDocuments();
      return res.status(200).json({
        credit,
        totalCount,
      });
    } catch (error) {
      console.error("Error fetching all credit:", error);
      return res.status(500).json({ error: "Failed to fetch credit" });
    }
  }

  // Edit an existing credit package
  async editCreditPackage(req, res) {
    const { id } = req.query;
    const { currency, amountIn, credit } = req.body;

    // Find the credit package by ID
    const creditPackage = await Credit.findById(id);

    if (!creditPackage) {
      throw new NotFoundError("Credit package not found.");
    }

    // Update the fields
    if (currency) creditPackage.currency = currency;
    if (amountIn) creditPackage.amountIn = amountIn;
    if (credit) creditPackage.credit = credit;

    // Save the updated credit package
    await creditPackage.save();

    return res.status(200).json({
      message: "Credit package updated successfully",
    });
  }

  // Delete a credit package by ID
  async deleteCreditPackage(req, res) {
    const { id } = req.query;

    // Find the credit package by ID
    const creditPackage = await Credit.findById(id);

    if (!creditPackage) {
      throw new NotFoundError("Credit package not found.");
    }

    await creditPackage.remove();

    return res.status(200).json({
      message: "Credit package deleted successfully",
    });
  }

  async buyCredits(req, res) {
    const userId = req.auth.id;
    const { currency, amountIn, credit, transactionHash } = req.body;

    if (!userId || !currency || !amountIn || !credit || !transactionHash) {
      throw new InvalidInputError("All fields are required.");
    }
    const existingTransaction = await Transaction.findOne({ transactionHash }).lean();
    if (existingTransaction) {
      throw new InvalidInputError("Invalid Transaction. Please try again");
    }
    // Create the transaction entry
    const newTransaction = new Transaction({
      userId,
      currency,
      amountIn,
      credit,
      transactionHash,
    });
    await newTransaction.save();

    const user = await Users.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found.");
    }
    user.credits += Number(credit);
    await user.save();

    return res.status(201).json({
      message: "Transaction created and credits updated successfully.",
      updatedUser: user,
    });
  }
}

module.exports =  CreditController;
