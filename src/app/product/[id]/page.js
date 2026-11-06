import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductBuyBox from "@/components/ProductBuyBox";
import { getProduct, getProducts } from "@/lib/catalog";

export const revalidate = 300;

const MEASURES = {
  top: { A: "Ancho de pecho", B: "Largo total", C: "Largo de manga" },
  bottom: { A: "Ancho de cintura", B: "Largo" },
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) return { title: "Producto no encontrado" };
  return { title: p.name, description: p.description?.split("\n")[0] };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();

  const related = (await getProducts({ category: p.category })).filter((x) => x.slug !== p.slug).slice(0, 4);
  const chart = p.size_chart;
  const labels = chart ? MEASURES[chart.kind] || MEASURES.top : null;
  const has4xlOnlySome = p.colors.some((c) => c.sizes.includes("4XL")) && !p.colors.every((c) => c.sizes.includes("4XL"));

  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 60 }}>
      <div className="breadcrumb">
        <Link href="/">Inicio</Link> / <Link href="/catalog">Productos</Link> /{" "}
        {p.family && <><Link href={`/catalog?cat=${p.family}`}>{p.family_name}</Link> /{" "}</>}
        <Link href={`/catalog?cat=${p.category}`}>{p.category_name}</Link> / {p.name}
      </div>

      <div className="pdp">
        <ProductBuyBox product={p} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 40, marginTop: 48 }}>
        <div>
          <h2 style={{ fontSize: 24, margin: 0 }}>Descripción</h2>
          <hr className="hr" />
          <div className="desc">
            {p.description?.split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: 24, margin: 0 }}>Ficha técnica</h2>
          <hr className="hr" />
          <div className="specs">
            {p.features.map((f) => (
              <div key={f.title} className="spec-item">
                <div className="t">{f.title}</div>
                <div className="d">{f.description}</div>
              </div>
            ))}
          </div>

          {chart && (
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 19, margin: 0 }}>Tabla de medidas (cm)</h3>
              <div className="table-scroll" style={{ marginTop: 10 }}>
                <table className="size-table wp-num">
                  <thead>
                    <tr>
                      <th>Medida</th>
                      {chart.sizes.map((s) => <th key={s}>{s}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(chart.rows).map(([k, vals]) => (
                      <tr key={k}>
                        <td><strong>{k}</strong> · {labels[k] || k}</td>
                        {vals.map((v, i) => <td key={i}>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>
                Medidas de la prenda en centímetros según el catálogo Paredes Seguridad 26/27.
                {has4xlOnlySome && " La talla 4XL solo está disponible en algunos colores."}
              </p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 24, margin: 0 }}>También en {p.category_name}</h2>
          <hr className="hr" />
          <div className="product-grid">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </div>
      )}
    </section>
  );
}
