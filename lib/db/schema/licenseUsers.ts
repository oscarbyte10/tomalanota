import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { licenses } from './licenses';
import { nanoid } from '@/lib/utils';

export const licenseUsers = pgTable('license_users', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  licenseId: varchar('license_id', { length: 191 }).references(
    () => licenses.id,
  ),
  userId: varchar('user_id', { length: 191 }).references(() => users.id),
});
