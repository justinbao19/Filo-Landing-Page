import { LANGUAGE_OPTIONS } from '@/lib/locale';
import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = await cookies();

  const language = LANGUAGE_OPTIONS.find(e => e.value === cookieStore.get('user-locale')?.value);
  const locale = language?.value || 'en';
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});