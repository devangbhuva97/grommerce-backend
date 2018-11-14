const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  _id: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  country: String,
  pincode: Number,
  gpluscode: Number
});

module.exports = mongoose.model("Address", addressSchema);
