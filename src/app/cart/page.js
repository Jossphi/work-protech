"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/storeData";

export default function Cart() {
  const { cart, updateCartQty, removeFromCart } = useStore();

  const cartLines = cart.map((l, i) => {
    const prod = PRODUCTS.find(x => x.id === l.id);
    return {
      ...l,
      index: i,
      name: prod.name,
      brand: prod.brand,
      img: prod.img,
      price: prod.price,
      total: prod.price * l.qty,
    };
  });

  const sub = cartLines.reduce((acc, l) => acc + l.total, 0);
  const net = sub / 1.18;
  const igv = sub - net;

  const fmt = (n) => `S/ ${n.toFixed(2)}`;

  return (
    <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "34px 20px 60px" }}>
      <h2 style={{ fontSize: "32px", margin: 0 }}>Tu carrito</h2>
      <hr className="hr" />
      {cart.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "44px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "var(--color-neutral-700)" }}>Aún no has agregado productos.</p>
          <Link href="/catalog" className="btn btn-primary" style={{ letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "13px", padding: "11px 22px", display: "inline-block" }}>
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "28px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "6px 20px 20px", gridColumn: "span 2", minWidth: 0 }}>
            <table className="table" style={{ width: "100%", fontSize: "14.5px" }}>
              <thead><tr><th style={{ textAlign: "left" }}>Producto</th><th style={{ textAlign: "center" }}>Talla</th><th style={{ textAlign: "center" }}>Cantidad</th><th style={{ textAlign: "right" }}>Importe</th></tr></thead>
              <tbody>
                {cartLines.map(l => (
                  <tr key={`${l.id}-${l.size}`}>
                    <td style={{ padding: "14px 0" }}>
                      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.img} alt={l.name} style={{ width: "66px", height: "52px", objectFit: "contain", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-sm)", background: "#fff" }} />
                        <div>
                          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "15px" }}>{l.name}</div>
                          <div className="wp-num" style={{ fontSize: "12.5px", color: "var(--color-neutral-700)" }}>{l.brand} · {fmt(l.price)} c/u</div>
                          <button onClick={() => removeFromCart(l.index)} style={{ fontSize: "12.5px", color: "var(--color-accent-700)", background: "transparent", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" }}>Quitar</button>
                        </div>
                      </div>
                    </td>
                    <td className="wp-num" style={{ textAlign: "center" }}>{l.size}</td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--color-neutral-400)", borderRadius: "var(--radius-md)" }}>
                        <button className="btn btn-ghost" onClick={() => updateCartQty(l.index, -1)} style={{ padding: "5px 11px" }}>−</button>
                        <span className="wp-num" style={{ minWidth: "30px", textAlign: "center" }}>{l.qty}</span>
                        <button className="btn btn-ghost" onClick={() => updateCartQty(l.index, 1)} style={{ padding: "5px 11px" }}>+</button>
                      </div>
                    </td>
                    <td className="wp-num" style={{ textAlign: "right", fontWeight: 600 }}>{fmt(l.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "24px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)" }}>Resumen</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14.5px", marginTop: "16px" }}><span>Subtotal</span><span className="wp-num">{fmt(net)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14.5px", marginTop: "8px" }}><span>IGV 18%</span><span className="wp-num">{fmt(igv)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14.5px", marginTop: "8px" }}><span>Envío Lima Metropolitana</span><span>Gratis</span></div>
            <hr className="hr" />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "17px" }}>Total</span>
              <span className="wp-num" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "24px" }}>{fmt(sub)}</span>
            </div>
            <Link 
              href="/checkout" 
              className="btn" 
              style={{ width: "100%", marginTop: "18px", background: "var(--color-accent)", color: "#fff", border: "1px solid var(--color-accent)", padding: "13px", fontSize: "13.5px", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center", display: "block" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-600)"; e.currentTarget.style.borderColor = "var(--color-accent-600)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
            >
              Continuar compra
            </Link>
            <Link href="/catalog" className="btn btn-ghost" style={{ width: "100%", marginTop: "8px", fontSize: "13px", textAlign: "center", display: "block" }}>
              Seguir comprando
            </Link>
            <div style={{ fontSize: "12.5px", color: "var(--color-neutral-700)", marginTop: "14px", lineHeight: 1.5 }}>
              Facturación con RUC disponible. Entrega en 24–48 h para stock en Lima.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
