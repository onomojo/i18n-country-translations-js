# i18n-country-translations

> Localized country names for JavaScript and TypeScript -- 168 locales, 257 territory codes, zero dependencies.

Building a country picker? Displaying addresses internationally? Your users expect to see country names in their own language -- not just in English. Most i18n packages cover 30-50 locales and call it a day, leaving hundreds of millions of speakers without support.

**i18n-country-translations** provides country name translations sourced from [CLDR](https://cldr.unicode.org/), the same data that powers ICU, Chrome, and Android. With **168 locales** -- more than double the coverage of alternatives -- you can serve users from Amharic to Zulu without gaps.

## Why i18n-country-translations?

- **168 locales** -- the most comprehensive coverage available on NPM
- **257 territory codes** -- full ISO 3166-1 alpha-2 plus EU, XK, and other commonly used codes
- **CLDR-sourced** -- accurate, professionally reviewed translations (not scraped from Wikipedia)
- **Zero dependencies** -- just translation data and lookup functions
- **Tree-shakeable** -- bundle only the locales you need (~4-8 KB each, gzipped)
- **Dual ESM + CJS** -- works everywhere: Vite, Webpack, Next.js, Node.js
- **Full TypeScript** -- native type declarations, not bolted on

## How it compares

| Feature | i18n-country-translations | i18n-iso-countries |
|---------|:------------------------:|:-----------------:|
| Locales | **168** | 78 |
| Territory codes | **257** | 249 |
| Data source | **CLDR** | Wikipedia / manual |
| ESM support | **Yes** | No |
| Tree-shakeable | **Yes** | No |
| TypeScript | Native | Native |
| Maintained | **Active** | 17 open PRs, some 7+ years old |

Missing locales in `i18n-iso-countries` include Punjabi (113M speakers), Telugu (82M), Tamil (78M), Gujarati (56M), Yoruba (45M), and 85+ others.

## Install

```bash
npm install i18n-country-translations
```

## Quick Start

The fastest way to get going -- register all 168 locales at once and set a default:

```typescript
import { registerAllLocales, setDefaultLocale, getName } from 'i18n-country-translations';
import allLocales from 'i18n-country-translations/langs/all.json';

registerAllLocales(allLocales);
setDefaultLocale('de');

getName('US');  // => "Vereinigte Staaten"
getName('JP');  // => "Japan"
getName('US', 'en');  // => "United States" (explicit locale overrides default)
```

## Usage

### Register only what you need (recommended for browsers)

Each locale is a separate JSON file. Import only the ones your app requires -- bundlers will tree-shake the rest.

```typescript
import { registerLocale, setDefaultLocale, getName, getAlpha2Code } from 'i18n-country-translations';
import de from 'i18n-country-translations/langs/de.json';
import ja from 'i18n-country-translations/langs/ja.json';

registerLocale(de);
registerLocale(ja);
setDefaultLocale('de');

getName('US');                     // => "Vereinigte Staaten"
getName('JP', 'ja');               // => "日本"
getAlpha2Code('Deutschland', 'de'); // => "DE"
```

### Register all locales at once

For server-side apps or when bundle size is not a concern, register everything in one call:

```typescript
import { registerAllLocales, setDefaultLocale, getName } from 'i18n-country-translations';
import allLocales from 'i18n-country-translations/langs/all.json';

registerAllLocales(allLocales);
setDefaultLocale('en');

getName('DE');  // => "Germany"
```

### Building a country picker

A complete, copy-paste-ready country dropdown sorted by localized name:

```typescript
import { registerLocale, getNames } from 'i18n-country-translations';
import fr from 'i18n-country-translations/langs/fr.json';

registerLocale(fr);

const countries = getNames('fr')!;

// Build sorted options for a <select> element
const options = Object.entries(countries)
  .sort(([, a], [, b]) => a.localeCompare(b, 'fr'))
  .map(([code, name]) => `<option value="${code}">${name}</option>`)
  .join('\n');

// Use in your HTML
const select = `<select name="country">\n${options}\n</select>`;

// React example
function CountryPicker() {
  const entries = Object.entries(countries)
    .sort(([, a], [, b]) => a.localeCompare(b, 'fr'));

  return (
    <select name="country">
      {entries.map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
    </select>
  );
}
```

### Reverse lookup -- name to code

```typescript
import { getAlpha2Code } from 'i18n-country-translations';

getAlpha2Code('Germany', 'en');      // => "DE"
getAlpha2Code('Allemagne', 'fr');    // => "DE"
```

## API Reference

| Function | Description |
|----------|-------------|
| `registerLocale(data)` | Register a locale's country translations. Required before lookups. |
| `registerAllLocales(allData)` | Register an array of locale data objects at once. |
| `setDefaultLocale(locale)` | Set the default locale for lookups. Throws if the locale is not registered. |
| `getDefaultLocale()` | Get the current default locale, or `undefined` if none is set. |
| `getName(code, locale?)` | Get the localized country name for an alpha-2 code. Uses default locale if omitted. Case-insensitive. |
| `getAlpha2Code(name, locale?)` | Reverse lookup: localized name to alpha-2 code. Uses default locale if omitted. Case-insensitive. |
| `getNames(locale?)` | All translations as a `{ code: name }` object. Uses default locale if omitted. |
| `getSupportedLocales()` | List all registered locale codes. |
| `isLocaleRegistered(locale)` | Check if a locale has been registered. |

All lookup functions return `undefined` when a code, locale, or default is not found -- no exceptions thrown.

## Supported Locales

168 locales covering major and regional languages worldwide:

<details>
<summary>View all 168 locales</summary>

af, ak, am, ar, as, az, be, bg, bm, bn, bo, br, bs, ca, cs, cy, da, de, dz, ee, el, en, eo, es, et, eu, fa, ff, fi, fo, fr, ga, gd, gl, gu, ha, he, hi, hr, hu, hy, ia, id, ig, is, it, ja, ka, ki, kk, kl, km, kn, ko, ky, lg, ln, lo, lt, lu, lv, mg, mk, ml, mn, mr, ms, mt, my, nb, nd, ne, nl, nn, or, pa, pl, ps, pt, pt-BR, rm, rn, ro, ru, se, sg, si, sk, sl, sn, so, sq, sr, sv, sw, ta, te, th, ti, to, tr, uk, ur, uz, vi, yo, zh, zh-CN, zh-HK, zh-TW, zu, asa, bas, bez, brx, byn, cgg, chr, dav, dje, dyo, ebu, ewo, fil, fur, gsw, guz, haw, jmc, kab, kam, kde, kea, khq, kln, ksb, ksf, ksh, lag, luo, luy, mas, mer, mfe, mgh, mua, naq, nmg, nus, nyn, rof, rwk, saq, sbp, seh, ses, shi, swc, teo, tig, twq, tzm, vai, vun, wae, wal, xog, yav

</details>

## Data Source

All translations come from the [Unicode CLDR](https://cldr.unicode.org/) (Common Locale Data Repository) -- the industry-standard source used by every major platform including iOS, Android, Chrome, and Java. This ensures translations are accurate, consistent, and maintained by native speakers through Unicode's established review process.

## Related

- **[i18n-timezones](https://github.com/onomojo/i18n-timezones-js)** -- Localized timezone names for 36 locales
- **[i18n-country-translations-data](https://github.com/onomojo/i18n-country-translations-data)** -- Raw YAML translation data (for non-JS consumers)

## License

MIT
