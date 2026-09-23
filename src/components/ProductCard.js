"use client";

import Link from "next/link";
import { CATS } from "@/data/storeData";

export default function ProductCard({ product }) {
  const catLabel = CATS.find(c => c.id === product.cat)?.label || "";

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
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", paddingTop: "8px" }}>
          <a 
            className="btn btn-primary" 
            href={`https://wa.me/51984108672?text=${encodeURIComponent('Hola, me interesa el producto: ' + product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "12px", padding: "7px 12px", letterSpacing: "0.05em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
