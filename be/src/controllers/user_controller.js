const validator = require("validator");

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

    if (!firstName || !lastName || !identifier)
      return res.status(400).json({ message: "All fields are required!" });
  } catch (err) {}
};

// module.exports = login;
