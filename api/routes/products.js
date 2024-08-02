const Product = require("../models/Product.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

router.get("/get-all-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid JSON format or missing fields." });
  }
});

router.put("/update-product", async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the product." });
  }
});

router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the product." });
  }
});

module.exports = router;
