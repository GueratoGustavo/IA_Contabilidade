const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    plan: {
      type: String,
      enum: ["withoutplan", "trial", "starter", "profissional", "enterprise"],
      default: "withoutplan",
    },

    trialExpiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
