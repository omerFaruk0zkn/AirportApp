import React from "react";
import "./MyFlightDetails.css";
import delta from "../../assets/delta.png";
import PriceTypes from "./PriceTypes";

export default function MyFlightDetails({ myFlight }) {
  console.log(myFlight);

  const {
    contactInfo: { email, phone },
    passengerName,
    reservationId,
    status,
    flightInfo: {
      actualLandingTime,
      airportCodeArr,
      airportCodeDep,
      flightName,
      flightNumber,
      price,
      scheduleTime,
    },
  } = myFlight;

  return (
    <div className="wrapper">
      <div className="flight_container">
        <div style={{ width: "45%" }}>
          <div className="time_container">
            <img
              className="company_logo"
              src={delta}
              width={30}
              height={30}
              alt=""
            />
            <p className="time_text">
              {actualLandingTime} AM - {scheduleTime} AM
            </p>
          </div>

          <div className="flight_info">
            <div>
              <p className="flight_info_title" style={{ marginLeft: "3px" }}>
                Delta Air Lines
              </p>
              <select className="flight_details" name="" id="">
                <option value="fd">Flight Details</option>
              </select>
            </div>

            <div>
              <p className="flight_info_title">Nonstop</p>
              <p className="flight_info_text">1h 32m</p>
            </div>

            <div>
              <p className="flight_info_title">
                {airportCodeDep} to {airportCodeArr}
              </p>
              <p className="flight_info_text">
                {flightName} {flightNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="price_types">
          <PriceTypes price={price} type="Main" />
          <PriceTypes price="204" type="Comfort+" />
          <PriceTypes />
          <PriceTypes price="386" type="Delta One" />
          <PriceTypes />
        </div>
      </div>
      <div className="user_container">
        <div>
          <h5>Reservation Code</h5>
          <p>{reservationId}</p>
        </div>

        <div>
          <h5>Name</h5>
          <p>{passengerName}</p>
        </div>

        <div>
          <h5>E-mail</h5>
          <p>{email}</p>
        </div>

        <div>
          <h5>Tel</h5>
          {phone}
        </div>

        <div>
          <h5>Status</h5>
          {status}
        </div>
      </div>
    </div>
  );
}
