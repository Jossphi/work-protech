import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/catalog";

export const metadata = { title: "Catálogo" };

export default async function Catalog({ searchParams }) {
  const sp = await searchParams;
  const cat = typeof sp.cat === "string" && sp.cat ? sp.cat : null;
  const q = typeof sp.q === "string" && sp.q.trim() ? sp.q.trim().slice(0, 80) : null;

  const [categories, products] = await Promise.all([getCategories(), getProducts({ category: cat, q })]);
  const current = categories.find((c) => c.slug === cat);
  const title = q ? `Resultados para “${q}”` : current ? current.name : "Catálogo completo";
  const total = categories.reduce((n, c) => n + c.product_count, 0);

  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 60 }}>
      <div className="breadcrumb">
        <Link href="/">Inicio</Link> / {current ? <><Link href="/catalog">Catálogo</Link> / {current.name}</> : "Catálogo"}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>{title}</h1>
        <span className="muted wp-num" style={{ fontSize: 13.5 }}>
          {products.length} {products.length === 1 ? "producto" : "productos"}
        </span>
      </div>
      <hr className="hr" />
      <div className="catalog-layout">
        <aside className="panel filters">
          <div className="label">Categoría</div>
          <div className="list" style={{ marginTop: 10 }}>
            <Link href="/catalog" className={!cat ? "active" : ""}>Todas <span className="muted wp-num">({total})</span></Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/catalog?cat=${c.slug}`} className={cat === c.slug ? "active" : ""}>
                {c.name} <span className="muted wp-num">({c.product_count})</span>
              </Link>
            ))}
          </div>
          <hr className="hr" />
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
            ¿No encuentras un artículo? Escríbenos a <a href="mailto:ventas@workprotech.com">ventas@workprotech.com</a> y lo cotizamos.
          </div>
        </aside>
        <div>
          {products.length === 0 ? (
            <div className="panel" style={{ padding: 40, textAlign: "center" }}>
              <p className="muted">No encontramos productos{q ? ` para “${q}”` : ""}.</p>
              <Link href="/catalog" className="btn-solid">Ver todo el catálogo</Link>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
