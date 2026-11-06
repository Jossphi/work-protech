"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function Cart() {
  const { cart, count, loaded, setQty, removeFromCart } = useStore();

  if (!loaded) return <section className="wrap" style={{ padding: "40px 20px" }} />;

  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 32, margin: 0 }}>Tu carrito</h1>
      <hr className="hr" />
      {cart.length === 0 ? (
        <div className="panel" style={{ padding: 44, textAlign: "center" }}>
          <p className="muted" style={{ fontSize: 16 }}>Aún no has agregado productos.</p>
          <Link href="/catalog" className="btn-solid">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="panel" style={{ padding: "4px 20px" }}>
            {cart.map((l) => (
              <div key={l.key} className="cart-line">
                <Link href={`/product/${l.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt={l.name} />
                </Link>
                <div style={{ minWidth: 0 }}>
                  <Link href={`/product/${l.slug}`} style={{ fontWeight: 700, fontSize: 16, color: "var(--color-text)" }}>{l.name}</Link>
                  <div className="meta">Color: {l.color} · Talla: {l.size} · Código {l.code}</div>
                  <button type="button" className="link-btn" onClick={() => removeFromCart(l.key)} style={{ marginTop: 6 }}>Quitar</button>
                </div>
                <div className="qty-col">
                  <div className="qty">
                    <button type="button" onClick={() => setQty(l.key, l.qty - 1)} aria-label="Restar">−</button>
                    <input
                      type="number"
                      min="1"
                      inputMode="numeric"
                      className="wp-num"
                      value={l.qty}
                      onChange={(e) => {
                        const n = Number(e.target.value.replace(/\D/g, "").slice(0, 4));
                        if (n > 0) setQty(l.key, n);
                      }}
                      aria-label={`Cantidad de ${l.name}`}
                    />
                    <button type="button" onClick={() => setQty(l.key, l.qty + 1)} aria-label="Sumar">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="panel" style={{ padding: 24 }}>
            <div className="label">Resumen</div>
            <div className="summary-line" style={{ marginTop: 12 }}><span>Productos distintos</span><span className="wp-num">{cart.length}</span></div>
            <div className="summary-line"><span>Total de prendas</span><span className="wp-num"><strong>{count}</strong></span></div>
            <hr className="hr" />
            <Link href="/checkout" className="btn-solid btn-block">Finalizar compra</Link>
            <Link href="/catalog" className="btn-outline btn-block" style={{ marginTop: 10 }}>Seguir comprando</Link>
            <p className="muted" style={{ fontSize: 12.5, marginTop: 14, lineHeight: 1.5 }}>
              Completarás tus datos y el pedido se enviará por WhatsApp a Work Protech. Te responderemos con la cotización y los plazos de entrega.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
