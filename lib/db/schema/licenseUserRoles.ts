import { pgTable, integer, varchar, serial } from 'drizzle-orm/pg-core';
import { users } from './users';
import { licenses } from './licenses';

export const licenseUserRoles = pgTable('license_user_roles', {
  id: serial('id').primaryKey(),

  licenseId: integer('license_id')
    .references(() => licenses.id, { onDelete: 'cascade' })
    .notNull(),

  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),

  role: integer('role').notNull(),
});
