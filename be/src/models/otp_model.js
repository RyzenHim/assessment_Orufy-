const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
    },

    otp: {
      type: Number,
      required: true,
    },

    expiresAt: {
      type: Date,
      default: () => Date.now() + 5 * 60 * 1000,
      expires: 0,
    },

    firstName: String,

    lastName: String,

    // profilePic: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Otp", otpSchema);
