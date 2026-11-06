import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/catalog";

export const revalidate = 300;

const STEPS = [
  ["Elige", "Color, talla y cantidad de cada prenda."],
  ["Agrega al carrito", "Suma todos los productos que necesites."],
  ["Completa tus datos", "Nombre, documento, dirección y contacto."],
  ["Envía por WhatsApp", "Te respondemos con la cotización y la entrega."],
];

export default async function Home() {
  const [categories, featured] = await Promise.all([getCategories(), getProducts({ featured: true, limit: 8 })]);

  return (
    <div>
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src="/img/banners/hero.jpg" alt="" />
        <div className="wrap inner">
          <span className="chip-yellow">Paredes Seguridad · Catálogo 26/27</span>
          <h1>Protegemos a quien construye el futuro</h1>
          <p>Ropa de trabajo con calidad, confort y resistencia: camisetas, polos, sudaderas, polares, softshell, parkas, chalecos y pantalones.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <Link href="/catalog" className="btn-solid">Ver catálogo</Link>
            <Link href="/cart" className="btn-outline btn-light">Mi carrito</Link>
          </div>
        </div>
      </section>

      <section className="panel" style={{ borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0 }}>
        <div className="wrap" style={{ padding: "22px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 20 }}>
          {STEPS.map(([t, d], i) => (
            <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div className="wp-num" style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--color-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flex: "0 0 auto" }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{t}</div>
                <div className="muted" style={{ fontSize: 13 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 52, paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 30, margin: 0 }}>Comprar por categoría</h2>
          <Link href="/catalog" className="eyebrow">Ver todo el catálogo</Link>
        </div>
        <hr className="hr" />
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.slug} href={`/catalog?cat=${c.slug}`} className="cat-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {c.banner_url && <img src={c.banner_url} alt="" loading="lazy" />}
              <div className="txt">
                <div className="k">{c.kicker}</div>
                <div className="n">{c.name}</div>
                <div className="c wp-num">{c.product_count} {c.product_count === 1 ? "producto" : "productos"}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 44, paddingBottom: 16 }}>
        <h2 style={{ fontSize: 30, margin: 0 }}>Destacados</h2>
        <hr className="hr" />
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 36 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          <div className="cat-tile" style={{ minHeight: 300 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/banners/portada.jpg" alt="" loading="lazy" />
            <div className="txt" style={{ padding: 28 }}>
              <div className="k">Calidad · Confort · Resistencia</div>
              <div className="n" style={{ fontSize: 28 }}>Uniformes completos para tu equipo</div>
              <Link href="/catalog" className="btn-outline btn-light" style={{ marginTop: 14 }}>Ver la colección</Link>
            </div>
          </div>
          <div className="panel" style={{ padding: 30 }}>
            <div className="eyebrow">Compras corporativas</div>
            <h3 style={{ fontSize: 26, margin: "10px 0" }}>Equipa a tu cuadrilla completa</h3>
            <p className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>
              Arma tu pedido con todas las prendas, colores y tallas que necesitas. Al enviarlo por WhatsApp te respondemos con la cotización por volumen y los plazos de entrega.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: 10, fontSize: 14.5 }}>
              <li>— Personalización con el logo de tu empresa</li>
              <li>— Amplia gama de colores y tallas (hasta 4XL en modelos seleccionados)</li>
              <li>— Facturación con RUC</li>
            </ul>
            <Link href="/catalog" className="btn-solid">Armar mi pedido</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
