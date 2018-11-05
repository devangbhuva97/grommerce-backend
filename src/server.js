const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGO_CONNECTION,
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));
const app = express();

app.listen("3000", () => {
  console.log("Hurray! Server is running on PORT 3000");
});
