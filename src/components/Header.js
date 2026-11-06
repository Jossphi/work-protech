"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { CONTACT, NAV, TAGLINE } from "@/lib/config";
import { IconClose, IconDoc, IconMail, IconMenu, IconPhone, IconPin, IconSearch, IconArrow } from "@/components/Icons";

const noopSubscribe = () => () => {};

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href === "/catalog") return pathname.startsWith("/catalog") || pathname.startsWith("/product");
  return pathname.startsWith(href);
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { count: storedCount, loaded } = useStore();
  // El contador sale de localStorage: no se muestra hasta que la cabecera está hidratada.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const count = hydrated ? storedCount : 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="items">
            <a className="item" href={CONTACT.phoneHref}><IconPhone size={15} />{CONTACT.phone}</a>
            <a className="item" href={`mailto:${CONTACT.email}`}><IconMail size={15} />{CONTACT.email}</a>
            <span className="item hide-sm"><IconPin size={15} />{CONTACT.city}</span>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap bar">
          <Link href="/" className="brand-logo" aria-label="Work Protech, inicio" onClick={() => setMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/marca/logo-work-protech.png" alt="Work Protech" width="225" height="44" />
            <span className="tag">{TAGLINE}</span>
          </Link>

          <nav className={`mainnav ${menuOpen ? "open" : ""}`} aria-label="Navegación principal">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={isActive(pathname, n.href) ? "active" : ""}
                aria-current={isActive(pathname, n.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="icon-btn" aria-label="Buscar" aria-expanded={searchOpen} onClick={() => { setSearchOpen((v) => !v); setMenuOpen(false); }}>
              <IconSearch />
            </button>
            <Link href="/cart" className="cta-quote" aria-label={`Solicitar cotización (${count} productos)`} onClick={() => setMenuOpen(false)}>
              <IconDoc size={18} />
              <span className="txt">Solicitar <span className="txt-long">cotización</span></span>
              {hydrated && loaded && count > 0 ? <span className="badge wp-num">{count}</span> : <IconArrow size={16} />}
            </Link>
            <button type="button" className="icon-btn menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => { setMenuOpen((v) => !v); setSearchOpen(false); }}>
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-pop">
            <form className="wrap" role="search" onSubmit={onSearch}>
              <input
                autoFocus
                type="search"
                placeholder="Buscar productos: polo, softshell, pantalón multibolsillos…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar productos"
              />
              <button type="submit" className="btn-solid">Buscar</button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
