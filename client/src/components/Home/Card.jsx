import React from "react";
import "./Card.css";

export default function Card({ image, title, icon, marginBottom, bgColor }) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url("${image}")`,
        marginBottom: `${marginBottom}`,
      }}
    >
      <div className="bg_color" style={{ backgroundColor: `${bgColor}` }}></div>
      <img className="card_img" src={icon} alt="" />
      <p className="card_text">{title}</p>
    </div>
  );
}
