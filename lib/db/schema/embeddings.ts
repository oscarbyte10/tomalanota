import { nanoid } from '@/lib/utils';
import {
  index,
  integer,
  pgTable,
  text,
  varchar,
  vector,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { workspaces } from './workspaces';

export const embeddings = pgTable(
  'embeddings',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),

    resourceType: integer('resource_type').notNull(),

    resourceId: integer('resource_id').notNull(),

    workspaceId: integer('workspace_id')
      .references(() => workspaces.id)
      .notNull(),

    content: text('content').notNull(),

    embedding: vector('embedding', { dimensions: 1536 }).notNull(),

    createdBy: integer('created_by')
      .references(() => users.id)
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updateAt: timestamp('update_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },

  (table) => ({
    embeddingIndex: index('embedding_index').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops'),
    ),
  }),
);
