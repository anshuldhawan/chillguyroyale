const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    currency: { type: String, enum: ["SOL", "CHILL-GUY"], default: "SOL" },
    amountIn: { type: String },
    credit: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    transactionHash: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
