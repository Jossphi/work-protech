"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/storeData";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const p = PRODUCTS.find(x => x.id === id);
  const { addToCart } = useStore();

  const initialSize = p ? (p.sizes.length > 1 ? p.sizes[Math.floor(p.sizes.length / 2)] : p.sizes[0]) : null;
  const [size, setSize] = useState(initialSize);
  const [qty, setQty] = useState(1);

  if (!p) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Producto no encontrado. <Link href="/catalog">Volver al catálogo</Link></div>;
  }

  const pPriceFormatted = `S/ ${p.price.toFixed(2)}`;
  const showStock = true; // Based on original component prop default

  const incQty = () => setQty(q => q + 1);
  const decQty = () => setQty(q => Math.max(1, q - 1));

  const handleAdd = () => {
    addToCart(p.id, size, qty);
    router.push("/cart");
  };

  const pTiers = [
    { qty: '1 – 11 unidades', price: `S/ ${p.price.toFixed(2)}` },
    { qty: '12 – 47 unidades', price: `S/ ${(p.price * 0.92).toFixed(2)}` },
    { qty: '48 o más', price: `S/ ${(p.price * 0.85).toFixed(2)}` }
  ];

  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id)
    .concat(PRODUCTS.filter(x => x.cat !== p.cat))
    .slice(0, 4);

  return (
    <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "34px 20px 60px" }}>
      <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
        <Link href="/">Inicio</Link> / <Link href="/catalog">Catálogo</Link> / {p.name}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "40px", marginTop: "22px", alignItems: "start" }}>
        <div>
          <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginTop: "10px" }}>
            <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", aspectRatio: "1/1", padding: "10px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", aspectRatio: "1/1", padding: "10px", opacity: 0.65 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", transform: "scaleX(-1)" }} />
            </div>
            <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
              Ficha técnica
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 600 }}>{p.brand}</div>
          <h2 style={{ fontSize: "34px", margin: "10px 0 6px", lineHeight: 1.08 }}>{p.name}</h2>
          <div className="wp-num" style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>Código {p.code} · {p.norm}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", margin: "22px 0 4px" }}>
            <span className="wp-num" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "34px" }}>{pPriceFormatted}</span>
            <span style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>IGV incluido</span>
          </div>
          <div style={{ fontSize: "13.5px", color: "var(--color-accent-700)" }}>
            {showStock ? 'En stock — despacho en 24–48 h' : 'Disponible bajo pedido'}
          </div>
          <hr className="hr" />
          <p style={{ fontSize: "15.5px", lineHeight: 1.6, color: "var(--color-neutral-800)" }}>{p.desc}</p>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)", marginTop: "18px" }}>{p.sizeLabel}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
            {p.sizes.map(sz => {
              const isActive = sz === size;
              return (
                <button 
                  key={sz}
                  className="btn" 
                  onClick={() => setSize(sz)}
                  style={{ 
                    minWidth: "52px", padding: "8px 10px", fontSize: "13.5px", 
                    border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-neutral-400)'}`, 
                    background: isActive ? 'var(--color-accent-100)' : '#fff', 
                    color: isActive ? 'var(--color-accent-700)' : 'var(--color-text)' 
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = "var(--color-neutral-400)"; }}
                >
                  {sz}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-neutral-400)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <button className="btn btn-ghost" onClick={decQty} style={{ padding: "10px 14px", fontSize: "16px" }}>−</button>
              <span className="wp-num" style={{ minWidth: "44px", textAlign: "center", fontSize: "15px" }}>{qty}</span>
              <button className="btn btn-ghost" onClick={incQty} style={{ padding: "10px 14px", fontSize: "16px" }}>+</button>
            </div>
            <button 
              className="btn" 
              onClick={handleAdd}
              style={{ background: "var(--color-accent)", color: "#fff", border: "1px solid var(--color-accent)", padding: "12px 28px", fontSize: "13.5px", letterSpacing: "0.06em", textTransform: "uppercase" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-600)"; e.currentTarget.style.borderColor = "var(--color-accent-600)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
            >
              Agregar al carrito
            </button>
            <Link href="/quote" className="btn btn-ghost" style={{ padding: "12px 20px", fontSize: "13.5px" }}>Cotizar por volumen</Link>
          </div>
          <hr className="hr" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "14px" }}>
            {p.features.map((f, i) => (
              <div key={i} style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "12px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "14px" }}>{f[0]}</div>
                <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", lineHeight: 1.45 }}>{f[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px", background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "18px 20px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)", marginBottom: "10px" }}>Escalas de precio</div>
            <table className="table" style={{ width: "100%", fontSize: "14px" }}>
              <thead><tr><th style={{ textAlign: "left" }}>Cantidad</th><th style={{ textAlign: "right" }}>Precio unitario</th></tr></thead>
              <tbody>
                {pTiers.map((t, i) => (
                  <tr key={i}><td className="wp-num">{t.qty}</td><td className="wp-num" style={{ textAlign: "right" }}>{t.price}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "56px" }}>
        <h3 style={{ fontSize: "24px", margin: 0 }}>También te puede servir</h3>
        <hr className="hr" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "18px" }}>
          {related.map(r => (
            <ProductCard key={r.id} product={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
