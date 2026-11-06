import Link from "next/link";
import { swatchStyle } from "@/lib/colors";
import { IconArrow } from "@/components/Icons";

export default function ProductCard({ product }) {
  const href = `/product/${product.slug}`;
  const colors = product.colors || [];
  return (
    <article className="pcard">
      <Link href={href} className="media" aria-label={product.name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.brand && <span className="brand">{product.brand}</span>}
      </Link>
      <div className="body">
        <div className="type">{product.product_type}</div>
        <Link href={href} className="name">{product.name}</Link>
        <div className="spec">{product.norm}</div>
        <div className="foot">
          <span className="colors">
            <span className="swatches" aria-hidden="true">
              {colors.slice(0, 6).map((c) => (
                <span key={c} className="swatch" style={swatchStyle(c)} title={c} />
              ))}
            </span>
            {product.color_count} {product.color_count === 1 ? "color" : "colores"}
          </span>
          <Link href={href} className="arrow-link" aria-label={`Ver ${product.name}`}>Ver <IconArrow size={14} /></Link>
        </div>
      </div>
    </article>
  );
}
