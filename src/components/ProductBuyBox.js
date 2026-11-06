"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { swatchStyle } from "@/lib/colors";

export default function ProductBuyBox({ product: p }) {
  const { addToCart } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState(p.colors.length === 1 ? p.colors[0].name : null);
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);

  const colorEntry = p.colors.find((c) => c.name === color);
  const sizeAvailable = (s) => !colorEntry || colorEntry.sizes.includes(s);
  const image = p.images[imgIdx] || p.images[0];

  const pickColor = (name) => {
    setColor(name);
    setError("");
    const entry = p.colors.find((c) => c.name === name);
    if (size && entry && !entry.sizes.includes(size)) setSize(null);
  };

  const add = () => {
    if (!color) return setError("Elige un color.");
    if (!size) return setError("Elige una talla.");
    const n = Math.max(1, Math.min(9999, Number(qty) || 1));
    addToCart(
      { slug: p.slug, name: p.name, code: p.code, color, size, image: p.images[0]?.url },
      n
    );
    setAdded({ color, size, qty: n });
    setError("");
    setQty(1);
  };

  return (
    <>
      <div>
        <div className="gallery-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image?.url} alt={image?.alt || p.name} />
        </div>
        {p.images.length > 1 && (
          <div className="thumbs">
            {p.images.map((im, i) => (
              <button
                key={im.url}
                type="button"
                className={`thumb ${i === imgIdx ? "active" : ""}`}
                onClick={() => setImgIdx(i)}
                aria-label={`Ver imagen ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.url} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="eyebrow">{p.brand}</div>
        <h1>{p.name}</h1>
        <div className="muted wp-num" style={{ fontSize: 13.5 }}>
          {p.product_type} · Código {p.code}
        </div>
        <div style={{ fontSize: 14, marginTop: 8 }}>{p.norm}</div>
        <hr className="hr" />

        <div className="label">
          Color{color ? <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--color-text)" }}>: {color}</span> : null}
        </div>
        <div className="opt-row">
          {p.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              className={`opt ${color === c.name ? "active" : ""}`}
              onClick={() => pickColor(c.name)}
              aria-pressed={color === c.name}
            >
              <span className="swatch" style={swatchStyle(c.name)} />
              {c.name}
            </button>
          ))}
        </div>

        <div className="label" style={{ marginTop: 20 }}>{p.variant_label || "Talla"}</div>
        <div className="opt-row">
          {p.sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`opt ${size === s ? "active" : ""}`}
              onClick={() => { setSize(s); setError(""); }}
              disabled={!sizeAvailable(s)}
              aria-pressed={size === s}
              title={sizeAvailable(s) ? s : `No disponible en ${color}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="label" style={{ marginTop: 20 }}>Cantidad</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 10 }}>
          <div className="qty">
            <button type="button" onClick={() => setQty((q) => Math.max(1, (Number(q) || 1) - 1))} aria-label="Restar">−</button>
            <input
              type="number"
              min="1"
              inputMode="numeric"
              value={qty}
              onChange={(e) => setQty(e.target.value.replace(/\D/g, "").slice(0, 4))}
              onBlur={() => setQty((q) => Math.max(1, Number(q) || 1))}
              aria-label="Cantidad"
              className="wp-num"
            />
            <button type="button" onClick={() => setQty((q) => (Number(q) || 0) + 1)} aria-label="Sumar">+</button>
          </div>
          <button type="button" className="btn-solid" onClick={add} style={{ flex: "1 1 220px" }}>
            Agregar al carrito
          </button>
        </div>

        {error && <div className="error-box" style={{ marginTop: 12 }}>{error}</div>}
        {added && (
          <div className="notice" role="status">
            <span>
              Agregado: <strong className="wp-num">{added.qty}</strong> × {p.name} · {added.color} · Talla {added.size}
            </span>
            <span style={{ display: "flex", gap: 14 }}>
              <Link href="/catalog">Seguir comprando</Link>
              <Link href="/cart">Ver carrito</Link>
            </span>
          </div>
        )}

        <p className="muted" style={{ fontSize: 13, marginTop: 18, lineHeight: 1.55 }}>
          Sin pagos en línea: al finalizar, envías tu pedido por WhatsApp y te respondemos con la cotización y la disponibilidad.
        </p>
      </div>
    </>
  );
}
