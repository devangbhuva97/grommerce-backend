const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
  _id: String,
  name: String,
  addressId: String,
  contactNo: Number,
  email: String,
  website: String,
  products: Array
});

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
