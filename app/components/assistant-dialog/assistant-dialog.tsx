import { IconRobot } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/drawer/drawer';
import { StreamText } from '@components';

export const AssistantDialog = () => {
  const t = useTranslations('AssistantDialog');

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[300px] bg-background rounded-full shadow-lg px-4 py-2 flex items-center justify-center cursor-pointer">
          Open Assistant
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-background p-4 rounded-t-2xl shadow-lg">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-medium">
            <IconRobot
              className="justify-self-center"
              color="#d20cdc"
              stroke={1.5}
              width={48}
              height={48}
            />
          </DrawerTitle>
          <StreamText text={t('welcome')} />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
