const mongoose = require("mongoose");

// Database kısmı için şema oluşturma.
const reservationSchema = new mongoose.Schema({
  flightId: {
    type: String,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  reservationId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  flightInfo: {
    flightName: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    actualLandingTime: {
      type: String,
      required: true,
    },
    scheduleTime: {
      type: String,
      required: true,
    },
    airportCodeDep: {
      type: String,
      required: true,
    },
    airportCodeArr: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
});

// reservations adında database e kaydetme
const reservations = mongoose.model("reservations", reservationSchema);

module.exports = reservations;
