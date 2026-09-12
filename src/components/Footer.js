import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1f2124", color: "#d9d9d9", marginTop: "40px" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "48px 20px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "32px" }}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-wp.png" alt="Work Protech" style={{ height: "38px", width: "auto", background: "#fff", padding: "6px 10px", borderRadius: "var(--radius-sm)" }} />
          <p style={{ fontSize: "14px", color: "#b7b7b7", marginTop: "14px", lineHeight: 1.55 }}>Equipos de protección individual y abastecimiento industrial. Representantes de Paredes Seguridad y Singer Safety en el Perú.</p>
        </div>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", fontWeight: 600, marginBottom: "12px" }}>Catálogo</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <Link href="/catalog?cat=calzado" style={{ color: "#d9d9d9" }}>Calzado de seguridad</Link>
            <Link href="/catalog?cat=altavis" style={{ color: "#d9d9d9" }}>Ropa de alta visibilidad</Link>
            <Link href="/catalog?cat=fr" style={{ color: "#d9d9d9" }}>Retardante de llama</Link>
            <Link href="/catalog?cat=all" style={{ color: "#d9d9d9" }}>Guantes y protección ocular</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", fontWeight: 600, marginBottom: "12px" }}>Contacto</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#b7b7b7" }}>
            <span>Work Protech SACS · RUC 20615339637</span>
            <span>C/ Bolívar 472 ofc. 506, Miraflores</span>
            <span className="wp-num">+51 936 628 362</span>
            <a href="mailto:ventas@workprotech.com" style={{ color: "#d9d9d9" }}>ventas@workprotech.com</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", fontWeight: 600, marginBottom: "12px" }}>Síguenos</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#b7b7b7" }}>
            <span>www.workprotech.com</span>
            <span>@workprotechoficial</span>
            <span>@workprotech_oficial</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "16px 20px", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", fontSize: "12.5px", color: "#9a9a9a" }}>
          <span>© 2026 Work Protech SACS. Todos los derechos reservados.</span>
          <span>Innovación que te protege</span>
        </div>
      </div>
    </footer>
  );
}
