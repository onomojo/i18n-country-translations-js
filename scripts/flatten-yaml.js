#!/usr/bin/env node
/**
 * Reads the Ruby gem's YAML locale files and produces flattened YAML in data/
 * Usage: node scripts/flatten-yaml.js <path-to-ruby-gem-locales-dir1> [dir2] ...
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const sourceDirs = process.argv.slice(2);
if (sourceDirs.length === 0) {
  console.error('Usage: node scripts/flatten-yaml.js <source-dir1> [source-dir2] ...');
  console.error('Example: node scripts/flatten-yaml.js ../i18n-country-translations/rails/locale/iso_639-1');
  process.exit(1);
}

const outDir = new URL('../data/', import.meta.url).pathname;
let total = 0;

for (const sourceDir of sourceDirs) {
  const files = readdirSync(sourceDir).filter(f => f.endsWith('.yml'));

  for (const file of files) {
    const raw = readFileSync(join(sourceDir, file), 'utf8');
    const parsed = parse(raw);
    const locale = Object.keys(parsed)[0];
    const countries = parsed[locale]?.countries;

    if (!countries) {
      console.warn(`Skipping ${file}: no countries key found`);
      continue;
    }

    // Write flat YAML — quote ALL keys to avoid boolean issues (NO, AN, etc.)
    const lines = Object.entries(countries).map(([key, val]) => {
      const escapedVal = String(val).replace(/"/g, '\\"');
      return `"${key}": "${escapedVal}"`;
    });

    writeFileSync(join(outDir, file), lines.join('\n') + '\n', 'utf8');
    console.log(`✓ ${file} (${Object.keys(countries).length} countries)`);
    total++;
  }
}

console.log(`\nDone: ${total} locale files flattened to ${outDir}`);
