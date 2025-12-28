import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used, fallback to English if not
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = 'en';
  }

  // Return empty messages since resume data is fetched from GitHub in page component
  return {
    locale,
    messages: {}
  };
});

