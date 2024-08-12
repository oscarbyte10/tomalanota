import { IconRobot } from '@tabler/icons-react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/drawer/drawer';

import { StreamText } from './stream-text';

export function AssistantModal() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[300px] bg-background rounded-full shadow-lg px-4 py-2 flex items-center justify-center cursor-pointer">
          Open Menu
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-background p-4 rounded-t-2xl shadow-lg">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-medium">
            <IconRobot color="#d20cdc" stroke={1.5} width={48} height={48} />
          </DrawerTitle>
          <StreamText text="streaming text..." />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
