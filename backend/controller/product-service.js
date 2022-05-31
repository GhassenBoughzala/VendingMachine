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

router.put("/admin/addQnt", isRequestValidated, async (req, res) => {
  try {
    let { id, quantity } = req.body;

    //const one = await Products.findById({ id });
    const updated = await Products.findByIdAndUpdate(
      id,
      { $set: { quantity: quantity } },
      { new: true }
    );
    if (quantity === "0") {
      await Products.findByIdAndUpdate(
        id,
        { $set: { status: "OutOfStock" } },
        { new: true }
      );
    } else {
      await Products.findByIdAndUpdate(
        id,
        { $set: { status: "Available" } },
        { new: true }
      );
    }

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

router.put("/took", isRequestValidated, async (req, res) => {
  try {
    let { id, quantity } = req.body;
    const one = await Products.findOne({ id });
    console.log(id);
    var result = parseInt(one.quantity) - 1;
    const to = result.toString();

    if (one.quantity === "0") {
      await Products.findByIdAndUpdate(
        id,
        { $set: { status: "OutOfStock" } },
        { new: true }
      );
      let data = await Products.find({});
      res.status(200).json(data);
    } else {
      await Products.findByIdAndUpdate(
        id,
        { $set: { status: "Available", quantity: to } },
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
