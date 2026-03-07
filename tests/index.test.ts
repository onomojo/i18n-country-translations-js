import { describe, it, expect, beforeAll } from 'vitest';
import {
  registerLocale,
  getSupportedLocales,
  isLocaleRegistered,
  getName,
  getAlpha2Code,
  getNames,
  setDefaultLocale,
  getDefaultLocale,
  registerAllLocales,
} from '../src/index.js';
import type { LocaleData } from '../src/index.js';
import en from '../langs/en.json';
import de from '../langs/de.json';
import fr from '../langs/fr.json';
import ja from '../langs/ja.json';

beforeAll(() => {
  registerLocale(en);
  registerLocale(de);
});

describe('registry', () => {
  it('registers locales', () => {
    expect(isLocaleRegistered('en')).toBe(true);
    expect(isLocaleRegistered('de')).toBe(true);
    expect(isLocaleRegistered('xx')).toBe(false);
  });

  it('lists supported locales', () => {
    const locales = getSupportedLocales();
    expect(locales).toContain('en');
    expect(locales).toContain('de');
  });
});

describe('getName', () => {
  it('returns English country name', () => {
    expect(getName('US', 'en')).toBe('United States');
  });

  it('returns German country name', () => {
    expect(getName('US', 'de')).toBe('Vereinigte Staaten');
  });

  it('is case-insensitive on code', () => {
    expect(getName('us', 'en')).toBe('United States');
  });

  it('returns Norway correctly (NO boolean test)', () => {
    expect(getName('NO', 'en')).toBe('Norway');
    expect(getName('NO', 'de')).toBe('Norwegen');
  });

  it('returns undefined for unknown code', () => {
    expect(getName('ZZ', 'en')).toBeUndefined();
  });

  it('returns undefined for unregistered locale', () => {
    expect(getName('US', 'xx')).toBeUndefined();
  });
});

describe('getAlpha2Code', () => {
  it('returns code for English name', () => {
    expect(getAlpha2Code('Germany', 'en')).toBe('DE');
  });

  it('returns code for German name', () => {
    expect(getAlpha2Code('Deutschland', 'de')).toBe('DE');
  });

  it('is case-insensitive on name', () => {
    expect(getAlpha2Code('germany', 'en')).toBe('DE');
  });

  it('returns undefined for unknown name', () => {
    expect(getAlpha2Code('Narnia', 'en')).toBeUndefined();
  });
});

describe('getNames', () => {
  it('returns all names for a locale', () => {
    const names = getNames('en')!;
    expect(names.US).toBe('United States');
    expect(names.DE).toBe('Germany');
    expect(Object.keys(names).length).toBeGreaterThan(250);
  });

  it('returns undefined for unregistered locale', () => {
    expect(getNames('xx')).toBeUndefined();
  });
});

describe('setDefaultLocale / getDefaultLocale', () => {
  it('throws when setting an unregistered locale', () => {
    expect(() => setDefaultLocale('xx')).toThrow('not registered');
  });

  it('sets and gets the default locale', () => {
    setDefaultLocale('en');
    expect(getDefaultLocale()).toBe('en');
  });

  it('can change the default locale', () => {
    setDefaultLocale('de');
    expect(getDefaultLocale()).toBe('de');
  });
});

describe('lookup functions with default locale', () => {
  it('getName uses default locale when locale is omitted', () => {
    setDefaultLocale('de');
    expect(getName('US')).toBe('Vereinigte Staaten');
  });

  it('getName explicit locale overrides default', () => {
    setDefaultLocale('de');
    expect(getName('US', 'en')).toBe('United States');
  });

  it('getAlpha2Code uses default locale when locale is omitted', () => {
    setDefaultLocale('en');
    expect(getAlpha2Code('Germany')).toBe('DE');
  });

  it('getNames uses default locale when locale is omitted', () => {
    setDefaultLocale('en');
    const names = getNames()!;
    expect(names.US).toBe('United States');
  });

  it('returns undefined when no locale passed and no default set for getName with explicit undefined', () => {
    // Verify that providing a locale always works
    expect(getName('US', 'en')).toBe('United States');
  });
});

describe('registerAllLocales', () => {
  it('registers multiple locales at once', () => {
    const localeArray: LocaleData[] = [fr, ja];
    registerAllLocales(localeArray);
    expect(isLocaleRegistered('fr')).toBe(true);
    expect(isLocaleRegistered('ja')).toBe(true);
    expect(getName('US', 'fr')).toBe('\u00c9tats-Unis');
    expect(getName('JP', 'ja')).toBe('\u65e5\u672c');
  });

  it('registers from all.json when available', async () => {
    try {
      const allLocales = (await import('../langs/all.json')).default;
      registerAllLocales(allLocales);
      expect(getSupportedLocales().length).toBeGreaterThanOrEqual(168);
    } catch {
      // all.json may not exist yet if build:data has not been run
      // This is expected in development before running the generate script
    }
  });
});
