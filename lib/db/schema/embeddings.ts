import {
  index,
  integer,
  pgTable,
  text,
  varchar,
  vector,
} from 'drizzle-orm/pg-core';

import { nanoid } from '@/lib/utils';

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
      .references(() => workspaces.id, { onDelete: 'cascade' })
      .notNull(),

    content: text('content').notNull(),

    embedding: vector('embedding', { dimensions: 1536 }).notNull(),
  },

  (table) => ({
    embeddingIndex: index('embedding_index').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops'),
    ),
  }),
);
