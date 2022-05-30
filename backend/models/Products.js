const mongoose = require("mongoose");

const ProductsShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["OutOfStock", "Available"],
    default: "Available"
  },
});

module.exports = mongoose.model("Products", ProductsShema);
