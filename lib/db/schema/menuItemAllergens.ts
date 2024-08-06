import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { menuItems } from './menuItems';
import { allergens } from './allergens';

export const menuItemAllergens = pgTable('menu_item_allergens', {
  id: serial('id').primaryKey(),

  menuItemId: integer('menu_item_id').references(() => menuItems.id, {
    onDelete: 'cascade',
  }),

  allergenId: integer('allergen_id').references(() => allergens.id, {
    onDelete: 'cascade',
  }),
});
