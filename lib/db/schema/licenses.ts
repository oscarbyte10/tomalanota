import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from '@/lib/utils';

export const licenses = pgTable('licenses', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),

  licenseKey: varchar('license_key', { length: 255 }).unique().notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
