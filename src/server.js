const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
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

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen("3000", () => {
  console.log("Hurray! Server is running on PORT 3000");
});
