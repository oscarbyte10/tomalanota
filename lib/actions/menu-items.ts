'use server';

import { SQL, sql } from 'drizzle-orm';

import { db } from '../db';
import {
  insertMenuItemSchema,
  menuItems,
  NewMenuItem,
  SelectMenuItem,
} from '../db/schema/menu-items';
import { CrudBaseRespose } from '../utils';

export const createMenuSection = async (input: NewMenuItem) => {
  const response: CrudBaseRespose = { success: true };

  try {
    const payload = insertMenuItemSchema.parse(input);
    await db.insert(menuItems).values(payload);
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

export const selectMenuSections = async (input: SelectMenuItem) => {
  const response: CrudBaseRespose = { success: true };

  try {
    let whereExps: SQL[] = [];

    if (input.id) whereExps.push(sql`${menuItems.id} = ${input.id}`);
    if (input.menuSectionId)
      whereExps.push(sql`${menuItems.menuSectionId} = ${input.menuSectionId}`);
    if (input.name) whereExps.push(sql`${menuItems.name} = ${input.name}`);

    const sections = await db
      .select()
      .from(menuItems)
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
