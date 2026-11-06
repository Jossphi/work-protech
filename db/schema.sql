-- Esquema de la base de datos de Work Protech (Neon Postgres)
-- E-commerce sin precios: el carrito se envía como pedido por WhatsApp.

-- Categorías (admite subcategorías mediante parent_id)
CREATE TABLE IF NOT EXISTS categories (
  id          SERIAL PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  kicker      TEXT,
  description TEXT,
  parent_id   INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Marcas
CREATE TABLE IF NOT EXISTS brands (
  id         SERIAL PRIMARY KEY,
  slug       TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  logo_url   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Productos (sin precio)
CREATE TABLE IF NOT EXISTS products (
  id            SERIAL PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  code          TEXT,
  name          TEXT NOT NULL,
  brand_id      INTEGER REFERENCES brands(id) ON DELETE SET NULL,
  category_id   INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  norm          TEXT,
  description   TEXT,
  variant_label TEXT NOT NULL DEFAULT 'Talla',
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS products_category_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_brand_idx ON products(brand_id);

-- Imágenes de producto (la de menor sort_order es la principal)
CREATE TABLE IF NOT EXISTS product_images (
  id         SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS product_images_product_idx ON product_images(product_id);

-- Características destacadas del producto
CREATE TABLE IF NOT EXISTS product_features (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS product_features_product_idx ON product_features(product_id);

-- Variantes: talla, color y otros atributos (attributes en JSON)
CREATE TABLE IF NOT EXISTS product_variants (
  id         SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku        TEXT UNIQUE,
  size       TEXT,
  color      TEXT,
  attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
  stock      INTEGER,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE NULLS NOT DISTINCT (product_id, size, color)
);
CREATE INDEX IF NOT EXISTS product_variants_product_idx ON product_variants(product_id);

-- Pedidos / cotizaciones enviados por WhatsApp
CREATE TABLE IF NOT EXISTS orders (
  id             SERIAL PRIMARY KEY,
  order_number   TEXT NOT NULL UNIQUE,
  type           TEXT NOT NULL DEFAULT 'pedido' CHECK (type IN ('pedido', 'cotizacion')),
  status         TEXT NOT NULL DEFAULT 'nuevo'
                 CHECK (status IN ('nuevo', 'contactado', 'cotizado', 'cerrado', 'cancelado')),
  channel        TEXT NOT NULL DEFAULT 'whatsapp',
  customer_name  TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  company        TEXT,
  document_id    TEXT,
  city           TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS orders_created_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- Detalle del pedido. Guarda copia del nombre/código para conservar
-- el historial aunque luego se edite o elimine el producto.
CREATE TABLE IF NOT EXISTS order_items (
  id           SERIAL PRIMARY KEY,
  order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   INTEGER REFERENCES products(id) ON DELETE SET NULL,
  variant_id   INTEGER REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_code TEXT,
  size         TEXT,
  color        TEXT,
  quantity     INTEGER NOT NULL CHECK (quantity > 0),
  notes        TEXT
);
CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items(order_id);
