const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: String,
  categoryId: String,
  name: String,
  title: String,
  description: String,
  manufactureDate: Date,
  expireDate: Date,
  manufacturerId: String
});

module.exports = mongoose.model("Product", productSchema);
