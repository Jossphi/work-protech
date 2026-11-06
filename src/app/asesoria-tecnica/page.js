import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IconClipboard, IconGear, IconHelmet, IconTruck, IconWhatsapp } from "@/components/Icons";
import { whatsappUrl } from "@/lib/config";

export const metadata = { title: "Asesoría técnica" };

const STEPS = [
  [IconClipboard, "Diagnóstico por puesto", "Revisamos las tareas, el entorno y los riesgos de cada puesto de trabajo."],
  [IconHelmet, "Selección de EPP", "Proponemos el equipo adecuado según los riesgos y la normativa aplicable."],
  [IconGear, "Tallaje y personalización", "Definimos tallas, colores y la personalización con la imagen de tu empresa."],
  [IconTruck, "Entrega y reposición", "Coordinamos la entrega en todo el Perú y la reposición de tu dotación."],
];

export default function Asesoria() {
  return (
    <>
      <PageHero eyebrow="Asesoría técnica" title="Te ayudamos a elegir el EPP correcto">
        Acompañamiento en la selección de equipos de protección personal y soporte comercial para tu empresa.
      </PageHero>
      <section className="section">
        <div className="wrap">
          <div className="cards">
            {STEPS.map(([Icon, t, d], i) => (
              <div key={t} className="info-card">
                <span className="ico"><Icon size={24} /></span>
                <div className="label wp-num" style={{ color: "var(--red)" }}>Paso 0{i + 1}</div>
                <h3 style={{ marginTop: 6 }}>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="panel" style={{ marginTop: 32, padding: 28, display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", borderLeft: "4px solid var(--red)" }}>
            <div>
              <h2 style={{ fontSize: 22, margin: "0 0 6px" }}>¿Necesitas equipar a tu equipo?</h2>
              <p className="muted" style={{ margin: 0 }}>Cuéntanos el sector, los puestos y la cantidad de trabajadores y te preparamos una propuesta.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn-solid" href={whatsappUrl("Hola Work Protech, quisiera asesoría técnica para elegir EPP.")} target="_blank" rel="noopener noreferrer">
                <IconWhatsapp size={18} /> Escríbenos
              </a>
              <Link href="/contacto" className="btn-outline">Contacto</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
