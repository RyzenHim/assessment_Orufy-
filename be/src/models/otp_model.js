const otpSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
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
