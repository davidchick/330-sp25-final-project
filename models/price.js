const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("prices", priceSchema);