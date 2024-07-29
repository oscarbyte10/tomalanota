import {
  pgTable,
  varchar,
  numeric,
  serial,
  integer,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { menuSections } from './menuSections';

export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),

  description: varchar('description', { length: 510 }),

  image: varchar('image', { length: 255 }),

  price: numeric('price', { precision: 10, scale: 2 }).notNull(),

  visible: boolean('visible').notNull().default(true),

  embed: boolean('embed').notNull().default(true),

  menuSectionId: integer('menu_section_id')
    .references(() => menuSections.id)
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
});
