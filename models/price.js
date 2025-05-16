const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  onsale: { type: Boolean, required: false },
  date: { type: Date, required: true },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stores",
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("prices", priceSchema);