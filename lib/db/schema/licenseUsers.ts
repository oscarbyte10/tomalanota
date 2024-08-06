import { pgTable, integer, serial } from 'drizzle-orm/pg-core';
import { users } from './users';
import { licenses } from './licenses';

export const licenseUsers = pgTable('license_users', {
  id: serial('id').primaryKey(),

  licenseId: integer('license_id')
    .references(() => licenses.id, { onDelete: 'cascade' })
    .notNull(),

  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
});
