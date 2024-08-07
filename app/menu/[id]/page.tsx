import { Button, Link } from '@nextui-org/react';

import { MenuItemCard, MenuItemsContainer } from '@components';
import { BackArrow } from '@icons/back-arrow';

import menu from '../../../temp/menu.json';
const menuItems = menu[0].menu_items;

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <header className="flex items-center h-32 gap-10 justify-between p-4">
        <Button isIconOnly variant="bordered" href="/" as={Link}>
          <BackArrow width={48} />
        </Button>
        <h1 className="text-4xl text-blue-900 flex-grow text-center">
          {params.id}
        </h1>
      </header>
      <MenuItemsContainer>
        {menuItems.map(({ name, description, image, price, allergens }) => (
          <MenuItemCard
            key={name}
            name={name}
            description={description}
            image={image}
            price={price}
            allergens={allergens}
          />
        ))}
      </MenuItemsContainer>
    </>
  );
}
