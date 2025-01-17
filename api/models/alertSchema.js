// models/Alert.js
const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  email: { type: String, required: true },
  cryptoId: { type: String, required: true },
  priceThreshold: { type: Number, required: true },
});

module.exports = mongoose.model("Alert", AlertSchema);
