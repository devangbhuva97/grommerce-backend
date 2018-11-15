const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: String,
  name: String
});

module.exports = mongoose.model("Category", categorySchema);
