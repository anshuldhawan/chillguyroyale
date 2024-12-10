const mongoose = require("mongoose");
const { HOSTNAME } = require("../../config/envs");

const { Schema } = mongoose;

const questionsSchema = new Schema(
  {
    index: { type: Number, unique: true },
    image: { type: String },
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    correctOption: { type: Number },
    badgeImage: { type: String },
    badgeName: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Questions", questionsSchema);
