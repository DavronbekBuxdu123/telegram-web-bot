import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "./constants/db";
import Card from "./components/Card";
import Cart from "./components/Cart";
const courses = getData();
const telegram = window.Telegram.WebApp;
export default function App() {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    telegram.ready();
  }, []);
  useEffect(() => {
    if (cartItem.length > 0) {
      telegram.MainButton.text = "Sotib olish :)";
      telegram.MainButton.show();
    } else {
      telegram.MainButton.hide();
    }
  }, [cartItem]);

  const addItem = (item) => {
    const existItem = cartItem.find((c) => c.id === item.id);
    console.log("ishladi");
    if (existItem) {
      const newData = cartItem.map((c) =>
        c.id === item.id
          ? { ...existItem, quantity: existItem.quantity + 1 }
          : c
      );
      setCartItem(newData);
    } else {
      const newData = [...cartItem, { ...item, quantity: 1 }];
      setCartItem(newData);
    }
  };

  const removeItem = (item) => {
    const existItem = cartItem.find((c) => c.id === item.id);
    if (existItem.quantity === 1) {
      const newData = cartItem.filter((c) => c.id !== item.id);
      setCartItem(newData);
    } else {
      const newData = cartItem.map((c) =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setCartItem(newData);
    }
  };
  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify(cartItem));
  }, [cartItem]);
  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white", marginTop: "5px" }}>
        Sammi kurslar
      </h1>
      <Cart cartItem={cartItem} />
      <div className="cards__container">
        {courses.map((cours) => (
          <Card
            key={cours.id}
            cours={cours}
            addItem={addItem}
            removeItem={removeItem}
          />
        ))}
      </div>
    </>
  );
}
