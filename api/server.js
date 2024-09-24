const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 5000;
const {
  createReservation,
  getReservations,
} = require("./controllers/reservationController");
const { getFlights, getFlightById } = require("./controllers/flightController");

const db = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Middlewares
app.use(logger("dev")); // Logging middleware
app.use(express.json()); // JSON body parsing middleware

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://d70e-95-70-248-216.ngrok-free.app/",
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

// Preflight request handler for CORS
app.options("*", cors()); // Handle preflight requests for all routes

app.get("/api/flights", getFlights); // Flight işlemi için controller kullan
app.get("/api/flights/:id", getFlightById); // Flight işlemi için controller kullan

app.post("/api/reservations", createReservation); // Rezervasyon işlemi için controller kullan
app.get("/api/reservations", getReservations); // Rezervasyon işlemi için controller kullan

app.listen(port, () => {
  db();
  console.log(`Server running on port ${port}`);
});
