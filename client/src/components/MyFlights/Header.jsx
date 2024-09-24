import React from "react";
import "./Header.css";
import HeaderBtns from "./HeaderBtns";
import starBlack from "../../assets/star.svg";
import starGray from "../../assets/stargray.svg";

export default function Header() {
  return (
    <div className="header_container">
      <div className="btns_container">
        <HeaderBtns content="Times" />
        <HeaderBtns content="Stops" />
        <HeaderBtns content="Airlines" />
        <HeaderBtns content="Airports" />
        <HeaderBtns content="Amenities" />
        <select className="select_search" name="" id="">
          <option value="es">Edit Search</option>
        </select>
      </div>

      <div className="stars_container">
        <div className="stars_item">
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starGray} alt="" />
          <img className="star" src={starGray} alt="" />
          <img className="star" src={starGray} alt="" />
          <img className="star" src={starGray} alt="" />
        </div>

        <div className="vertical_div"></div>

        <div className="stars_item">
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starGray} alt="" />
          <img className="star" src={starGray} alt="" />
          <img className="star" src={starGray} alt="" />
        </div>

        <div className="vertical_div"></div>

        <div className="stars_item">
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starGray} alt="" />
          <img className="star" src={starGray} alt="" />
        </div>

        <div className="vertical_div"></div>

        <div className="stars_item">
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starGray} alt="" />
        </div>

        <div className="vertical_div"></div>

        <div className="stars_item">
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
          <img className="star" src={starBlack} alt="" />
        </div>
      </div>

      <div className="home_link">
        <a href="/">Home</a>
      </div>
    </div>
  );
}
