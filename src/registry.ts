import { join, basename, dirname } from 'path';
import { readdirSync, readFileSync } from 'fs';
import type { LocaleData } from './types.js';

const locales = new Map<string, Record<string, string>>();
let defaultLocale: string | undefined;

function resolveDataDir(): string {
  // Works in both ESM and CJS contexts
  const pkgPath = require.resolve('i18n-country-translations-data/package.json');
  return join(dirname(pkgPath), 'data');
}

/** Load a single locale from the i18n-country-translations-data package and register it. */
export function loadLocale(locale: string): void {
  const dataDir = resolveDataDir();
  const filePath = join(dataDir, `${locale}.json`);
  const raw = readFileSync(filePath, 'utf8');
  const countries = JSON.parse(raw);
  locales.set(locale, countries);
}

/** Load all available locales from the i18n-country-translations-data package. */
export function loadAllLocales(): void {
  const dataDir = resolveDataDir();
  const files = readdirSync(dataDir).filter((f: string) => f.endsWith('.json'));
  for (const file of files) {
    const locale = basename(file, '.json');
    const raw = readFileSync(join(dataDir, file), 'utf8');
    const countries = JSON.parse(raw);
    locales.set(locale, countries);
  }
}

export function setDefaultLocale(locale: string): void {
  if (!locales.has(locale)) {
    throw new Error(`setDefaultLocale: locale "${locale}" is not registered`);
  }
  defaultLocale = locale;
}

export function getDefaultLocale(): string | undefined {
  return defaultLocale;
}

export function registerAllLocales(allData: LocaleData[]): void {
  for (const data of allData) {
    registerLocale(data);
  }
}

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
