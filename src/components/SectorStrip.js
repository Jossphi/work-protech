import Link from "next/link";
import { SECTORS } from "@/lib/config";

// Franja sectorial de baja altura (Manual Digital, sección 06).
export default function SectorStrip() {
  return (
    <nav className="sectors" aria-label="Sectores">
      {SECTORS.map((s) => (
        <Link
          key={s.slug}
          href={`/sectores#${s.slug}`}
          className="sector"
          style={{ backgroundImage: `url(/img/sectores/${s.slug}.jpg)` }}
        >
          <span className="sr-only">{s.name}: {s.text}</span>
        </Link>
      ))}
    </nav>
  );
}
