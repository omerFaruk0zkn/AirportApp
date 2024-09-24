import React from "react";
import "./FlightsFilter.css";

export default function FlightsFilter() {
  return (
    <div className="sort_container">
      <div>
        <p className="sort_title">Sort by:</p>
        <div className="select_container">
          <select className="sort_select" name="" id="">
            <option value="lp">Lowest Price</option>
          </select>
        </div>
      </div>

      <div>
        <p className="sort_title">Arrival Time</p>
        <div className="radio_margin">
          <input type="radio" name="time" />
          <label htmlFor="">5:00 AM - 11:59 AM</label>
        </div>
        <div>
          <input type="radio" name="time" />
          <label htmlFor="">12:00 PM - 5:59 PM</label>
        </div>
      </div>

      <div>
        <p className="sort_title">Stops</p>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="stop" />
            <label htmlFor="">Nonstop</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="stop" />
            <label htmlFor="">1 Stop</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex">
          <div>
            <input type="radio" name="stop" />
            <label htmlFor="">2+ Stops</label>
          </div>
          <p>$230</p>
        </div>
      </div>

      <div>
        <p className="sort_title">Airlines Included</p>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="airlineType" />
            <label htmlFor="">Alitalia</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="airlineType" />
            <label htmlFor="">Lufthansa</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="airlineType" />
            <label htmlFor="">Air France</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="airlineType" />
            <label htmlFor="">Brussels Airlines</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex radio_margin">
          <div>
            <input type="radio" name="airlineType" />
            <label htmlFor="">Air Italy</label>
          </div>
          <p>$230</p>
        </div>
        <div className="radio_flex">
          <div>
            <input type="radio" name="airlineType" />
            <label htmlFor="">Siberia</label>
          </div>
          <p>$230</p>
        </div>
      </div>
    </div>
  );
}
