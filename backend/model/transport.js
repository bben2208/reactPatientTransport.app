const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({
  name: String,
  mobility: String,
  consent: String,
  dnar: String,
  respectForm: String,
  bariatric: String,
  pickup: String,
  dropoff: String,
  pickupMileage: Number,
  dropoffMileage: Number,
  totalMileage: Number,
  pickupTime: Date,
  dropoffTime: Date,
  duration: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Transport', TransportSchema);
