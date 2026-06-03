require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const dbUrl = process.env.URI;
const connectDb = require("./src/config/db");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  }),
);
app.use(express.json());

connectDb();

const user = require("./src/routes/user_route");
app.use("/user", user);

// const product = require("./src/routes/product_route");
// app.use("product", product);

app.listen(port, () => console.log("Server started at port:-", port));
