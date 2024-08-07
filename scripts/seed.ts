import { sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { allergens } from '@/lib/db/schema/allergens';
import { licenseUserRoles } from '@/lib/db/schema/license-user-roles';
import { licenseUsers } from '@/lib/db/schema/license-users';
import { licenses } from '@/lib/db/schema/licenses';
import { menuItemAllergens } from '@/lib/db/schema/menu-item-allergens';
import { menuItems } from '@/lib/db/schema/menu-items';
import { menuSections } from '@/lib/db/schema/menu-sections';
import { users } from '@/lib/db/schema/users';
import { workspaces } from '@/lib/db/schema/workspaces';

const ALLERGENS_URL =
  'https://qnjpseqsshhcvnsycnll.supabase.co/storage/v1/object/public/tomalanota/allergens.json';
const FAKE_MENU_URL =
  'https://qnjpseqsshhcvnsycnll.supabase.co/storage/v1/object/public/tomalanota/menu.json';

async function seed() {
  console.log('🌱 Seeding database...');

  console.log('🧹 Clearing old data...');

  await db.execute(sql`TRUNCATE TABLE ${licenses} RESTART IDENTITY CASCADE`);
  await db.execute(sql`TRUNCATE TABLE ${users} RESTART IDENTITY CASCADE`);
  await db.execute(sql`TRUNCATE TABLE ${allergens} RESTART IDENTITY CASCADE`);

  console.log('🧪 Building main stack (license, user, workspace)...');

  const [newLicense] = await db
    .insert(licenses)
    .values({
      licenseKey: '0000-0000-0000-0000',
    })
    .returning();

  const [newUser] = await db
    .insert(users)
    .values({
      username: 'admin',
      email: 'admin@admin.com',
      hashedPassword: 'admin',
    })
    .returning();

  // Add admin relation license-user
  await db.insert(licenseUsers).values({
    licenseId: newLicense.id,
    userId: newUser.id,
  });

  await db.insert(licenseUserRoles).values({
    licenseId: newLicense.id,
    userId: newUser.id,
    role: 1,
  });

  const [newWorkspace] = await db
    .insert(workspaces)
    .values({
      name: 'Inclan Brutal',
      licenseId: newLicense.id,
      createdBy: newUser.id,
    })
    .returning();

  console.log('📦 Downloading fake data...');

  let response;

  response = await fetch(FAKE_MENU_URL);
  const fakeMenu: object[] = await response.json();

  response = await fetch(ALLERGENS_URL);
  const allergensData: object[] = await response.json();

  console.log('🧪 Inserting fake data...');

  // @ts-ignore
  await db.insert(allergens).values(allergensData);

  for (const fakeMenuSection of fakeMenu) {
    let [newMenuSection] = await db
      .insert(menuSections)
      .values({
        //@ts-ignore
        name: fakeMenuSection['name'],
        workspaceId: newWorkspace.id,
        createdBy: newUser.id,
      })
      .returning();

    //@ts-ignore
    let fakeMenuItems: object[] = fakeMenuSection['menu_items'];

    for (const fakeMenuItem of fakeMenuItems) {
      let [newMenuItem] = await db
        .insert(menuItems)
        .values({
          //@ts-ignore
          name: fakeMenuItem['name'],
          //@ts-ignore
          description: fakeMenuItem['description'],
          //@ts-ignore
          price: fakeMenuItem['price'],
          //@ts-ignore
          image: fakeMenuItem['image'],
          menuSectionId: newMenuSection.id,
          createdBy: newUser.id,
        })
        .returning();

      //@ts-ignore
      let fakeMenuItemAllergenIds: number[] = fakeMenuItem['allergens'];

      let fakeMenuItemAllergens = fakeMenuItemAllergenIds.map((allergenId) => ({
        allergenId: allergenId,
        menuItemId: newMenuItem.id,
      }));

      if (fakeMenuItemAllergens.length > 0)
        await db.insert(menuItemAllergens).values(fakeMenuItemAllergens);
    }
  }
}

seed()
  .then(() => {
    console.log('Seeding complete');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Failed to seed database');
    console.error(e);
    process.exit(1);
  });
