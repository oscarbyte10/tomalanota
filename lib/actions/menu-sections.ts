'use server';

import { SQL, sql } from 'drizzle-orm';

import { db } from '../db';
import {
  insertMenuSectionSchema,
  menuSections,
  NewMenuSection,
  SelectMenuSection,
} from '../db/schema/menu-sections';
import { CrudBaseRespose } from '../utils';

export const createMenuSection = async (input: NewMenuSection) => {
  const response: CrudBaseRespose = { success: true };

  try {
    const payload = insertMenuSectionSchema.parse(input);
    await db.insert(menuSections).values(payload);
    response.message = `Section ${payload.name} created successfully.`;
  } catch (exc) {
    if (exc instanceof Error) {
      response.message =
        exc.message.length > 0 ? exc.message : 'Error, please try again.';
      response.success = false;
    }
  }

  return response;
};

export const selectMenuSections = async (input: SelectMenuSection) => {
  const response: CrudBaseRespose = { success: true };

  try {
    let whereExps: SQL[] = [];

    if (input.id) whereExps.push(sql`${menuSections.id} = ${input.id}`);
    if (input.workspaceId)
      whereExps.push(sql`${menuSections.workspaceId} = ${input.workspaceId}`);
    if (input.name) whereExps.push(sql`${menuSections.name} = ${input.name}`);

    const sections = await db
      .select()
      .from(menuSections)
      .where(sql`${sql.join(whereExps, ' AND ')}`);

    response.body = sections;
  } catch (exc) {
    if (exc instanceof Error) {
      response.message =
        exc.message.length > 0 ? exc.message : 'Error, please try again.';
      response.success = false;
    }
  }

  return response;
};
