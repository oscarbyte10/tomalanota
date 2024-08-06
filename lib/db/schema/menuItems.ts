import {
  pgTable,
  varchar,
  numeric,
  serial,
  integer,
  timestamp,
  boolean,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { menuSections } from './menuSections';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const menuItems = pgTable(
  'menu_items',
  {
    id: serial('id').primaryKey(),

    name: varchar('name', { length: 255 }).notNull(),

    description: varchar('description', { length: 2040 }),

    image: varchar('image', { length: 255 }),

    price: numeric('price', { precision: 10, scale: 2 }).notNull(),

    visible: boolean('visible').notNull().default(true),

    embed: boolean('embed').notNull().default(true),

    menuSectionId: integer('menu_section_id')
      .references(() => menuSections.id, { onDelete: 'cascade' })
      .notNull()
      .default(0),

    createdBy: integer('created_by')
      .references(() => users.id)
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updateAt: timestamp('update_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    nameIdx: index('name_idx').on(table.name),
    menuSectionIdIdx: index('menu_section_id_idx').on(table.menuSectionId),
  }),
);

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
  createdAt: true,
});

export type NewMenuItem = z.infer<typeof insertMenuItemSchema>;

export const selectMenuItemSchema = createSelectSchema(menuItems).omit({
  createdAt: true,
  createdBy: true,
  updateAt: true,
  description: true,
  image: true,
  price: true,
  visible: true,
  embed: true,
});

export type SelectMenuItem = Partial<z.infer<typeof selectMenuItemSchema>>;
