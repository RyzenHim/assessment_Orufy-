const User = require("../models/user_model");
const Otp = require("../models/otp_model");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const sendOtpMail = require("../utils/sendOtpMail");

const detectIdentifierType = (identifier) => {
  if (validator.isEmail(identifier)) {
    return "email";
  }

  if (validator.isMobilePhone(identifier, "en-IN")) {
    return "phone";
  }

  return null;
};

const createToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sendOtp = async (identifier, identifierType, otp) => {
  if (identifierType === "email") {
    await sendOtpMail(identifier, otp);
    return;
  }

  console.log(`OTP for ${identifier}: ${otp}`);
};

const buildUserPayload = (identifier, identifierType, fallbackData = {}) => ({
  firstName: fallbackData.firstName || "User",
  lastName: fallbackData.lastName || "",
  email: identifierType === "email" ? identifier : undefined,
  phone: identifierType === "phone" ? identifier : undefined,
});

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
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      {
        upsert: true,
        new: true,
      },
    );

    await sendOtp(identifier, identifierType, otp);

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

exports.verifySignupOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({
        success: false,
        message: "Identifier and OTP required",
      });
    }

    const otpDoc = await Otp.findOne({ identifier });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (String(otpDoc.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const identifierType = detectIdentifierType(identifier);

    if (!identifierType) {
      return res.status(400).json({
        success: false,
        message: "Enter valid email or phone number",
      });
    }

    let user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      user = await User.create(
        buildUserPayload(identifier, identifierType, otpDoc),
      );
    }

    await Otp.deleteOne({ identifier });

    return res.status(200).json({
      success: true,
      message: "Signup successful",
      token: createToken(user),
      user,
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
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      {
        upsert: true,
        new: true,
      },
    );

    await sendOtp(identifier, identifierType, otp);

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

    const otpDoc = await Otp.findOne({ identifier });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (String(otpDoc.otp) !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please signup.",
      });
    }

    await Otp.deleteOne({ identifier });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: createToken(user),
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
