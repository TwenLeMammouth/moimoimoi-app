// import {getRequestConfig} from 'next-intl/server';

// export const locales = ['fr', 'en'] as const;
// export type Locale = (typeof locales)[number];
// export const defaultLocale = 'fr';

// export default getRequestConfig(async ({locale}) => ({
//   // adapte le chemin si tes messages sont ailleurs
//   messages: (await import(`./src/messages/${locale}.json`)).default
// }));