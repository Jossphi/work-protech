"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

const EMPTY = { name: "", documentType: "DNI", documentId: "", phone: "", email: "", address: "", notes: "" };

function Field({ id, label, required, error, children }) {
  return (
    <div className="fld">
      <label htmlFor={id}>
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
      {error && <div className="err" id={`${id}-err`}>{error}</div>}
    </div>
  );
}

export default function Checkout() {
  const { cart, count, loaded, clearCart } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle" });

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 3) er.name = "Escribe tu nombre completo.";
    const doc = form.documentId.trim();
    if (form.documentType === "DNI" && !/^\d{8}$/.test(doc)) er.documentId = "El DNI debe tener 8 dígitos.";
    else if (form.documentType !== "DNI" && !/^[A-Za-z0-9-]{5,20}$/.test(doc)) er.documentId = "Número de documento no válido.";
    if (form.phone.replace(/\D/g, "").length < 7) er.phone = "Escribe un número de teléfono válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = "Escribe un correo válido.";
    if (form.address.trim().length < 5) er.address = "Escribe tu dirección.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          website,
          items: cart.map((l) => ({ slug: l.slug, color: l.color, size: l.size, qty: l.qty })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setStatus({ state: "error", message: data.error || "No se pudo registrar el pedido. Inténtalo de nuevo." });
        return;
      }
      clearCart();
      setStatus({ state: "done", orderNumber: data.orderNumber, whatsappUrl: data.whatsappUrl });
      window.location.href = data.whatsappUrl;
    } catch {
      setStatus({ state: "error", message: "No hay conexión. Revisa tu internet e inténtalo de nuevo." });
    }
  };

  if (!loaded) return <section className="wrap" style={{ padding: "40px 20px" }} />;

  if (status.state === "done") {
    return (
      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 60, maxWidth: 720 }}>
        <div className="panel" style={{ padding: 36, textAlign: "center" }}>
          <div className="eyebrow">Pedido registrado</div>
          <h1 style={{ fontSize: 30, margin: "10px 0" }}>¡Gracias! Tu pedido es el <span className="wp-num">{status.orderNumber}</span></h1>
          <p className="muted" style={{ fontSize: 15.5, lineHeight: 1.6 }}>
            Estamos abriendo WhatsApp con el detalle de tu pedido. Solo pulsa <strong>Enviar</strong> en el chat para que nos llegue.
            Si WhatsApp no se abrió, usa el botón:
          </p>
          <a href={status.whatsappUrl} className="btn-solid btn-whatsapp" target="_blank" rel="noopener noreferrer" style={{ marginTop: 10 }}>
            Enviar pedido por WhatsApp
          </a>
          <div style={{ marginTop: 18 }}>
            <Link href="/catalog">Volver al catálogo</Link>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="wrap" style={{ paddingTop: 30, paddingBottom: 60 }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>Finalizar compra</h1>
        <hr className="hr" />
        <div className="panel" style={{ padding: 44, textAlign: "center" }}>
          <p className="muted" style={{ fontSize: 16 }}>Tu carrito está vacío.</p>
          <Link href="/catalog" className="btn-solid">Ir al catálogo</Link>
        </div>
      </section>
    );
  }

  const sending = status.state === "sending";

  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 60 }}>
      <div className="breadcrumb"><Link href="/cart">Carrito</Link> / Finalizar compra</div>
      <h1 style={{ fontSize: 32, margin: "8px 0 0" }}>Finalizar compra</h1>
      <hr className="hr" />
      <div className="cart-layout">
        <form className="panel" style={{ padding: 24 }} onSubmit={submit} noValidate>
          <div className="label" style={{ marginBottom: 16 }}>Tus datos</div>
          <div className="form-grid">
            <div className="full">
              <Field id="name" label="Nombre completo" required error={errors.name}>
                <input id="name" autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} />
              </Field>
            </div>
            <Field id="documentId" label="Documento de identidad" required error={errors.documentId || errors.documentType}>
              <div className="doc-row">
                <select value={form.documentType} onChange={set("documentType")} aria-label="Tipo de documento">
                  <option>DNI</option>
                  <option>Pasaporte</option>
                  <option>Carné de extranjería</option>
                </select>
                <input
                  id="documentId"
                  inputMode={form.documentType === "DNI" ? "numeric" : "text"}
                  maxLength={form.documentType === "DNI" ? 8 : 20}
                  placeholder={form.documentType === "DNI" ? "8 dígitos" : "Número"}
                  value={form.documentId}
                  onChange={set("documentId")}
                  aria-invalid={!!errors.documentId}
                />
              </div>
            </Field>
            <Field id="phone" label="Número de teléfono" required error={errors.phone}>
              <input id="phone" type="tel" autoComplete="tel" placeholder="+51 9XX XXX XXX" value={form.phone} onChange={set("phone")} aria-invalid={!!errors.phone} />
            </Field>
            <div className="full">
              <Field id="email" label="Correo electrónico" required error={errors.email}>
                <input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} />
              </Field>
            </div>
            <div className="full">
              <Field id="address" label="Dirección" required error={errors.address}>
                <input id="address" autoComplete="street-address" placeholder="Calle, número, distrito, ciudad" value={form.address} onChange={set("address")} aria-invalid={!!errors.address} />
              </Field>
            </div>
            <div className="full">
              <Field id="notes" label="Comentario (opcional)">
                <textarea id="notes" placeholder="Ej.: personalización con logo, fecha de entrega, facturar con RUC…" value={form.notes} onChange={set("notes")} maxLength={1000} />
              </Field>
            </div>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
          </div>

          {status.state === "error" && <div className="error-box" style={{ marginTop: 16 }}>{status.message}</div>}

          <button type="submit" className="btn-solid btn-whatsapp btn-block" style={{ marginTop: 20 }} disabled={sending}>
            {sending ? "Enviando…" : "Enviar pedido por WhatsApp"}
          </button>
          <p className="muted" style={{ fontSize: 12.5, marginTop: 10, lineHeight: 1.5 }}>
            Al enviar, guardamos tu pedido y se abre WhatsApp con el detalle listo para mandar a Work Protech.
          </p>
        </form>

        <aside className="panel" style={{ padding: 24 }}>
          <div className="label">Tu pedido</div>
          <div style={{ marginTop: 10 }}>
            {cart.map((l) => (
              <div key={l.key} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--color-divider)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt="" style={{ width: 48, height: 48, objectFit: "contain", background: "#fff", border: "1px solid var(--color-divider)", borderRadius: 4 }} />
                <div style={{ flex: 1, minWidth: 0, fontSize: 13.5 }}>
                  <div style={{ fontWeight: 700 }}>{l.name}</div>
                  <div className="muted">{l.color} · Talla {l.size}</div>
                </div>
                <div className="wp-num" style={{ fontWeight: 700 }}>×{l.qty}</div>
              </div>
            ))}
          </div>
          <div className="summary-line" style={{ marginTop: 10 }}><span>Total de prendas</span><strong className="wp-num">{count}</strong></div>
          <Link href="/cart" className="btn-outline btn-block" style={{ marginTop: 12 }}>Editar carrito</Link>
        </aside>
      </div>
    </section>
  );
}
