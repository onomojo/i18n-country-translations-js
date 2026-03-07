import { getLocaleData, getDefaultLocale } from './registry.js';

function resolveLocale(locale?: string): string | undefined {
  return locale ?? getDefaultLocale();
}

export function getName(code: string, locale?: string): string | undefined {
  const resolved = resolveLocale(locale);
  if (typeof code !== 'string' || resolved === undefined) return undefined;
  const data = getLocaleData(resolved);
  if (!data) return undefined;
  return data[code.toUpperCase()];
}

export function getAlpha2Code(name: string, locale?: string): string | undefined {
  const resolved = resolveLocale(locale);
  if (typeof name !== 'string' || resolved === undefined) return undefined;
  const data = getLocaleData(resolved);
  if (!data) return undefined;

  const lowerName = name.toLowerCase();
  for (const [code, countryName] of Object.entries(data)) {
    if (countryName.toLowerCase() === lowerName) {
      return code;
    }
  }
  return undefined;
}

export function getNames(locale?: string): Record<string, string> | undefined {
  const resolved = resolveLocale(locale);
  if (resolved === undefined) return undefined;
  const data = getLocaleData(resolved);
  if (!data) return undefined;
  return { ...data };
}
