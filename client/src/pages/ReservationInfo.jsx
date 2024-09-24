import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./ReservationInfo.css";

export default function ReservationInfo() {
  const { flightId } = useParams();
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("confirmed");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state.flight;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReservation = {
      flightId: flightId,
      passengerName,
      contactInfo: {
        email,
        phone,
      },
      status,
      flightInfo: {
        flightName: state.flightName.slice(0, 2),
        flightNumber: state.flightName.slice(2),
        actualLandingTime: state.departure.actualLandingTime,
        scheduleTime: state.arrival.scheduleTime,
        airportCodeDep: state.departure.airportCode,
        airportCodeArr: state.arrival.airportCode,
        price: state.price,
      },
    };

    try {
      await axios.post(
        "http://localhost:5000/api/reservations",
        newReservation
      );
      setMessage("Reservation created successfully!");
      setTimeout(() => {
        navigate("/myflights");
      }, 500);
    } catch (error) {
      console.error("Error creating reservation:", error);
      setMessage("Failed to create reservation");
    }
  };

  return (
    <div className="reservation_container">
      <h1>Create a New Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form_item">
          <label>Passenger Name</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
        </div>
        <div className="form_item">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form_item">
          <label>Phone</label>
          <input
            type="number"
            value={phone}
            maxLength={11}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form_item">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit">Create Reservation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
