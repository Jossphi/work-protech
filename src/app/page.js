import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FamilyStrip from "@/components/FamilyStrip";
import SectorStrip from "@/components/SectorStrip";
import { IconArrow, IconGear, IconShield, IconTruck } from "@/components/Icons";
import { getCategories, getProducts } from "@/lib/catalog";

export const revalidate = 300;

const STEPS = [
  ["Elige tus productos", "Selecciona color, talla y cantidad de cada producto."],
  ["Agrégalos a tu cotización", "Suma todo lo que necesita tu equipo de trabajo."],
  ["Completa tus datos", "Nombre, documento, dirección y datos de contacto."],
  ["Envía por WhatsApp", "Te respondemos con la cotización y la entrega."],
];

export default async function Home() {
  const [families, featured] = await Promise.all([getCategories(), getProducts({ featured: true, limit: 8 })]);

  return (
    <>
      <section className="hero">
        <div className="photo" style={{ backgroundImage: "url(/img/marca/portada-mineria.jpg)" }} role="img" aria-label="Trabajador con casco Work Protech en una operación minera" />
        <div className="wrap inner">
          <div style={{ paddingTop: 56, paddingBottom: 56 }}>
            <span className="eyebrow">EPP de alta calidad</span>
            <h1>
              Protección real
              <span className="l2">para cada <span className="red">industria</span></span>
            </h1>
            <div className="rule" />
          </div>
          <div className="hero-panel">
            <div className="it"><IconShield size={34} /><div><strong>Seguridad</strong>en cada paso</div></div>
            <div className="it"><IconGear size={34} /><div><strong>Asesoría técnica</strong>personalizada</div></div>
            <div className="it"><IconTruck size={34} /><div><strong>Entregas</strong>en todo el Perú</div></div>
          </div>
        </div>
      </section>

      <FamilyStrip families={families} />
      <SectorStrip />

      {featured.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <span className="eyebrow">Vestuario de trabajo</span>
                <h2 className="section-title">Productos destacados</h2>
              </div>
              <Link href="/catalog" className="arrow-link">Ver todos los productos <IconArrow size={15} /></Link>
            </div>
            <div className="product-grid">
              {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section soft">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Cotización en línea</span>
              <h2 className="section-title">Así solicitas tu cotización</h2>
            </div>
          </div>
          <div className="steps">
            {STEPS.map(([t, d], i) => (
              <div key={t} className="step">
                <div className="n wp-num">0{i + 1}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
