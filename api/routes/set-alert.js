// routes/alert.js
const express = require("express");
const Alert = require("../models/alertSchema");

const router = express.Router();

// Save alert criteria
router.post("/set-alert", async (req, res) => {
  try {
    const { email, cryptoId, priceThreshold } = req.body;
    const newAlert = new Alert({ email, cryptoId, priceThreshold });
    await newAlert.save();
    res.status(201).json({ message: "Alert criteria set successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to set alert" });
  }
});

module.exports = router;
