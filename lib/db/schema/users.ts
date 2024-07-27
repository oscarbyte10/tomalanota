import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  username: varchar('username', { length: 255 }).unique().notNull(),

  email: varchar('email', { length: 255 }).unique().notNull(),

  hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  isActive: boolean('is_active').default(true),
});
