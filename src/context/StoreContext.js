"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "wp_cart_v2";
const EVENT = "wp-cart-change";
const StoreContext = createContext(null);

// Carrito guardado en localStorage. Una línea: { key, slug, name, code, color, size, qty, image }
let cache = { raw: undefined, value: [] };

function read() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {}
  if (raw !== cache.raw) {
    let value = [];
    try {
      const parsed = JSON.parse(raw || "[]");
      if (Array.isArray(parsed)) value = parsed;
    } catch {}
    cache = { raw, value };
  }
  return cache.value;
}

function write(next) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb) {
  const onStorage = (e) => e.key === STORAGE_KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

const lineKey = (slug, color, size) => `${slug}|${color || ""}|${size || ""}`;
const update = (fn) => write(fn(read()));

export function StoreProvider({ children }) {
  // En el servidor (y en la primera hidratación) el carrito aún no está cargado.
  const stored = useSyncExternalStore(subscribe, read, () => null);
  const loaded = stored !== null;
  const cart = useMemo(() => stored || [], [stored]);

  const addToCart = useCallback((item, qty = 1) => {
    const key = lineKey(item.slug, item.color, item.size);
    update((prev) => {
      const i = prev.findIndex((l) => l.key === key);
      if (i >= 0) return prev.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { ...item, key, qty }];
    });
  }, []);

  const setQty = useCallback((key, qty) => {
    update((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const removeFromCart = useCallback((key) => update((prev) => prev.filter((l) => l.key !== key)), []);
  const clearCart = useCallback(() => write([]), []);

  const count = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const value = { cart, count, loaded, addToCart, setQty, removeFromCart, clearCart };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
