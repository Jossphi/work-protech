"use client";

import { useRouter } from "next/navigation";

export default function Quote() {
  const router = useRouter();

  const handleSend = () => {
    // Simulated send
    router.push("/");
  };

  return (
    <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "34px 20px 60px" }}>
      <h2 style={{ fontSize: "32px", margin: 0 }}>Cotización por volumen</h2>
      <p style={{ fontSize: "15.5px", color: "var(--color-neutral-800)", maxWidth: "640px" }}>
        Cuéntanos qué puestos necesitas equipar y armamos la propuesta de EPP con escalas de precio, tallas y plazos.
      </p>
      <hr className="hr" />
      <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "26px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px" }}>
        <div className="field"><label>Empresa</label><input className="input" placeholder="Minera del Norte S.A." /></div>
        <div className="field"><label>Contacto</label><input className="input" placeholder="Nombre y apellido" /></div>
        <div className="field"><label>Correo corporativo</label><input className="input" placeholder="compras@empresa.com" /></div>
        <div className="field"><label>Teléfono</label><input className="input" placeholder="+51 999 999 999" /></div>
        <div className="field" style={{ gridColumn: "1/-1" }}><label>Detalle del requerimiento</label><input className="input" placeholder="30 pares de botas S3 talla 40–44, 50 chalecos clase 2..." /></div>
        <div style={{ gridColumn: "1/-1" }}>
          <button 
            className="btn" 
            onClick={handleSend}
            style={{ background: "var(--color-accent)", color: "#fff", border: "1px solid var(--color-accent)", padding: "12px 26px", fontSize: "13.5px", letterSpacing: "0.06em", textTransform: "uppercase" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-600)"; e.currentTarget.style.borderColor = "var(--color-accent-600)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
          >
            Enviar solicitud
          </button>
        </div>
      </div>
    </section>
  );
}
