const express = require("express");
const Products = require("../models/Products");
const {
  validateAddProduct,
  isRequestValidated,
} = require("../middleware/productValidator");
const router = express.Router();

router.post("/", validateAddProduct, isRequestValidated, async (req, res) => {
  try {
    let { title, price, quantity, img } = req.body;
    const newProduct = new Products({
      title,
      price,
      quantity,
      img,
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
    const one = await Products.findById(id);
    var oldQ = parseInt(one.quantity);
    var newQ = parseInt(1);
    var result = oldQ + newQ;
    const to = result.toString();
    if (one.quantity === "0") {
      const out = await Products.findByIdAndUpdate(
        id,
        { $set: { status: "OutOfStock" } },
        { new: true }
      );
      res.status(404).json({
        error: true,
        msg: "Product out of stock",
      });
    } else {
      const updated = await Products.findByIdAndUpdate(
        id,
        { $set: { quantity: to } },
        { new: true }
      );
      if (updated.quantity === "0") {
        const outOfStock = await Products.findByIdAndUpdate(
          id,
          { $set: { quantity: to, status: "OutOfStock" } },
          { new: true }
        );
        res.status(200).json(outOfStock);
      } else {
        res.status(200).json(updated);
      }
    }
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
    const one = await Products.findById(id);
    var oldQ = parseInt(one.quantity);
    var newQ = parseInt(1);
    var result = oldQ - newQ;
    const to = result.toString();
    if (one.quantity === "0") {
      const out = await Products.findByIdAndUpdate(
        id,
        { $set: { status: "OutOfStock" } },
        { new: true }
      );
      res.status(404).json({
        error: true,
        msg: "Product out of stock",
      });
    } else {
      const updated = await Products.findByIdAndUpdate(
        id,
        { $set: { quantity: to } },
        { new: true }
      );
      if (updated.quantity === "0") {
        const outOfStock = await Products.findByIdAndUpdate(
          id,
          { $set: { quantity: to, status: "OutOfStock" } },
          { new: true }
        );
        res.status(200).json(outOfStock);
      } else {
        res.status(200).json(updated);
      }
    }

    //res.status(200).json({oldQ, newQ, result});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
});

module.exports = router;
