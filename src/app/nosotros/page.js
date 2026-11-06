import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IconArrow, IconShield, IconTruck, IconUsers } from "@/components/Icons";
import { CONTACT } from "@/lib/config";

export const metadata = { title: "Nosotros" };

const VALUES = [
  [IconShield, "Seguridad", "Producto real, con fichas técnicas, elegido para proteger a quien trabaja."],
  [IconUsers, "Cercanía", "Atención directa y asesoría para encontrar la solución que tu equipo necesita."],
  [IconTruck, "Cumplimiento", "Entregas coordinadas en todo el Perú y seguimiento de cada pedido."],
];

export default function Nosotros() {
  return (
    <>
      <PageHero eyebrow="Nosotros" title="Work Protech">
        Innovación que te protege: equipos de protección personal y vestuario de trabajo para las empresas del Perú.
      </PageHero>
      <section className="section">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 40, alignItems: "start" }}>
          <div>
            <span className="eyebrow">Quiénes somos</span>
            <h2 className="section-title" style={{ marginBottom: 14 }}>Protección real para cada industria</h2>
            <p style={{ lineHeight: 1.75 }}>
              {CONTACT.company} es una empresa peruana con sede en Lima dedicada a la comercialización de equipos de protección personal (EPP) y
              vestuario de trabajo. Atendemos a empresas de minería, industria, construcción, agroindustria y logística con marcas especializadas
              como Paredes Seguridad y Singer Safety.
            </p>
            <p style={{ lineHeight: 1.75 }}>
              Nuestro objetivo es que cada trabajador cuente con el equipo adecuado para su puesto, con la calidad y el confort que exige el trabajo diario.
            </p>
            <Link href="/catalog" className="arrow-link">Ver productos <IconArrow size={15} /></Link>
          </div>
          <div className="cards" style={{ gridTemplateColumns: "1fr" }}>
            {VALUES.map(([Icon, t, d]) => (
              <div key={t} className="info-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span className="ico" style={{ marginBottom: 0, flex: "0 0 auto" }}><Icon size={24} /></span>
                <div>
                  <h3>{t}</h3>
                  <p style={{ marginBottom: 0 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
