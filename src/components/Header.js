"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}

export function CartButton({ className = "cart-link", label = "Carrito" }) {
  const { count, loaded } = useStore();
  return (
    <Link href="/cart" className={className} aria-label={`${label} (${count} productos)`}>
      <CartIcon />
      <span>{label}</span>
      {loaded && count > 0 && <span className="cart-badge wp-num">{count}</span>}
    </Link>
  );
}

export default function Header({ categories = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const activeCat = pathname === "/catalog" ? params.get("cat") : null;

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Distribuidor oficial Paredes Seguridad · Despacho a todo el Perú</span>
          <span>ventas@workprotech.com · +51 936 628 362</span>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap bar">
          <Link href="/" className="logo" aria-label="Work Protech, inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-wp.png" alt="Work Protech" />
          </Link>
          <form className="search" role="search" onSubmit={onSubmit}>
            <input
              type="search"
              placeholder="Buscar: polo, softshell, pantalón multibolsillos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar productos"
            />
            <button type="submit">Buscar</button>
          </form>
          <CartButton />
        </div>
        <nav className="catnav" aria-label="Categorías">
          <div className="wrap">
            <Link href="/catalog" className={pathname === "/catalog" && !activeCat ? "active" : ""}>Todo</Link>
            {categories.map((c) => (
              <Link key={c.slug} href={`/catalog?cat=${c.slug}`} className={activeCat === c.slug ? "active" : ""}>
                {c.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
