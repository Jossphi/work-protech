import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IconArrow } from "@/components/Icons";
import { SECTORS } from "@/lib/config";

export const metadata = { title: "Sectores" };

const NEEDS = {
  mineria: ["Calzado de seguridad", "Vestuario de alta visibilidad", "Protección de cabeza", "Protección respiratoria", "Protección auditiva"],
  industria: ["Vestuario de trabajo", "Protección de manos", "Protección visual", "Protección auditiva"],
  construccion: ["Protección de cabeza", "Calzado de seguridad", "Protección de manos", "Vestuario de trabajo"],
  agroindustria: ["Vestuario de trabajo", "Protección de manos", "Protección respiratoria", "Protección visual"],
  logistica: ["Calzado de seguridad", "Chalecos y vestuario de trabajo", "Protección de manos"],
};

export default function Sectores() {
  return (
    <>
      <PageHero eyebrow="Sectores" title="Soluciones por actividad">
        Seleccionamos el equipo de protección según los riesgos de cada sector y de cada puesto de trabajo.
      </PageHero>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          {SECTORS.map((s) => (
            <article key={s.slug} id={s.slug} className="sector-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/sectores/${s.slug}.jpg`} alt={s.name} loading="lazy" />
              <div>
                <h2>{s.name}</h2>
                <p>{s.text}</p>
                <p style={{ fontSize: 14, color: "var(--graphite)" }}>
                  <strong>EPP habitual:</strong> {NEEDS[s.slug].join(" · ")}
                </p>
                <Link href="/asesoria-tecnica" className="arrow-link">Solicitar asesoría para este sector <IconArrow size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
