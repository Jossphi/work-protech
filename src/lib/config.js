// Número de WhatsApp de la empresa que recibe los pedidos (formato internacional sin "+").
// Se configura con la variable NEXT_PUBLIC_WHATSAPP_NUMBER en Vercel.
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51984108672").replace(/\D/g, "");

export function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
