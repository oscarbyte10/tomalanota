import {
  pgTable,
  varchar,
  numeric,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { menuSections } from './menuSections';
import { nanoid } from '@/lib/utils';

export const menuItems = pgTable('menu_items', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 510 }),
  image: varchar('image', { length: 255 }),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),

  menuSectionId: varchar('menu_section_id').references(() => menuSections.id),

  createdBy: integer('created_by')
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
