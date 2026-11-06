import Link from "next/link";
import { CONTACT, NAV } from "@/lib/config";

export default function Footer({ families = [] }) {
  return (
    <footer className="site-footer">
      <div className="footer-stripes" aria-hidden="true">
        <i style={{ left: 0, background: "var(--gray-light)" }} />
        <i style={{ left: 34, background: "var(--red)" }} />
        <i style={{ left: 68, background: "var(--black)" }} />
      </div>
      <div className="wrap cols">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/marca/logo-work-protech-negativo.png" alt="Work Protech" style={{ height: 40, width: "auto" }} />
          <p style={{ fontSize: 14, marginTop: 16, lineHeight: 1.6, maxWidth: 320 }}>
            Equipos de protección personal y vestuario de trabajo para minería, industria, construcción, agroindustria y logística.
          </p>
        </div>
        <div>
          <h4>Productos</h4>
          <div className="list">
            {families.map((f) => (
              <Link key={f.slug} href={`/catalog?cat=${f.slug}`}>{f.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4>Work Protech</h4>
          <div className="list">
            {NAV.filter((n) => n.href !== "/" && n.href !== "/catalog").map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
            <Link href="/cart">Solicitar cotización</Link>
          </div>
        </div>
        <div>
          <h4>Contacto</h4>
          <div className="list">
            <a href={CONTACT.phoneHref} className="wp-num">{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span>{CONTACT.address}</span>
            <span>{CONTACT.company} · RUC {CONTACT.ruc}</span>
          </div>
        </div>
      </div>
      <div className="legal">
        <div className="wrap">
          <span>© 2026 {CONTACT.company}. Todos los derechos reservados.</span>
          <span>{CONTACT.city}</span>
        </div>
      </div>
    </footer>
  );
}
