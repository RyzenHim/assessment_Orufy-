const validator = require("validator");
const User = require("../models/user_model");
const Otp = require("../models/otp_model");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validator.isEmail("abc@gmail.com");
  } catch (err) {
    console.log("Error loggin in");
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, identifier } = req.body;

    if (!firstName || !lastName || !identifier) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
  } catch (err) {}
};

// module.exports = login;
