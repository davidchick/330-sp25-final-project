const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("stores", storeSchema);