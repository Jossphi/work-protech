import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { whatsappUrl } from "@/lib/config";

const DOC_TYPES = ["DNI", "Pasaporte", "Carné de extranjería"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v, max = 200) {
  return typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function validateCustomer(c = {}) {
  const out = {
    name: clean(c.name, 120),
    documentType: DOC_TYPES.includes(c.documentType) ? c.documentType : "",
    documentId: clean(c.documentId, 20).toUpperCase(),
    phone: clean(c.phone, 30),
    email: clean(c.email, 160).toLowerCase(),
    address: clean(c.address, 250),
    notes: typeof c.notes === "string" ? c.notes.trim().slice(0, 1000) : "",
  };
  const errors = {};
  if (out.name.length < 3) errors.name = "Escribe tu nombre completo.";
  if (!out.documentType) errors.documentType = "Elige el tipo de documento.";
  if (out.documentType === "DNI" && !/^\d{8}$/.test(out.documentId)) errors.documentId = "El DNI debe tener 8 dígitos.";
  else if (out.documentType && !/^[A-Z0-9-]{5,20}$/.test(out.documentId)) errors.documentId = "Número de documento no válido.";
  if (out.phone.replace(/\D/g, "").length < 7) errors.phone = "Escribe un número de teléfono válido.";
  if (!EMAIL_RE.test(out.email)) errors.email = "Escribe un correo válido.";
  if (out.address.length < 5) errors.address = "Escribe tu dirección.";
  return { data: out, errors };
}

function orderNumber() {
  const d = new Date();
  const ymd = d.toISOString().slice(2, 10).replace(/-/g, "");
  return `WP-${ymd}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function buildMessage(number, c, lines) {
  const total = lines.reduce((n, l) => n + l.quantity, 0);
  const out = [
    `*NUEVO PEDIDO ${number}*`,
    "",
    "*Datos del cliente*",
    `Nombre: ${c.name}`,
    `${c.documentType}: ${c.documentId}`,
    `Teléfono: ${c.phone}`,
    `Correo: ${c.email}`,
    `Dirección: ${c.address}`,
  ];
  if (c.notes) out.push(`Comentario: ${c.notes}`);
  out.push("", "*Productos*");
  lines.forEach((l, i) => {
    out.push(`${i + 1}. ${l.product_name} (${l.product_code}) — Color: ${l.color} · Talla: ${l.size} · Cantidad: ${l.quantity}`);
  });
  out.push("", `Total de prendas: ${total}`);
  return out.join("\n");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  // Campo trampa para bots: los humanos no lo ven ni lo llenan.
  if (body?.website) return Response.json({ error: "Solicitud no válida." }, { status: 400 });

  const { data: customer, errors } = validateCustomer(body?.customer);
  if (Object.keys(errors).length) return Response.json({ error: "Revisa los datos del formulario.", fields: errors }, { status: 422 });

  const rawItems = Array.isArray(body?.items) ? body.items.slice(0, 100) : [];
  const items = rawItems
    .map((i) => ({
      slug: clean(i?.slug, 80),
      color: clean(i?.color, 60),
      size: clean(i?.size, 10),
      qty: Math.floor(Number(i?.qty)),
    }))
    .filter((i) => i.slug && i.qty > 0 && i.qty <= 9999);
  if (!items.length) return Response.json({ error: "Tu carrito está vacío." }, { status: 422 });

  const sql = db();

  // Comprueba cada línea contra los productos y variantes reales.
  const found = await sql`
    SELECT i.idx, p.id AS product_id, p.name, p.code, v.id AS variant_id
    FROM jsonb_to_recordset(${JSON.stringify(items.map((it, idx) => ({ ...it, idx })))}::jsonb)
         AS i(idx int, slug text, color text, size text, qty int)
    JOIN products p ON p.slug = i.slug AND p.active
    LEFT JOIN product_variants v ON v.product_id = p.id AND v.active AND v.color = i.color AND v.size = i.size`;
  const invalid = items.filter((_, idx) => !found.find((f) => f.idx === idx && f.variant_id));
  if (invalid.length) {
    return Response.json(
      { error: "Algunos productos del carrito ya no están disponibles. Quítalos y vuelve a intentarlo.", invalid },
      { status: 409 }
    );
  }

  const lines = items.map((it, idx) => {
    const f = found.find((x) => x.idx === idx);
    return {
      product_id: f.product_id,
      variant_id: f.variant_id,
      product_name: f.name,
      product_code: f.code,
      color: it.color,
      size: it.size,
      quantity: it.qty,
    };
  });

  const number = orderNumber();
  await sql`
    WITH o AS (
      INSERT INTO orders (order_number, type, channel, customer_name, customer_phone, customer_email,
                          document_type, document_id, customer_address, notes)
      VALUES (${number}, 'pedido', 'whatsapp', ${customer.name}, ${customer.phone}, ${customer.email},
              ${customer.documentType}, ${customer.documentId}, ${customer.address}, ${customer.notes || null})
      RETURNING id
    )
    INSERT INTO order_items (order_id, product_id, variant_id, product_name, product_code, size, color, quantity)
    SELECT o.id, l.product_id, l.variant_id, l.product_name, l.product_code, l.size, l.color, l.quantity
    FROM o, jsonb_to_recordset(${JSON.stringify(lines)}::jsonb)
         AS l(product_id int, variant_id int, product_name text, product_code text, size text, color text, quantity int)`;

  return Response.json({ orderNumber: number, whatsappUrl: whatsappUrl(buildMessage(number, customer, lines)) });
}
