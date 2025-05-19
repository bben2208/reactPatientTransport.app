const express = require("express");
const router = express.Router();
const Transport = require("../models/transport");
const { ensureAuthenticated } = require("../middleware/auth");

// Get All Transports
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const transports = await Transport.find();
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transports" });
  }
});

// Add a New Transport
router.post("/", ensureAuthenticated, async (req, res) => {
  const { patientName, transportDate, destination } = req.body;

  try {
    const newTransport = new Transport({ patientName, transportDate, destination });
    await newTransport.save();
    res.status(201).json({ message: "Transport added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding transport" });
  }
});

module.exports = router;
