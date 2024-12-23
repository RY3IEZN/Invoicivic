/** @format */

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Customers, Invoices } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  max: 5,
});
export const db = drizzle(pool, {
  schema: { Invoices, Customers },
});
