import type { LocaleData } from './types.js';

const locales = new Map<string, Record<string, string>>();

export function registerLocale(data: LocaleData): void {
  if (
    !data ||
    typeof data.locale !== 'string' ||
    data.locale.length === 0 ||
    typeof data.countries !== 'object' ||
    data.countries === null ||
    Array.isArray(data.countries)
  ) {
    throw new Error('registerLocale: data must have a non-empty string "locale" and a non-null object "countries"');
  }
  locales.set(data.locale, { ...data.countries });
}

export function getSupportedLocales(): string[] {
  return Array.from(locales.keys());
}

export function isLocaleRegistered(locale: string): boolean {
  return locales.has(locale);
}

export function getLocaleData(locale: string): Record<string, string> | undefined {
  return locales.get(locale);
}
