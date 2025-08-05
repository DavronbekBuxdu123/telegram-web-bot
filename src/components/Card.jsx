import React, { useState } from "react";

export default function Card({ cours, addItem, removeItem }) {
  const [count, setCount] = useState(0);
  const handleDecrement = () => {
    setCount((prev) => prev + 1);
    addItem(cours);
  };
  const handleIncrement = () => {
    setCount((prev) => prev - 1);
    removeItem(cours);
  };
  return (
    <div className="card__">
      {count > 0 ? (
        <div className="count__">
          <p style={{ marginBottom: "0" }}>{count}</p>
        </div>
      ) : (
        <div className="count__ count__--hidden">
          <p style={{ marginBottom: "0" }}>0</p>
        </div>
      )}

      <div className="card__header">
        <div className="">
          <img
            src={cours.Image}
            alt={cours.title}
            width="100%"
            height="250px"
          />
        </div>
      </div>
      <div className="card__body">
        <h2>{cours.title}</h2>
        <div>
          <h3>
            {cours.price.toLocaleString("en-Us", {
              style: "currency",
              currency: "USD",
            })}
          </h3>
        </div>
      </div>
      <hr style={{ width: "95%", margin: "auto", color: "white" }} />
      <div className="btn__container">
        <button onClick={handleDecrement} className="btn btn-light px-5">
          +
        </button>
        {count !== 0 && (
          <button onClick={handleIncrement} className="btn btn-danger px-5 ">
            -
          </button>
        )}
      </div>
    </div>
  );
}
