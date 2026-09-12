"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { CATS } from "@/data/storeData";

export default function Header() {
  const router = useRouter();
  const { cart, query, setQuery } = useStore();
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const goSearch = () => {
    if (query.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/catalog");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      goSearch();
    }
  };

  return (
    <>
      <div style={{ background: "var(--color-accent)", color: "#fff", fontSize: "12.5px", letterSpacing: "0.04em" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "7px 20px", display: "flex", flexWrap: "wrap", gap: "18px", justifyContent: "space-between" }}>
          <span>Distribuidor oficial Paredes Seguridad &amp; Singer Safety · Despacho a todo el Perú</span>
          <span>ventas@workprotech.com · +51 936 628 362</span>
        </div>
      </div>

      <header style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)", transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "block", flex: "0 0 auto", background: "#fff", borderRadius: "var(--radius-sm)", padding: "2px 6px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-wp.png" alt="Work Protech" style={{ height: "40px", width: "auto" }} />
          </Link>
          <div style={{ flex: "1 1 320px", minWidth: "220px", display: "flex", border: "1px solid var(--color-neutral-400)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--color-bg)" }}>
            <input 
              className="input" 
              placeholder="Buscar EPP: botas S3, guantes nitrilo, chaleco..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ flex: 1, border: 0, borderRadius: 0, fontSize: "14px", color: "var(--color-text)" }} 
            />
            <button 
              className="btn" 
              onClick={goSearch} 
              style={{ border: 0, borderRadius: 0, background: "var(--color-accent)", color: "#fff", padding: "0 18px", fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              Buscar
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/quote" className="btn btn-ghost" style={{ fontSize: "13px" }}>Cotización</Link>
            <Link href="/cart" className="btn btn-primary" style={{ fontSize: "13px" }}>
              Carrito · <span className="wp-num">{cartCount}</span>
            </Link>
          </div>
        </div>
        <nav style={{ borderTop: "1px solid var(--color-divider)" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px", display: "flex", gap: "0 24px", flexWrap: "wrap" }}>
            {CATS.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/catalog?cat=${cat.id}`} 
                style={{ padding: "10px 0", fontSize: "13.5px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-neutral-800)", borderBottom: "2px solid transparent", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; e.currentTarget.style.borderBottomColor = "var(--color-accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-neutral-800)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
