"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { PRODUCTS } from "@/data/storeData";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");

  // Load cart from local storage on init (optional, but good practice)
  useEffect(() => {
    const saved = localStorage.getItem("wp_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("wp_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pId, size, qty = 1) => {
    setCart((prev) => {
      const newCart = [...prev];
      const p = PRODUCTS.find((x) => x.id === pId);
      if (!p) return prev;
      const sz = size || (p.sizes.length > 1 ? p.sizes[Math.floor(p.sizes.length / 2)] : p.sizes[0]);
      
      const index = newCart.findIndex((l) => l.id === pId && l.size === sz);
      if (index >= 0) {
        newCart[index] = { ...newCart[index], qty: newCart[index].qty + qty };
      } else {
        newCart.push({ id: pId, size: sz, qty: qty });
      }
      return newCart;
    });
  };

  const updateCartQty = (index, delta) => {
    setCart((prev) => {
      const newCart = [...prev];
      const newQty = newCart[index].qty + delta;
      if (newQty <= 0) {
        newCart.splice(index, 1);
      } else {
        newCart[index] = { ...newCart[index], qty: newQty };
      }
      return newCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        query,
        setQuery,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
