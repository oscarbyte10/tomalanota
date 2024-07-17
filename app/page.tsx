import { Button } from '@nextui-org/button';
import { NextUIProvider } from '@nextui-org/react';

export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button color="warning" isLoading={true}>
          Under construction...
        </Button>
      </main>
    </NextUIProvider>
  );
}
