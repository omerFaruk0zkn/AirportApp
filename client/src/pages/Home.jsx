import React, { useState, useEffect } from "react";
import Header from "../components/Home/Header";
import ShowFlights from "../components/Home/ShowFlights";
import FlightDetails from "../components/Home/FlightDetails";
import FlightsFilter from "../components/Home/FlightsFilter";
import "./Home.css";
import Card from "../components/Home/Card";

import car from "../assets/car.jpg";
import hotel from "../assets/hotel.jpg";
import travel from "../assets/travel.jpg";
import carIcon from "../assets/car.svg";
import hotelIcon from "../assets/hotel.svg";
import travelIcon from "../assets/umbrella-on-ground.svg";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtrelenmiş ürünleri tutmak için state
  const [filteredProducts, setFilteredProducts] = useState(flights);

  const [isFiltered, setIsFiltered] = useState(false); // Filtreleme yapıldığını izlemek için state

  // Filtrelenmiş veriyi güncellemek için kullanılan fonksiyon
  const handleFilter = (filteredData) => {
    setFilteredProducts(filteredData); // Filtrelenmiş veriyi state'e ata
  };

  useEffect(() => {
    setLoading(true);
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flights", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setFlights(data.flights);
      } catch (error) {
        throw error;
      }
    };

    fetchFlights();
    setLoading(false);
  }, []);

  const flightsToShow = isFiltered ? filteredProducts : flights;

  return (
    <div>
      <div className="main_container">
        <Header />
        <div className="flights_info">
          <div style={{ width: "73%" }}>
            <ShowFlights
              flights={flights}
              onFilter={handleFilter}
              setIsFiltered={setIsFiltered}
              setLoading={setLoading}
            />
            <div className="flights_item_info">
              {loading ? (
                <div className="spinner_container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <>
                  {flightsToShow.length > 0 ? (
                    <div
                      className="flight_details_container"
                      style={{
                        width: "74%",
                        height: "75vh",
                        overflow: "scroll",
                      }}
                    >
                      {flightsToShow.map((flight, index) => (
                        <FlightDetails flight={flight} key={index} />
                      ))}
                    </div>
                  ) : (
                    <p className="no_result">No Result Found!</p>
                  )}
                </>
              )}
              <FlightsFilter />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Card
              image={car}
              icon={carIcon}
              title="CAR RENTALS"
              marginBottom="20px"
              bgColor="orange"
            />
            <Card
              image={hotel}
              icon={hotelIcon}
              title="HOTELS"
              marginBottom="20px"
              bgColor="blue"
            />
            <Card
              image={travel}
              icon={travelIcon}
              title="TRAVEL PACKAGES"
              marginBottom="5px"
              bgColor="green"
            />
          </div>
        </div>
      </div>
      <div className="shadow"></div>
    </div>
  );
}
