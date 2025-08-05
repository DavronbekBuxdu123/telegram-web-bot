import React from "react";

export default function Cart({ cartItem, checkOut }) {
  let sum = 0;
  const hisobla = () => {
    cartItem.map((c) => (sum += c.price * c.quantity));
  };
  hisobla();
  return (
    <div className="cart__container">
      <p style={{ marginBottom: "0" }}>
        Umumiy narx
        {sum.toLocaleString("en-Us", {
          style: "currency",
          currency: "USD",
        })}{" "}
      </p>
      <button
        onClick={checkOut}
        disabled={cartItem.length === 0}
        className={`btn btn-success py-2 px-4 `}
      >
        {cartItem.length === 0 ? "Buyurtma berish" : "To'lov"}
      </button>
    </div>
  );
}
