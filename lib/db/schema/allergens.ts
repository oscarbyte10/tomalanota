import { pgTable, serial } from 'drizzle-orm/pg-core';

export const allergens = pgTable('allergens', {
  id: serial('id').primaryKey(),
});
