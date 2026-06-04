const mongoose = require("mongoose");
const URI = process.env.URI;

const connnectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected");
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = connnectDB;
