// Muestras de color aproximadas para los nombres del catálogo.
const HEX = {
  granate: "#7b1e2b",
  "verde botella": "#1f4d2e",
  marino: "#1c2840",
  royal: "#1f4fd1",
  negro: "#151515",
  "gris plomo": "#55585c",
  blanco: "#ffffff",
  "azul jaspe": "#5a73a8",
  "salmón jaspe": "#c26a6f",
  "gris jaspe": "#8a8c8e",
  "verde militar": "#4f5a37",
  "gris vigoré": "#c7c8ca",
  rojo: "#d32626",
  "gris antracita": "#6a6d70",
  gris: "#6e7175",
  verde: "#6b7f45",
  beige: "#cdb894",
};

export function swatchStyle(name = "") {
  const parts = name.toLowerCase().split("/").map((s) => s.trim());
  const cols = parts.map((p) => HEX[p] || "#bbbbbb");
  return cols.length > 1
    ? { background: `linear-gradient(135deg, ${cols[0]} 50%, ${cols[1]} 50%)` }
    : { background: cols[0] };
}
