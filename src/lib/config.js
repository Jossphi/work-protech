// Datos de contacto de Work Protech (Manual de Identidad Digital: cabecera superior).
export const CONTACT = {
  phone: "+51 936 628 362",
  phoneHref: "tel:+51936628362",
  email: "ventas@workprotech.com",
  city: "Lima - Perú",
  address: "C/ Bolívar 472 ofc. 506, Miraflores, Lima",
  company: "Work Protech SACS",
  ruc: "20615339637",
};

export const TAGLINE = "Innovación que te protege";

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/catalog", label: "Productos" },
  { href: "/marcas", label: "Marcas" },
  { href: "/sectores", label: "Sectores" },
  { href: "/asesoria-tecnica", label: "Asesoría técnica" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export const SECTORS = [
  { slug: "mineria", name: "Minería", text: "Operación a cielo abierto y mantenimiento." },
  { slug: "industria", name: "Industria", text: "Planta, producción y mantenimiento." },
  { slug: "construccion", name: "Construcción", text: "Obra y montaje." },
  { slug: "agroindustria", name: "Agroindustria", text: "Campo y procesamiento." },
  { slug: "logistica", name: "Logística", text: "Almacén, transporte y distribución." },
];

// Número de WhatsApp de la empresa que recibe los pedidos (formato internacional sin "+").
// Se configura con la variable NEXT_PUBLIC_WHATSAPP_NUMBER en Vercel.
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51984108672").replace(/\D/g, "");

export function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
