import { getLocaleData } from './registry.js';

export function getName(code: string, locale: string): string | undefined {
  if (typeof code !== 'string' || typeof locale !== 'string') return undefined;
  const data = getLocaleData(locale);
  if (!data) return undefined;
  return data[code.toUpperCase()];
}

export function getAlpha2Code(name: string, locale: string): string | undefined {
  if (typeof name !== 'string' || typeof locale !== 'string') return undefined;
  const data = getLocaleData(locale);
  if (!data) return undefined;

  const lowerName = name.toLowerCase();
  for (const [code, countryName] of Object.entries(data)) {
    if (countryName.toLowerCase() === lowerName) {
      return code;
    }
  }
  return undefined;
}

export function getNames(locale: string): Record<string, string> | undefined {
  if (typeof locale !== 'string') return undefined;
  const data = getLocaleData(locale);
  if (!data) return undefined;
  return { ...data };
}
