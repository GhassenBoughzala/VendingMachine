const express = require("express");
const Products = require("../models/Products");
const {
  validateAddProduct,
  isRequestValidated,
} = require("../middleware/productValidator");
const router = express.Router();

router.post("/", validateAddProduct, isRequestValidated, async (req, res) => {
  try {
    let { title, price, quantity } = req.body;
    const newProduct = new Products({
      title,
      price,
      quantity,
    });
    const one = await Products.findOne({ title });
    if (one) {
      res.status(403).json({
        error: true,
        msg: "Product already exist !",
      });
    } else {
      newProduct.save().then(() => res.json(newProduct));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

router.get("/", async (req, res) => {
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

router.delete("/", isRequestValidated, async (req, res) => {
  try {
    let { id } = req.body;
    const delted = await Products.deleteOne({ _id: id });
    res.status(200).json(delted);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

router.put("/", validateAddProduct, isRequestValidated, async (req, res) => {
  try {
    let { id, title, price, quantity } = req.body;
    const one = await Products.findOne({ title });
    if (one) {
      res.status(403).json({
        error: true,
        msg: "Product already exist !",
      });
    } else {
      const updated = await Products.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      let data = await Products.find({});
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
