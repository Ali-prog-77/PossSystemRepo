const User = require("../models/User.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());

router.get("/get-all-users", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching Users." });
  }
});

router.get("/get-a-users", async (req, res) => {
    const userId = req.body.userId;
    try {
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  


module.exports = router;
