'use server';

import { openai } from '@ai-sdk/openai';
import { embedMany } from 'ai';

import { env } from '../env.mjs';

const embeddingModel = openai.embedding(env.EMBEDDING_MODEL);

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter((i) => i !== '');
};

interface GenerateEmbeddingsOptions {
  enable_chunks?: boolean;
}

export const generateEmbeddings = async (
  value: string,
  options: GenerateEmbeddingsOptions = {},
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks =
    options.enable_chunks !== false ? generateChunks(value) : [value];

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};
