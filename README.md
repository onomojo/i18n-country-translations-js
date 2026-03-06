# i18n-country-translations

Country name translations for 168 locales with 257 territory codes. CLDR-sourced, tree-shakeable.

## Install

```bash
npm install i18n-country-translations
```

## Usage

### Browser (register only the locales you need)

```typescript
import { registerLocale, getName, getAlpha2Code, getNames } from 'i18n-country-translations';
import de from 'i18n-country-translations/langs/de.json';

registerLocale(de);

getName('US', 'de');              // "Vereinigte Staaten"
getAlpha2Code('Deutschland', 'de'); // "DE"
getNames('de');                   // { US: "Vereinigte Staaten", DE: "Deutschland", ... }
```

### Node.js (register all locales)

```typescript
import { registerLocale } from 'i18n-country-translations';
import fs from 'fs';
import path from 'path';

const langsDir = path.join(require.resolve('i18n-country-translations'), '..', '..', 'langs');
for (const file of fs.readdirSync(langsDir).filter(f => f.endsWith('.json'))) {
  registerLocale(JSON.parse(fs.readFileSync(path.join(langsDir, file), 'utf8')));
}
```

## API

### `registerLocale(data: LocaleData): void`
Register a locale's country translations. Required before using lookup functions.

### `getName(code: string, locale: string): string | undefined`
Get the localized country name for an ISO 3166-1 alpha-2 code. Case-insensitive on the code.

### `getAlpha2Code(name: string, locale: string): string | undefined`
Reverse lookup: get the alpha-2 code for a localized country name. Case-insensitive on the name.

### `getNames(locale: string): Record<string, string> | undefined`
Get all country name translations for a locale as a `{ code: name }` object.

### `getSupportedLocales(): string[]`
List all registered locale codes.

### `isLocaleRegistered(locale: string): boolean`
Check if a locale has been registered.

## Supported Locales (168)

af, ak, am, ar, as, az, be, bg, bm, bn, bo, br, bs, ca, cs, cy, da, de, dz, ee, el, en, eo, es, et, eu, fa, ff, fi, fo, fr, ga, gd, gl, gu, ha, he, hi, hr, hu, hy, ia, id, ig, is, it, ja, ka, ki, kk, kl, km, kn, ko, ky, lg, ln, lo, lt, lu, lv, mg, mk, ml, mn, mr, ms, mt, my, nb, nd, ne, nl, nn, or, pa, pl, ps, pt, pt-BR, rm, rn, ro, ru, se, sg, si, sk, sl, sn, so, sq, sr, sv, sw, ta, te, th, ti, to, tr, uk, ur, uz, vi, yo, zh, zh-CN, zh-HK, zh-TW, zu, asa, bas, bez, brx, byn, cgg, chr, dav, dje, dyo, ebu, ewo, fil, fur, gsw, guz, haw, jmc, kab, kam, kde, kea, khq, kln, ksb, ksf, ksh, lag, luo, luy, mas, mer, mfe, mgh, mua, naq, nmg, nus, nyn, rof, rwk, saq, sbp, seh, ses, shi, swc, teo, tig, twq, tzm, vai, vun, wae, wal, xog, yav

## Comparison with i18n-iso-countries

| Feature | i18n-country-translations | i18n-iso-countries |
|---------|--------------------------|-------------------|
| Locales | 168 | 78 |
| Territory codes | 257 | 249 |
| Data source | CLDR | Wikipedia/manual |
| ESM support | Yes | No |
| Tree-shakeable | Yes | No |
| TypeScript | Native | Native |

## License

MIT
