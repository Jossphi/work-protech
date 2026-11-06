import "server-only";
import { cache } from "react";
import { db } from "./db";

// Orden canónico de tallas para mostrarlas siempre igual.
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
export function sortSizes(sizes) {
  return [...sizes].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a);
    const ib = SIZE_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return String(a).localeCompare(String(b));
  });
}

export const getCategories = cache(async () => {
  const sql = db();
  return sql`
    SELECT c.slug, c.name, c.kicker, c.banner_url,
           count(p.id)::int AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id AND p.active
    WHERE c.active
    GROUP BY c.id
    ORDER BY c.sort_order, c.name`;
});

// Listado de productos para tarjetas (catálogo, inicio, relacionados).
export const getProducts = cache(async ({ category = null, q = null, featured = false, limit = 200 } = {}) => {
  const sql = db();
  // Cada palabra buscada debe coincidir con el inicio de alguna palabra (sin tildes).
  const words = q
    ? q.trim().toLowerCase().split(/\s+/).filter(Boolean).slice(0, 6).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    : null;
  return sql`
    SELECT p.slug, p.code, p.name, p.product_type, p.norm, p.featured,
           b.name AS brand, c.slug AS category, c.name AS category_name,
           (SELECT url FROM product_images i WHERE i.product_id = p.id ORDER BY i.sort_order LIMIT 1) AS image,
           (SELECT count(DISTINCT v.color)::int FROM product_variants v WHERE v.product_id = p.id AND v.active) AS color_count,
           (SELECT array_agg(DISTINCT v.color) FROM product_variants v WHERE v.product_id = p.id AND v.active) AS colors
    FROM products p
    LEFT JOIN brands b ON b.id = p.brand_id
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.active
      AND (${category}::text IS NULL OR c.slug = ${category})
      AND (${featured}::boolean = false OR p.featured)
      AND (${words}::text[] IS NULL OR NOT EXISTS (
            SELECT 1 FROM unnest(${words}::text[]) AS w
            WHERE unaccent_lower(p.name || ' ' || coalesce(p.code, '') || ' ' || coalesce(p.product_type, '') || ' ' || coalesce(p.norm, '') || ' ' || coalesce(c.name, ''))
                  !~ ('\\m' || unaccent_lower(w))))
    ORDER BY c.sort_order, p.sort_order
    LIMIT ${limit}`;
});

export const getProduct = cache(async (slug) => {
  const sql = db();
  const rows = await sql`
    SELECT p.id, p.slug, p.code, p.name, p.product_type, p.norm, p.description,
           p.variant_label, p.size_chart,
           b.name AS brand, c.slug AS category, c.name AS category_name
    FROM products p
    LEFT JOIN brands b ON b.id = p.brand_id
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE p.slug = ${slug} AND p.active`;
  const product = rows[0];
  if (!product) return null;

  const [images, features, variants] = await Promise.all([
    sql`SELECT url, alt FROM product_images WHERE product_id = ${product.id} ORDER BY sort_order`,
    sql`SELECT title, description FROM product_features WHERE product_id = ${product.id} ORDER BY sort_order`,
    sql`SELECT sku, size, color, stock FROM product_variants
        WHERE product_id = ${product.id} AND active ORDER BY sort_order`,
  ]);

  // Colores en el orden del catálogo, cada uno con sus tallas disponibles.
  const colors = [];
  for (const v of variants) {
    let entry = colors.find((c) => c.name === v.color);
    if (!entry) {
      entry = { name: v.color, sizes: [] };
      colors.push(entry);
    }
    if (v.size && !entry.sizes.includes(v.size)) entry.sizes.push(v.size);
  }
  colors.forEach((c) => (c.sizes = sortSizes(c.sizes)));
  const sizes = sortSizes([...new Set(variants.map((v) => v.size).filter(Boolean))]);

  delete product.id;
  return { ...product, images, features, colors, sizes };
});
