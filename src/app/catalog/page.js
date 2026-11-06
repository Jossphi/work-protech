import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { IconWhatsapp } from "@/components/Icons";
import { findCategory, getBrands, getCategories, getProducts } from "@/lib/catalog";
import { whatsappUrl } from "@/lib/config";

export const metadata = { title: "Productos" };

function qs(params) {
  const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString();
  return s ? `/catalog?${s}` : "/catalog";
}

export default async function Catalog({ searchParams }) {
  const sp = await searchParams;
  const cat = typeof sp.cat === "string" && sp.cat ? sp.cat : null;
  const brand = typeof sp.marca === "string" && sp.marca ? sp.marca : null;
  const q = typeof sp.q === "string" && sp.q.trim() ? sp.q.trim().slice(0, 80) : null;

  const [families, brands, products] = await Promise.all([getCategories(), getBrands(), getProducts({ category: cat, brand, q })]);
  const current = cat ? findCategory(families, cat) : null;
  const currentBrand = brands.find((b) => b.slug === brand);
  const title = q ? `Resultados para “${q}”` : current ? current.name : currentBrand ? currentBrand.name : "Productos";
  const total = families.reduce((n, f) => n + f.product_count, 0);

  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 64 }}>
      <div className="breadcrumb">
        <Link href="/">Inicio</Link> / <Link href="/catalog">Productos</Link>
        {current?.family && current.family.slug !== current.slug && <> / <Link href={qs({ cat: current.family.slug })}>{current.family.name}</Link></>}
        {current && <> / {current.name}</>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 10 }}>
        <h1 style={{ fontSize: "clamp(26px, 3.4vw, 36px)", margin: 0 }}>{title}</h1>
        <span className="muted wp-num" style={{ fontSize: 13.5 }}>
          {products.length} {products.length === 1 ? "producto" : "productos"}
        </span>
      </div>
      <hr className="hr" style={{ marginBottom: 24 }} />

      <div className="catalog-layout">
        <aside className="panel filters">
          <div className="label" style={{ marginBottom: 8 }}>Familias</div>
          <Link href={qs({ marca: brand })} className={`fam-link ${!cat ? "active" : ""}`}>
            Todos <span className="cnt wp-num">{total}</span>
          </Link>
          {families.map((f) => (
            <div key={f.slug}>
              <Link href={qs({ cat: f.slug, marca: brand })} className={`fam-link ${cat === f.slug ? "active" : ""}`}>
                {f.name} <span className={`cnt wp-num ${f.product_count ? "" : "zero"}`}>{f.product_count}</span>
              </Link>
              {f.children.length > 0 && (current?.family?.slug === f.slug || !cat) &&
                f.children.map((c) => (
                  <Link key={c.slug} href={qs({ cat: c.slug, marca: brand })} className={`sub-link ${cat === c.slug ? "active" : ""}`}>
                    {c.name} <span className="cnt wp-num">{c.product_count}</span>
                  </Link>
                ))}
            </div>
          ))}
          <hr className="hr" />
          <div className="label" style={{ marginBottom: 8 }}>Marcas</div>
          <Link href={qs({ cat })} className={`fam-link ${!brand ? "active" : ""}`}>Todas</Link>
          {brands.map((b) => (
            <Link key={b.slug} href={qs({ cat, marca: b.slug })} className={`fam-link ${brand === b.slug ? "active" : ""}`}>
              {b.name} <span className={`cnt wp-num ${b.product_count ? "" : "zero"}`}>{b.product_count}</span>
            </Link>
          ))}
        </aside>

        <div>
          <form className="catalog-search" action="/catalog" role="search">
            {cat && <input type="hidden" name="cat" value={cat} />}
            {brand && <input type="hidden" name="marca" value={brand} />}
            <input type="search" name="q" defaultValue={q || ""} placeholder="Buscar productos…" aria-label="Buscar productos" />
            <button type="submit" className="btn-solid" style={{ padding: "11px 20px" }}>Buscar</button>
          </form>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          ) : (
            <div className="panel empty-family">
              {current?.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.image_url} alt="" />
              )}
              <h2 style={{ fontSize: 22, margin: "12px 0 8px" }}>
                {q ? `No encontramos productos para “${q}”` : `${current ? current.name : "Esta sección"}: catálogo en preparación`}
              </h2>
              <p className="muted" style={{ maxWidth: 520, margin: "0 auto 18px" }}>
                Estamos cargando los productos de esta familia. Escríbenos y te enviamos la cotización con los modelos disponibles.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  className="btn-solid"
                  href={whatsappUrl(`Hola Work Protech, quisiera cotizar ${current ? current.name.toLowerCase() : q || "productos"}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWhatsapp size={18} /> Cotizar por WhatsApp
                </a>
                <Link href="/catalog" className="btn-outline">Ver todos los productos</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
