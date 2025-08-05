import React from "react";

export default function Cart({ cartItem, checkOut }) {
  let sum = 0;
  const hisobla = () => {
    cartItem.map((c) => (sum += c.price * c.quantity));
  };
  hisobla();
  return (
    <div className="cart__container">
      <p style={{ marginBottom: "0", color: "white" }}>
        Umumiy narx
        {sum.toLocaleString("en-Us", {
          style: "currency",
          currency: "USD",
        })}{" "}
      </p>
    </div>
  );
}
