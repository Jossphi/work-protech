import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/catalog";
import "./globals.css";

export const revalidate = 300;

export const metadata = {
  title: {
    default: "Work Protech | EPP de alta calidad · Protección real para cada industria",
    template: "%s | Work Protech",
  },
  description:
    "Equipos de protección personal y vestuario de trabajo para minería, industria, construcción, agroindustria y logística. Arma tu pedido y solicita tu cotización por WhatsApp.",
};

export default async function RootLayout({ children }) {
  const families = await getCategories();
  return (
    <html lang="es">
      <body>
        <StoreProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer families={families} />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
