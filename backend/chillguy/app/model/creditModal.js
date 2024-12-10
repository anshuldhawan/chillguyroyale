const mongoose = require("mongoose");

const { Schema } = mongoose;

const crediSchema = new Schema(
  {
    currency: { type: String, enum: ["SOL", "CHILL-GUY"], default: "SOL" },
    amountIn: { type: String },
    credit: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Credit", crediSchema);
