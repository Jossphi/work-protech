"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/storeData";

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartLines = cart.map(l => {
    const prod = PRODUCTS.find(x => x.id === l.id);
    return {
      name: prod.name,
      qty: l.qty,
      total: prod.price * l.qty,
    };
  });

  const sub = cartLines.reduce((acc, l) => acc + l.total, 0);
  const fmt = (n) => `S/ ${n.toFixed(2)}`;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "34px 20px 60px" }}>
      <h2 style={{ fontSize: "32px", margin: 0 }}>Finalizar pedido</h2>
      <hr className="hr" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "28px", alignItems: "start" }}>
        <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)" }}>Datos de facturación</div>
          <div className="field"><label>Razón social o nombre</label><input className="input" placeholder="Constructora Andina S.A.C." /></div>
          <div className="field"><label>RUC / DNI</label><input className="input" placeholder="20615339637" /></div>
          <div className="field"><label>Correo</label><input className="input" placeholder="compras@empresa.com" /></div>
          <div className="field"><label>Dirección de entrega</label><input className="input" placeholder="Av. Argentina 2020, Callao" /></div>
          <div className="field"><label>Orden de compra (opcional)</label><input className="input" placeholder="OC-2026-0142" /></div>
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "24px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)" }}>Tu pedido</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
            {cartLines.map((l, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "14px" }}>
                <span>{l.name} × <span className="wp-num">{l.qty}</span></span>
                <span className="wp-num">{fmt(l.total)}</span>
              </div>
            ))}
          </div>
          <hr className="hr" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "17px" }}>Total</span>
            <span className="wp-num" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "24px" }}>{fmt(sub)}</span>
          </div>
          <button 
            className="btn" 
            onClick={handlePlaceOrder}
            style={{ width: "100%", marginTop: "18px", background: "var(--color-accent)", color: "#fff", border: "1px solid var(--color-accent)", padding: "13px", fontSize: "13.5px", letterSpacing: "0.06em", textTransform: "uppercase" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-600)"; e.currentTarget.style.borderColor = "var(--color-accent-600)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
          >
            Confirmar pedido
          </button>
          <div style={{ fontSize: "12.5px", color: "var(--color-neutral-700)", marginTop: "12px", lineHeight: 1.5 }}>
            Te enviaremos la proforma por correo; el despacho se coordina al confirmar el pago o la orden de compra.
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div style={{ marginTop: "24px", border: "1px solid var(--color-accent)", background: "var(--color-accent-100)", borderRadius: "var(--radius-md)", padding: "20px 24px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "18px" }}>Pedido registrado</div>
          <div style={{ fontSize: "14.5px", color: "var(--color-neutral-800)" }}>Un asesor de Work Protech te contactará dentro de las próximas 2 horas hábiles.</div>
        </div>
      )}
    </section>
  );
}
