"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { CATS, PRODUCTS } from "@/data/storeData";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get("cat") || "all";
  const initQ = searchParams.get("q") || "";
  
  const [cat, setCat] = useState(initCat);
  const [brand, setBrand] = useState("all");

  useEffect(() => {
    if (searchParams.get("cat")) setCat(searchParams.get("cat"));
  }, [searchParams]);

  const catLabel = cat === "all" ? "Catálogo completo" : (CATS.find(c => c.id === cat)?.label || "Catálogo");
  const listTitle = initQ.trim() ? `Resultados para "${initQ.trim()}"` : catLabel;

  const filtered = PRODUCTS.filter(p => 
    (cat === "all" || p.cat === cat) &&
    (brand === "all" || p.brand === brand) &&
    (!initQ || (p.name + ' ' + p.brand + ' ' + p.norm).toLowerCase().includes(initQ.toLowerCase()))
  );

  const filterCats = [{ id: 'all', label: 'Todas las categorías' }].concat(CATS).map(c => ({
    id: c.id,
    label: c.label,
    color: cat === c.id ? 'var(--color-accent-700)' : 'var(--color-neutral-800)',
    bg: cat === c.id ? 'var(--color-accent-100)' : 'transparent',
  }));

  const filterBrands = [
    { id: 'all', label: 'Todas las marcas' }, 
    { id: 'Paredes', label: 'Paredes Seguridad' }, 
    { id: 'Singer Safety', label: 'Singer Safety' }
  ].map(b => ({
    id: b.id,
    label: b.label,
    color: brand === b.id ? 'var(--color-accent-700)' : 'var(--color-neutral-800)',
    bg: brand === b.id ? 'var(--color-accent-100)' : 'transparent',
  }));

  return (
    <section style={{ maxWidth: "1240px", margin: "0 auto", padding: "34px 20px 60px" }}>
      <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
        <Link href="/">Inicio</Link> / {listTitle}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginTop: "8px" }}>
        <h2 style={{ fontSize: "32px", margin: 0 }}>{listTitle}</h2>
        <span className="wp-num" style={{ fontSize: "13.5px", color: "var(--color-neutral-700)" }}>
          {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>
      <hr className="hr" />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,240px) minmax(0,1fr)", gap: "28px", alignItems: "start" }}>
        <aside style={{ background: "#fff", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: "20px" }}>
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)" }}>Categoría</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "10px" }}>
            {filterCats.map(f => (
              <button 
                key={f.id}
                onClick={() => setCat(f.id)}
                style={{ textAlign: "left", border: 0, fontSize: "14px", padding: "6px 8px", borderRadius: "var(--radius-sm)", color: f.color, background: f.bg, cursor: "pointer" }}
                onMouseEnter={(e) => { if (cat !== f.id) e.currentTarget.style.background = "var(--color-accent-100)"; }}
                onMouseLeave={(e) => { if (cat !== f.id) e.currentTarget.style.background = "transparent"; }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <hr className="hr" />
          <div style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: "var(--color-neutral-700)" }}>Marca</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "10px" }}>
            {filterBrands.map(b => (
              <button 
                key={b.id}
                onClick={() => setBrand(b.id)}
                style={{ textAlign: "left", border: 0, fontSize: "14px", padding: "6px 8px", borderRadius: "var(--radius-sm)", color: b.color, background: b.bg, cursor: "pointer" }}
                onMouseEnter={(e) => { if (brand !== b.id) e.currentTarget.style.background = "var(--color-accent-100)"; }}
                onMouseLeave={(e) => { if (brand !== b.id) e.currentTarget.style.background = "transparent"; }}
              >
                {b.label}
              </button>
            ))}
          </div>
          <hr className="hr" />
          <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", lineHeight: 1.5 }}>
            ¿No encuentras un artículo? Escríbenos a <a href="mailto:ventas@workprotech.com">ventas@workprotech.com</a> y lo cotizamos.
          </div>
        </aside>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "18px" }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
