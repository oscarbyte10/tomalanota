import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import { Allergen } from '@components';

type MenuItemCardProps = {
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  allergens?: number[];
};

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  name,
  description,
  image,
  price,
  allergens,
}) => {
  const t = useTranslations('MenuItemCard');

  return (
    <Card className="max-w-lg">
      <CardHeader className="flex gap-3">
        <img
          alt={t('imageAlt', { dish: name })}
          height={80}
          src={image}
          width={80}
          className="rounded-sm"
        />
        <div className="flex flex-col">
          {name && <p className="text-md">{name}</p>}
          {price && <p className="mt-2 text-default-500">{price}€</p>}
        </div>
      </CardHeader>
      {description && (
        <>
          <Divider />
          <CardBody>
            <p>{description}</p>
          </CardBody>
        </>
      )}
      {allergens?.length ? (
        <>
          <Divider />
          <CardFooter className="gap-4">
            {allergens?.map((id) => <Allergen key={id} id={id} />)}
          </CardFooter>
        </>
      ) : null}
    </Card>
  );
};
