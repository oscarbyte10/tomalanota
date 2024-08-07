import { Tooltip } from '@nextui-org/react';

import allergens from '../../../temp/allergens.json';

export const Allergen: React.FC<{ id: number }> = ({ id }) => (
  <div className="flex flex-col items-center gap-5">
    <Tooltip content={allergens[id].name}>
      <img
        width={32}
        alt={allergens[id].name}
        src={allergens[id].image}
        className="rounded-sm"
      />
    </Tooltip>
  </div>
);
