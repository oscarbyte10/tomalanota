import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { licenses } from './licenses';
import { users } from './users';

export const workspaces = pgTable('workspaces', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),

  licenseId: integer('license_id')
    .references(() => licenses.id, { onDelete: 'cascade' })
    .notNull(),

  createdBy: integer('created_by')
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
