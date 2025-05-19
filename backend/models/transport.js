const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobility: { type: String, required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  pickupMileage: { type: Number, required: true },
  dropoffMileage: { type: Number, required: true },
  totalMileage: { type: Number, required: true },
  pickupTime: { type: Date, required: true },
  dropoffTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  consent: { type: String, required: true },
  dnar: { type: String, required: true },
  respectForm: { type: String, required: true },
  bariatric: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Transport', TransportSchema);
