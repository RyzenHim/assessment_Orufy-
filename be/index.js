require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const dbUrl = process.env.URI;
const connectDb = require("./src/config/db");

connectDb();

app.listen(port, () => console.log("Server started at port:-", port));
