import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button color="warning" isLoading={true}>
        {t('title')}
      </Button>
    </main>
  );
}
