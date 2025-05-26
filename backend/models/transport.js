const mongoose = require("mongoose");

const TransportSchema = new mongoose.Schema({
  name: String,
  mobility: String,
  pickup: String,
  dropoff: String,
  pickupMileage: Number,
  dropoffMileage: Number,
  pickupTime: String,
  dropoffTime: String,
  consent: String,
  dnar: String,
  respectForm: String,
  bariatric: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transport", TransportSchema);
