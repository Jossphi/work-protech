import Link from "next/link";
import { IconArrow } from "@/components/Icons";

// Franja de familias de producto con fotografía real (Manual Digital, sección 05).
export default function FamilyStrip({ families }) {
  return (
    <section className="families" aria-label="Familias de producto">
      <div className="wrap row" style={{ paddingLeft: 0, paddingRight: 0 }}>
        {families.map((f) => {
          const [first, ...rest] = f.name.split(" ");
          return (
            <Link key={f.slug} href={`/catalog?cat=${f.slug}`} className="fam">
              <div className="pic">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.image_url} alt="" loading="lazy" />
              </div>
              <div className="name">
                <div>
                  {first}
                  <span>{rest.join(" ")}</span>
                </div>
                <IconArrow size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
