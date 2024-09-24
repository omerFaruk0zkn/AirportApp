import React from "react";
import "./FlightDetails.css";
import planeDown from "../../assets/airplane-landing.svg";
import planeUp from "../../assets/airplane-take-off.svg";
import plane3 from "../../assets/plane3.svg";
import alitalia from "../../assets/pngwing.com.png";
import { useNavigate } from "react-router-dom";

export default function FlightDetails({ flight }) {
  const navigate = useNavigate();

  const handleBookFlight = () => {
    navigate(`/reservation-info/${flight.flightId}`, {
      state: {
        flight,
      },
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="container_details">
        <h5 className="details_title">
          {flight.departure.depCountry} - {flight.arrival.arrCountry}
        </h5>

        <div className="details">
          <div className="details_item">
            <div className="direction">
              <img className="direction_img" src={planeUp} alt="" />
              <p className="direction_text">Departure</p>
            </div>
            <p className="details_item__time">
              {flight.departure.actualLandingTime} AM
            </p>
            <p className="details_item__type">
              Airport: {flight.departure.airportCode}
            </p>
          </div>

          <div className="line"></div>

          <div className="time">
            <img className="company_img" src={alitalia} alt="" />
            <img className="time_img" src={plane3} alt="" />
            <p className="time_item">2h 25m (Nonstop)</p>
          </div>

          <div className="line"></div>

          <div className="details_item">
            <div className="direction">
              <img className="direction_img" src={planeDown} alt="" />
              <p className="direction_text">Arrival</p>
            </div>
            <p className="details_item__time">
              {flight.arrival.scheduleTime} AM
            </p>
            <p className="details_item__type">
              Airport: {flight.arrival.airportCode}
            </p>
          </div>
        </div>

        <div>
          <p className="price">Price: {flight.price}</p>
          <p className="round_trip">Round Trip</p>
        </div>

        <div className="btn_wrapper">
          <button className="btn_flight" onClick={handleBookFlight}>
            Book Flight
          </button>
        </div>
      </div>
      <a className="detail_link" href="/#">
        Check the details
      </a>
    </div>
  );
}
