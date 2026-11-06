// Cabecera de páginas interiores: fondo grafito con diagonales rojo-gris-negro como remate.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}
