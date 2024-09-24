import React from "react";
import plane from "../../assets/plane.svg";
import plane4 from "../../assets/plane4.svg";
import deals from "../../assets/tag.svg";
import discover from "../../assets/discover.svg";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header_left">
        <img className="header_left__img" src={plane} alt="" />
        <h1 className="header_left__title">PLANE SCAPE</h1>
      </div>

      <div className="header_right">
        <div className="header_right__item">
          <img className="header_right__img" src={plane4} alt="" />
          <a className="header_right__link" href="/myflights">
            My FLights
          </a>
        </div>

        <div className="header_right__item">
          <img className="header_right__img" src={deals} alt="" />
          <a className="header_right__link" href="/#">
            Deals
          </a>
        </div>

        <div className="header_right__item">
          <img className="header_right__img" src={discover} alt="" />
          <a className="header_right__link" href="/#">
            Discover
          </a>
        </div>

        <div className="header_right__item">
          <div className="header_right__user"></div>
          <a className="header_right__userlink" href="/#">
            Joane Smith
          </a>
        </div>
      </div>
    </div>
  );
}
