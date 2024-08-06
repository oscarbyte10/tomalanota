import {
  pgTable,
  timestamp,
  varchar,
  serial,
  integer,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { workspaces } from './workspaces';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const menuSections = pgTable(
  'menu_sections',
  {
    id: serial('id').primaryKey(),

    name: varchar('name', { length: 255 }).notNull(),

    workspaceId: integer('workspace_id')
      .references(() => workspaces.id, { onDelete: 'cascade' })
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    createdBy: integer('created_by')
      .references(() => users.id)
      .notNull(),
  },
  (table) => ({
    nameIdx: index('name_idx').on(table.name),
    workspaceIdIdx: index('workspace_id_idx').on(table.workspaceId),
  }),
);

export const insertMenuSectionSchema = createInsertSchema(menuSections).omit({
  id: true,
  createdAt: true,
});

export type NewMenuSection = z.infer<typeof insertMenuSectionSchema>;

export const selectMenuSectionSchema = createSelectSchema(menuSections).omit({
  createdAt: true,
  createdBy: true,
});

export type SelectMenuSection = Partial<
  z.infer<typeof selectMenuSectionSchema>
>;
