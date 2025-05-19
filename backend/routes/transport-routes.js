const express = require('express');
const router = express.Router();
const Transport = require('../model/transport');
const { ensureAuthenticated } = require('../middleware/auth');

// Get Transports
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const transports = await Transport.find({ user: req.user._id });
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transports' });
  }
});

// Add Transport
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    const newTransport = new Transport({ ...req.body, user: req.user._id });
    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (err) {
    res.status(500).json({ message: 'Error adding transport' });
  }
});

module.exports = router;
