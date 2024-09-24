import React, { useEffect, useState } from "react";
import "./ShowFlights.css";
import plane2 from "../../assets/plane2.svg";
import planeDown from "../../assets/plane-land-svgrepo-com.svg";
import planeUp from "../../assets/plane-take-off-svgrepo-com.svg";
import calendar from "../../assets/calendar.svg";

export default function ShowFlights({
  flights,
  onFilter,
  setIsFiltered,
  setLoading,
}) {
  const [searchDepCountry, setSearchDepCountry] = useState(""); // Input değerini tutar
  const [searchArrCountry, setSearchArrCountry] = useState(""); // Input değerini tutar
  const [searchDepDate, setSearchDepDate] = useState(""); // Input değerini tutar
  const [searchArrDate, setSearchArrDate] = useState(""); // Input değerini tutar

  // Submit'e basıldığında tetiklenecek state
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const filtered = flights.filter((flight) => {
        const filteredDepCountry =
          typeof flight.departure.depCountry === "string"
            ? flight.departure.depCountry
                .trim()
                .toLowerCase()
                .includes(searchDepCountry.trim().toLowerCase())
            : "";
        const filteredArrCountry =
          typeof flight.arrival.arrCountry === "string"
            ? flight.arrival.arrCountry
                .trim()
                .toLowerCase()
                .includes(searchArrCountry.trim().toLowerCase())
            : "";
        const filteredDepDate =
          typeof flight.departure.actualLandingDate === "string"
            ? flight.departure.actualLandingDate
                .trim()
                .toLowerCase()
                .includes(searchDepDate.trim().toLowerCase())
            : "";
        const filteredArrDate =
          typeof flight.arrival.scheduleDate === "string"
            ? flight.arrival.scheduleDate
                .trim()
                .toLowerCase()
                .includes(searchArrDate.trim().toLowerCase())
            : "";

        return (
          filteredDepCountry &&
          filteredArrCountry &&
          filteredDepDate &&
          filteredArrDate
        );
      });
      onFilter(filtered);
      setIsSubmitted(false); // Submit işlemi tamamlandıktan sonra resetle
    }
  }, [
    isSubmitted,
    flights,
    onFilter,
    searchDepCountry,
    searchArrCountry,
    searchArrDate,
    searchDepDate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    setIsSubmitted(true); // Form submit edildiğini işaretle
    setIsFiltered(true);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="container_flex">
        <div className="title_container">
          <img className="title_img" src={plane2} alt="" />
          <h2 className="title">BOOK YOUR FLIGHT</h2>
        </div>
        <div>
          <button className="btn_left">Round trip</button>
          <button className="btn_right">One way</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="inputs_container">
            <div className="input_item">
              <img className="input_item__img" src={planeUp} alt="" />
              <input
                className="input"
                type="text"
                value={searchDepCountry}
                onChange={(e) => setSearchDepCountry(e.target.value)}
              />
            </div>
            <div className="input_item">
              <img className="input_item__img" src={planeDown} alt="" />
              <input
                className="input"
                type="text"
                value={searchArrCountry}
                onChange={(e) => setSearchArrCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="inputs_container">
            <div className="input_item">
              <img className="input_item__img" src={calendar} alt="" />
              <input
                className="input"
                type="text"
                placeholder="YYYY-MM-DD"
                value={searchDepDate}
                onChange={(e) => setSearchDepDate(e.target.value)}
              />
            </div>
            <div className="input_item">
              <img className="input_item__img" src={calendar} alt="" />
              <input
                className="input"
                type="text"
                placeholder="YYYY-MM-DD"
                value={searchArrDate}
                onChange={(e) => setSearchArrDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <button type="submit" className="show_btn">
            Show flights
          </button>
        </div>
      </form>
    </div>
  );
}
