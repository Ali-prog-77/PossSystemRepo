const Bill = require("../models/Bill.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

router.get("/get-all-bills", async (req, res) => {
  try {
    const Bills = await Bill.find();
    res.status(200).json(Bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching Bills." });
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid JSON format or missing fields." });
  }
});


module.exports = router;
