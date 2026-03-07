#!/usr/bin/env node
/**
 * Converts YAML data files from the i18n-country-translations-data package to JSON.
 * Reads from i18n-country-translations-data/data/*.yml, writes to langs/*.json
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, basename } from 'path';
import { parse } from 'yaml';
import { createRequire } from 'module';

const require_ = createRequire(import.meta.url);
const dataDir = join(require_.resolve('i18n-country-translations-data/package.json'), '..', 'data');
const outDir = new URL('../langs/', import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const files = readdirSync(dataDir).filter(f => f.endsWith('.yml'));

for (const file of files) {
  const raw = readFileSync(join(dataDir, file), 'utf8');
  const parsed = parse(raw);
  const locale = basename(file, '.yml');

  // Ensure all keys and values are strings (guard against YAML boolean coercion)
  const countries = {};
  for (const [key, val] of Object.entries(parsed)) {
    if (val === null || val === undefined) {
      console.warn(`  ⚠ ${file}: skipping key "${key}" with ${val} value`);
      continue;
    }
    countries[String(key)] = String(val);
  }
  const jsonData = { locale, countries };
  writeFileSync(
    join(outDir, `${locale}.json`),
    JSON.stringify(jsonData, null, 2) + '\n',
    'utf8'
  );
  console.log(`✓ ${locale}.json (${Object.keys(countries).length} entries)`);
}

console.log(`\nDone: ${files.length} JSON files written to ${outDir}`);
