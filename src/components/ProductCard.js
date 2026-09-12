"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { CATS } from "@/data/storeData";

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const catLabel = CATS.find(c => c.id === product.cat)?.label || "";

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product.id, null, 1);
  };

  const formattedPrice = `S/ ${product.price.toFixed(2)}`;

  return (
    <div 
      className="card" 
      style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", overflow: "hidden", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--color-neutral-400)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--color-divider)"; }}
    >
      <Link href={`/product/${product.id}`} style={{ display: "block", position: "relative", background: "#fff", aspectRatio: "4/3", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }} />
        <span style={{ position: "absolute", top: "10px", left: "10px", background: "var(--color-neutral-900)", color: "#fff", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px" }}>
          {product.brand}
        </span>
      </Link>
      <div style={{ padding: "14px 16px 16px", borderTop: "1px solid var(--color-divider)", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <div style={{ fontSize: "11.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>{catLabel}</div>
        <Link 
          href={`/product/${product.id}`} 
          style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "16.5px", lineHeight: 1.2, color: "var(--color-text)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text)"}
        >
          {product.name}
        </Link>
        <div style={{ fontSize: "12.5px", color: "var(--color-neutral-700)" }}>{product.norm}</div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", paddingTop: "8px" }}>
          <span className="wp-num" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "19px" }}>{formattedPrice}</span>
          <button 
            className="btn btn-primary" 
            onClick={handleAdd} 
            style={{ fontSize: "12px", padding: "7px 12px", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
