import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { IconMail, IconPhone, IconPin, IconWhatsapp } from "@/components/Icons";
import { CONTACT, WHATSAPP_NUMBER } from "@/lib/config";

export const metadata = { title: "Contacto" };

export default function Contacto() {
  const items = [
    [IconPhone, "Teléfono", CONTACT.phone, CONTACT.phoneHref],
    [IconWhatsapp, "WhatsApp", `+${WHATSAPP_NUMBER}`, `https://wa.me/${WHATSAPP_NUMBER}`],
    [IconMail, "Correo", CONTACT.email, `mailto:${CONTACT.email}`],
    [IconPin, "Dirección", CONTACT.address, null],
  ];
  return (
    <>
      <PageHero eyebrow="Contacto" title="Hablemos de tu proyecto">
        Escríbenos para solicitar una cotización, asesoría técnica o información de productos.
      </PageHero>
      <section className="section">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32, alignItems: "start" }}>
          <div className="cards" style={{ gridTemplateColumns: "1fr" }}>
            {items.map(([Icon, t, v, href]) => (
              <div key={t} className="info-card" style={{ display: "flex", gap: 16, alignItems: "center", padding: 18 }}>
                <span className="ico" style={{ marginBottom: 0, flex: "0 0 auto" }}><Icon size={22} /></span>
                <div>
                  <div className="label">{t}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontWeight: 600, color: "var(--graphite)" }} className="wp-num">{v}</a>
                  ) : (
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  )}
                </div>
              </div>
            ))}
            <p className="muted" style={{ fontSize: 13.5 }}>{CONTACT.company} · RUC {CONTACT.ruc}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
