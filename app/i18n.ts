import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const headerLocale = headers().get('accept-language')?.slice(0, 2);
  const locale = headerLocale || 'es';

  const messages = await import(`./messages/${locale}.json`)
    .then((module) => module.default)
    .catch(async () => (await import(`./messages/es.json`)).default);

  return { locale, messages };
});
