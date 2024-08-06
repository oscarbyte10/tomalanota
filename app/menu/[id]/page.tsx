import { Button, Link } from '@nextui-org/react';

import { BackArrow } from '@icons/back-arrow';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <header className="flex items-center h-32 gap-10 justify-between p-4">
      <Button isIconOnly variant="bordered" href="/" as={Link}>
        <BackArrow width={48} />
      </Button>
      <h1 className="text-4xl text-blue-900 flex-grow text-center">
        {params.id}
      </h1>
    </header>
  );
}
