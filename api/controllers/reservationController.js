const Reservation = require("../models/reservationModel");
const axios = require("axios");

exports.createReservation = async (req, res) => {
  const { flightId, passengerName, contactInfo } = req.body;

  // body den alınan bilgiler yoksa hata ver ve kodu daha çalıştırma.
  if (!flightId || !passengerName || !contactInfo) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const flightResponse = await axios.get(
      `http://localhost:5000/api/flights/${flightId}`
    );

    if (!flightResponse.data) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const flightData = flightResponse.data;
    const stops = flightData.baggageClaim.belts.length;

    const flightInfo = {
      flightName: flightData.flightName.slice(0, 2),
      flightNumber: flightData.flightName.slice(2),
      actualLandingTime:
        typeof flightData.actualLandingTime === "string"
          ? flightData.actualLandingTime.slice(11, 16)
          : "",
      scheduleTime:
        typeof flightData.scheduleTime === "string"
          ? flightData.scheduleTime.slice(0, 5)
          : "",
      airportCodeDep:
        flightData.flightDirection === "D"
          ? "AMS"
          : flightData.route.destinations[0],
      airportCodeArr:
        flightData.flightDirection === "A"
          ? "AMS"
          : flightData.route.destinations[0],
      price: calculatePrice(stops),
    };

    function calculatePrice(stops) {
      return stops === 0 ? "200" : "230"; // Basit fiyat hesaplaması
    }

    const reservation = new Reservation({
      flightId,
      passengerName,
      contactInfo,
      reservationId: Math.random().toString(36).substr(2, 9),
      status: "confirmed",
      flightInfo,
    });
    console.log("Attempting to save reservation:", reservation);
    const savedReservation = await reservation.save();
    console.log("Reservation saved successfully:");

    res.status(201).json({
      message: "Reservation confirmed",
      reservation: savedReservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations" });
  }
};
