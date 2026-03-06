import { describe, it, expect, beforeAll } from 'vitest';
import {
  registerLocale,
  getSupportedLocales,
  isLocaleRegistered,
  getName,
  getAlpha2Code,
  getNames,
} from '../src/index.js';
import en from '../langs/en.json';
import de from '../langs/de.json';

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
