import { pgTable, timestamp, varchar, serial } from 'drizzle-orm/pg-core';

export const licenses = pgTable('licenses', {
  id: serial('id').primaryKey(),

  licenseKey: varchar('license_key', { length: 255 }).unique().notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
