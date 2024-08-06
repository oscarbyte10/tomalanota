import { Button, Link } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <>
      <header className="flex justify-center items-center h-32">
        <h1 className="text-4xl text-blue-900">Toma La Nota</h1>
      </header>
      <main className="flex min-h-screen flex-col items-center p-10 gap-8">
        <Button
          color="primary"
          size="lg"
          fullWidth
          as={Link}
          href="/menu/starters"
        >
          🥗 {t('starters')}
        </Button>
        <Button
          color="primary"
          size="lg"
          fullWidth
          as={Link}
          href="/menu/main-courses"
        >
          🍝 {t('mainCourses')}
        </Button>
        <Button
          color="primary"
          size="lg"
          fullWidth
          as={Link}
          href="/menu/desserts"
        >
          🍰 {t('desserts')}
        </Button>
        <Button
          color="primary"
          size="lg"
          fullWidth
          as={Link}
          href="/menu/drinks"
        >
          🍹 {t('drinks')}
        </Button>
      </main>
    </>
  );
}
