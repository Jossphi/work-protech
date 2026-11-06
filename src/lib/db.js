import "server-only";
import { neon } from "@neondatabase/serverless";

let client;

// Cliente SQL de Neon (HTTP). Se crea al primer uso.
export function db() {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error("Falta la variable de entorno DATABASE_URL");
    }
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}
