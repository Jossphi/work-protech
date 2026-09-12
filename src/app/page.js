"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CATS, PRODUCTS } from "@/data/storeData";

export default function Home() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <div>
      <section style={{ position: "relative", background: "#15171a", color: "#fff", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/hero-hivis.png" alt="Trabajador con ropa de alta visibilidad" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
        <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "96px 20px 104px" }}>
          <div style={{ maxWidth: "620px" }}>
            <div style={{ display: "inline-block", background: "var(--color-accent)", padding: "5px 12px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>Equipos de protección individual</div>
            <h1 style={{ fontSize: "58px", lineHeight: 1.02, margin: "20px 0 16px", color: "#fff", fontWeight: 700, textWrap: "balance" }}>Innovación que te protege</h1>
            <p style={{ fontSize: "18px", lineHeight: 1.55, color: "#e6e6e6", maxWidth: "520px" }}>Calzado, ropa de trabajo, alta visibilidad y protección personal bajo normativas europeas EN e ISO. De la cabeza a los pies, para industria, construcción y logística.</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "28px" }}>
              <Link 
                href="/catalog" 
                className="btn" 
                style={{ background: "var(--color-accent)", color: "#fff", border: "1px solid var(--color-accent)", padding: "12px 26px", fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent-600)"; e.currentTarget.style.borderColor = "var(--color-accent-600)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              >
                Ver catálogo
              </Link>
              <Link 
                href="/quote" 
                className="btn" 
                style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.7)", padding: "12px 26px", fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Cotización por volumen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", borderBottom: "1px solid var(--color-divider)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "22px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "3px", background: "var(--color-accent)", alignSelf: "stretch" }}></div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "14.5px" }}>Normativa EN certificada</div><div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>Fichas técnicas y declaración UE</div></div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "3px", background: "var(--color-accent)", alignSelf: "stretch" }}></div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "14.5px" }}>Stock en Lima</div><div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>Despacho en 24–48 h</div></div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "3px", background: "var(--color-accent)", alignSelf: "stretch" }}></div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "14.5px" }}>Precios por volumen</div><div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>Escalas desde 12 unidades</div></div>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "3px", background: "var(--color-accent)", alignSelf: "stretch" }}></div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "14.5px" }}>Asesoría técnica</div><div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>Selección de EPP por puesto</div></div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px 20px 8px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "30px", margin: 0 }}>Comprar por categoría</h2>
          <Link href="/catalog" style={{ fontSize: "13.5px", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>Ver todo el catálogo</Link>
        </div>
        <hr className="hr" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(185px,1fr))", gap: "16px", marginTop: "8px" }}>
          {CATS.map(c => {
            const count = PRODUCTS.filter(p => p.cat === c.id).length + " productos";
            return (
              <Link 
                key={c.id} 
                href={`/catalog?cat=${c.id}`} 
                className="card" 
                style={{ background: "#fff", padding: "20px 18px", display: "block", color: "var(--color-text)", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-divider)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 600 }}>{c.kicker}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "19px", marginTop: "8px", lineHeight: 1.15 }}>{c.label}</div>
                <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", marginTop: "6px" }} className="wp-num">{count}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "44px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "30px", margin: 0 }}>Más vendidos</h2>
          <span style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>Precios incluyen IGV</span>
        </div>
        <hr className="hr" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(235px,1fr))", gap: "18px" }}>
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "44px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "24px", alignItems: "stretch" }}>
          <div style={{ position: "relative", overflow: "hidden", minHeight: "280px", background: "#000" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/banner-calzado.png" alt="Calzado de seguridad" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.78 }} />
            <div style={{ position: "relative", padding: "34px 30px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-end", color: "#fff" }}>
              <div style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", background: "var(--color-accent)", display: "inline-block", alignSelf: "flex-start", padding: "4px 10px" }}>Paredes Seguridad</div>
              <h3 style={{ color: "#fff", fontSize: "30px", margin: "14px 0 6px", fontWeight: 700 }}>Calzado de seguridad</h3>
              <p style={{ color: "#e4e4e4", fontSize: "15px", margin: "0 0 16px", maxWidth: "360px" }}>Punteras no metálicas, plantilla antiperforación y suelas antideslizantes SRC.</p>
              <Link 
                href="/catalog?cat=calzado" 
                style={{ alignSelf: "flex-start", color: "#fff", border: "1px solid rgba(255,255,255,0.75)", padding: "10px 20px", fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                Ver la línea
              </Link>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "30px" }}>
            <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 600 }}>Compras corporativas</div>
            <h3 style={{ fontSize: "27px", margin: "10px 0 10px" }}>Equipa a tu cuadrilla completa</h3>
            <p style={{ fontSize: "15px", color: "var(--color-neutral-800)", marginBottom: "18px" }}>Envíanos tu lista de puestos y te devolvemos una propuesta de EPP con escalas de precio, tallas y plazos de entrega. Facturación con RUC y órdenes de compra.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px" }}>
              <li style={{ display: "flex", gap: "10px" }}><span style={{ color: "var(--color-accent)", fontWeight: 700 }}>—</span>Descuentos desde 12 unidades por SKU</li>
              <li style={{ display: "flex", gap: "10px" }}><span style={{ color: "var(--color-accent)", fontWeight: 700 }}>—</span>Marcado y serigrafía con tu logo</li>
              <li style={{ display: "flex", gap: "10px" }}><span style={{ color: "var(--color-accent)", fontWeight: 700 }}>—</span>Fichas técnicas y certificados por lote</li>
            </ul>
            <Link href="/quote" className="btn btn-primary" style={{ letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "13px", padding: "11px 22px", display: "inline-block" }}>Solicitar cotización</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
