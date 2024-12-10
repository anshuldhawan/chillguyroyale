const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { SALT_ROUNDS } = require("../../config/envs");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String },
    publicKey: { type: String },
    name: { type: String },
    password: {
      type: String,
      set: (password) => {
        const hash = bcrypt.hashSync(password, SALT_ROUNDS);
        return hash;
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    credits: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
