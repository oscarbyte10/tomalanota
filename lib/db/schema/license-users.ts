import { integer, pgTable, serial } from 'drizzle-orm/pg-core';

import { licenses } from './licenses';
import { users } from './users';

export const licenseUsers = pgTable('license_users', {
  id: serial('id').primaryKey(),

  licenseId: integer('license_id')
    .references(() => licenses.id, { onDelete: 'cascade' })
    .notNull(),

  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
});
