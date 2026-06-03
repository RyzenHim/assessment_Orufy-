const User = require("../models/user_model");
const Otp = require("../models/otp_model");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const detectIdentifierType = (identifier) => {
  if (validator.isEmail(identifier)) {
    return "email";
  }

  if (validator.isMobilePhone(identifier, "en-IN")) {
    return "phone";
  }

  return null;
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, identifier } = req.body;

    if (!firstName || !lastName || !identifier) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const identifierType = detectIdentifierType(identifier);

    if (!identifierType) {
      return res.status(400).json({
        success: false,
        message: "Enter valid email or phone number",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.findOneAndUpdate(
      { identifier },

      {
        firstName,
        lastName,
        identifier,
        otp,
      },

      {
        upsert: true,
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "Identifier is required",
      });
    }

    const identifierType = detectIdentifierType(identifier);

    if (!identifierType) {
      return res.status(400).json({
        success: false,
        message: "Enter valid email or phone number",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please signup.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.findOneAndUpdate(
      { identifier },

      {
        identifier,
        otp,
      },

      {
        upsert: true,
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyLoginOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        message: "Identifier and OTP required",
      });
    }

    const otpDoc = await Otp.findOne({
      identifier,
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otpDoc.otp != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" },
    );

    await Otp.deleteOne({
      identifier,
    });

    return res.status(200).json({
      success: true,

      message: "Login successful",

      token,

      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyLoginOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    const otpDoc = await Otp.findOne({
      identifier,
    });

    if (!otpDoc) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" },
    );

    await Otp.deleteOne({
      identifier,
    });

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
