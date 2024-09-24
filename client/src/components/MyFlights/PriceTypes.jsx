import React from "react";
import "./PriceTypes.css";

export default function PriceTypes({ price, type }) {
  return (
    <>
      {price && type && (
        <div className="price_items">
          <p className="price_items__price">${price}</p>
          <p className="price_items__type">{type}</p>
        </div>
      )}

      {!price && !type && (
        <div className="price_items_empty">
          <p price_items_empty__content>- - -</p>
        </div>
      )}
    </>
  );
}
