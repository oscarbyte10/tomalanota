// import { nanoid } from '@/lib/utils';
// import { index, pgTable, text, varchar, vector } from 'drizzle-orm/pg-core';

// export const embeddings = pgTable(
//   'embeddings',
//   {
//     id: varchar('id', { length: 191 })
//       .primaryKey()
//       .$defaultFn(() => nanoid()),

//     content: text('content').notNull(),

//     embedding: vector('embedding', { dimensions: 1536 }).notNull(),
//   },

//   table => ({
//     embeddingIndex: index('embeddingIndex').using(
//       'hnsw',
//       table.embedding.op('vector_cosine_ops'),
//     ),
//   }),
// );
