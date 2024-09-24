// import React, { useState, useEffect } from "react";
import Header from "../components/MyFlights/Header";
import "./MyFlights.css";
import info from "../assets/info.svg";
import MyFlightDetails from "../components/MyFlights/MyFlightDetails";
import { useEffect, useState } from "react";

export default function MyFlights() {
  const [myFlights, setMyFlights] = useState([]);

  useEffect(() => {
    const fetchMyFLights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reservations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setMyFlights(data);
      } catch (error) {
        throw error;
      }
    };

    fetchMyFLights();
  }, []);

  return (
    <div className="myflights_container">
      <div className="content">
        <Header />

        <div className="sort_fly">
          <div>
            <label>Sort by:</label>
            <select className="select_commend" name="" id="">
              <option value="r">Recommended</option>
            </select>
          </div>

          <div className="info_wrapper">
            <img src={info} alt="" />
            <p>
              Avg Fare: <b>$225</b>
            </p>
          </div>
        </div>

        <div className="myflights_items">
          {myFlights.map((item, index) => (
            <MyFlightDetails key={index} myFlight={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
