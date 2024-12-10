const mongoose = require("mongoose");

const { Schema } = mongoose;

const leaderBoardSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    score: { type: Number },
    badge: { type: String },
    badgeImage: { type: String },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("leaderBoards", leaderBoardSchema);
