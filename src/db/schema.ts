/** @format */

import { AVAILABLE_STATUS } from "@/constants/data";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type Status = (typeof AVAILABLE_STATUS)[number]["id"];
const statues = AVAILABLE_STATUS.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statues as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  status: statusEnum("status").notNull(),
});
