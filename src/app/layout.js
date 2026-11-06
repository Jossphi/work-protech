import { Suspense } from "react";
import Script from "next/script";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/catalog";
import "./globals.css";

export const revalidate = 300;

export const metadata = {
  title: {
    default: "Work Protech | Ropa de trabajo Paredes Seguridad",
    template: "%s | Work Protech",
  },
  description:
    "Ropa de trabajo Paredes Seguridad: camisetas, polos, sudaderas, polares, softshell, parkas, chalecos y pantalones. Arma tu pedido y envíalo por WhatsApp.",
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/_ds/classical-fe2ab21a-edfa-48c3-b630-599a553acd19/styles.css" />
      </head>
      <body>
        <StoreProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Suspense fallback={null}>
              <Header categories={categories} />
            </Suspense>
            <main style={{ flex: 1 }}>{children}</main>
            <Footer categories={categories} />
          </div>
        </StoreProvider>
        <Script src="/_ds/classical-fe2ab21a-edfa-48c3-b630-599a553acd19/_ds_bundle.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
