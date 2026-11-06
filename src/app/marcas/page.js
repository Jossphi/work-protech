import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IconArrow } from "@/components/Icons";
import { getBrands } from "@/lib/catalog";

export const revalidate = 300;
export const metadata = { title: "Marcas" };

const INFO = {
  "paredes-seguridad": {
    text: "Vestuario laboral y calzado de seguridad. Camisetas, polos, sudaderas, polares, softshell, parkas, chalecos y pantalones pensados para el trabajo diario, con amplia gama de colores y tallas.",
  },
  "singer-safety": {
    text: "Equipos de protección individual: protección de manos, alta visibilidad, protección visual y más. Estamos preparando su catálogo en línea; mientras tanto, cotízalo con nosotros.",
  },
};

export default async function Marcas() {
  const brands = await getBrands();
  return (
    <>
      <PageHero eyebrow="Marcas" title="Marcas que comercializamos">
        Trabajamos con fabricantes especializados en protección laboral para ofrecer producto real, con fichas técnicas y disponibilidad.
      </PageHero>
      <section className="section">
        <div className="wrap cards">
          {brands.map((b) => (
            <div key={b.slug} className="info-card" style={{ borderTop: "3px solid var(--red)" }}>
              <h3 style={{ fontSize: 22 }}>{b.name}</h3>
              <p>{INFO[b.slug]?.text}</p>
              <p className="wp-num" style={{ fontSize: 13 }}>
                {b.product_count > 0 ? `${b.product_count} productos en el catálogo en línea` : "Catálogo en línea en preparación"}
              </p>
              <Link href={b.product_count > 0 ? `/catalog?marca=${b.slug}` : "/contacto"} className="arrow-link">
                {b.product_count > 0 ? "Ver productos" : "Solicitar información"} <IconArrow size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
