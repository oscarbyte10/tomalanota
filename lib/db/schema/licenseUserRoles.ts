import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { licenses } from './licenses';
import { nanoid } from '@/lib/utils';

export const licenseUserRoles = pgTable('license_user_roles', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  licenseId: varchar('license_id', { length: 191 }).references(
    () => licenses.id,
  ),
  userId: varchar('user_id', { length: 191 }).references(() => users.id),
  role: varchar('role', { length: 255 }),
});
