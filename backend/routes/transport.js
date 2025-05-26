const express = require("express");
const router = express.Router();
const Transport = require("../models/transport");

// GET all transports for a user
router.get("/", async (req, res) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const transports = await Transport.find({ user });
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transports" });
  }
});

// POST a new transport
router.post("/", async (req, res) => {
  try {
    const newTransport = new Transport(req.body);
    const saved = await newTransport.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Transport creation failed", error: err });
  }
});

module.exports = router;
