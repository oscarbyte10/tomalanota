import { NextUIProvider } from '@nextui-org/react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NextUIProvider>{children}</NextUIProvider>
    </NextIntlClientProvider>
  );
};
