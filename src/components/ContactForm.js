"use client";

import { useState } from "react";
import { IconWhatsapp } from "@/components/Icons";
import { whatsappUrl } from "@/lib/config";

// Formulario de contacto: arma el mensaje y lo abre en WhatsApp de la empresa.
export default function ContactForm() {
  const [f, setF] = useState({ name: "", company: "", phone: "", message: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 3 || f.message.trim().length < 5) {
      setError("Escribe tu nombre y tu mensaje.");
      return;
    }
    setError("");
    const text = [
      "*Consulta desde la web*",
      `Nombre: ${f.name.trim()}`,
      f.company.trim() && `Empresa: ${f.company.trim()}`,
      f.phone.trim() && `Teléfono: ${f.phone.trim()}`,
      "",
      f.message.trim(),
    ].filter((x) => x !== false && x !== "").join("\n");
    window.open(whatsappUrl(text), "_blank", "noopener");
  };

  return (
    <form className="panel" style={{ padding: 26 }} onSubmit={submit} noValidate>
      <h2 style={{ fontSize: 22, margin: "0 0 16px" }}>Envíanos un mensaje</h2>
      <div className="form-grid">
        <div className="fld full"><label htmlFor="c-name">Nombre <span className="req">*</span></label><input id="c-name" autoComplete="name" value={f.name} onChange={set("name")} /></div>
        <div className="fld"><label htmlFor="c-company">Empresa</label><input id="c-company" autoComplete="organization" value={f.company} onChange={set("company")} /></div>
        <div className="fld"><label htmlFor="c-phone">Teléfono</label><input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} /></div>
        <div className="fld full"><label htmlFor="c-msg">Mensaje <span className="req">*</span></label><textarea id="c-msg" value={f.message} onChange={set("message")} placeholder="¿Qué productos necesitas, para qué sector y en qué cantidad?" /></div>
      </div>
      {error && <div className="error-box" style={{ marginTop: 14 }}>{error}</div>}
      <button type="submit" className="btn-solid btn-block" style={{ marginTop: 18 }}><IconWhatsapp size={18} /> Enviar por WhatsApp</button>
    </form>
  );
}
