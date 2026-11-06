import Link from "next/link";

export default function Footer({ categories = [] }) {
  return (
    <footer className="site-footer">
      <div className="wrap cols">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-wp.png" alt="Work Protech" style={{ height: 38, width: "auto", background: "#fff", padding: "6px 10px", borderRadius: 4 }} />
          <p style={{ fontSize: 14, color: "#b7b7b7", marginTop: 14, lineHeight: 1.55 }}>
            Ropa de trabajo y equipos de protección. Distribuidor oficial de Paredes Seguridad en el Perú.
          </p>
        </div>
        <div>
          <h4>Catálogo</h4>
          <div className="list">
            {categories.map((c) => (
              <Link key={c.slug} href={`/catalog?cat=${c.slug}`}>{c.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4>Contacto</h4>
          <div className="list">
            <span>Work Protech SACS · RUC 20615339637</span>
            <span>C/ Bolívar 472 ofc. 506, Miraflores</span>
            <span className="wp-num">+51 936 628 362</span>
            <a href="mailto:ventas@workprotech.com">ventas@workprotech.com</a>
          </div>
        </div>
        <div>
          <h4>Cómo comprar</h4>
          <div className="list">
            <span>1. Elige color, talla y cantidad</span>
            <span>2. Agrega los productos al carrito</span>
            <span>3. Completa tus datos y envía el pedido por WhatsApp</span>
          </div>
        </div>
      </div>
      <div className="legal">
        <div className="wrap">
          <span>© 2026 Work Protech SACS. Todos los derechos reservados.</span>
          <span>Innovación que te protege</span>
        </div>
      </div>
    </footer>
  );
}
