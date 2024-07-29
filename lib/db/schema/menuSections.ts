import {
  pgTable,
  timestamp,
  varchar,
  serial,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { workspaces } from './workspaces';

export const menuSections = pgTable('menu_sections', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),

  workspaceId: integer('workspace_id')
    .references(() => workspaces.id)
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  createdBy: integer('created_by')
    .references(() => users.id)
    .notNull(),
});
