import { StoreProvider } from "@/context/StoreContext";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Work Protech Store",
  description: "Distribuidor oficial Paredes Seguridad & Singer Safety",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/_ds/classical-fe2ab21a-edfa-48c3-b630-599a553acd19/styles.css" />
      </head>
      <body>
        <StoreProvider>
          <div style={{ minHeight: "100vh", background: "var(--color-bg)", fontFamily: "var(--font-body)", color: "var(--color-text)", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
        <Script src="/_ds/classical-fe2ab21a-edfa-48c3-b630-599a553acd19/_ds_bundle.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
