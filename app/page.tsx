import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <>
      <header>
        <h1>Toma La Nota</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button>{t('title')}</Button>
      </main>
    </>
  );
}
