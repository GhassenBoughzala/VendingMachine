const express = require("express");
const Products = require("../models/Products");
const {
  validateAddProduct,
  isRequestValidated,
} = require("../middleware/productValidator");
const router = express.Router();

router.post("/", validateAddProduct, isRequestValidated, async (req, res) => {
  let { title, price, quantity } = req.body;
  const newProduct = new Products({
    title,
    price,
    quantity,
  });
  newProduct.save().then(() => res.json(newProduct));
});

router.get("/all", async (req, res) => {
  try {
    let data = await Products.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
