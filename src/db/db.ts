/** @format */

// /** @format */

// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 20 });

// export const db = drizzle(pool);

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  max: 5,
});
export const db = drizzle(pool);
