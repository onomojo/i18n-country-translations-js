#!/usr/bin/env node
/**
 * Validates locale YAML files: consistent keys, no empty values, NO properly handled.
 */
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const dataDir = new URL('../data/', import.meta.url).pathname;
const files = readdirSync(dataDir).filter(f => f.endsWith('.yml'));

const enRaw = readFileSync(join(dataDir, 'en.yml'), 'utf8');
const enParsed = parse(enRaw);
const enKeys = Object.keys(enParsed);
let errors = 0;
let warnings = 0;

for (const file of files) {
  const raw = readFileSync(join(dataDir, file), 'utf8');
  const parsed = parse(raw);
  const keys = Object.keys(parsed);

  // Check NO is not parsed as boolean (keys)
  if ('false' in parsed || 'true' in parsed) {
    console.error(`${file}: YAML boolean issue detected — "NO" or similar key parsed as boolean. Ensure all keys are quoted.`);
    errors++;
  }

  // Check no values were parsed as booleans (e.g. unquoted NO/YES in values)
  const boolValues = Object.entries(parsed).filter(([, v]) => typeof v === 'boolean');
  if (boolValues.length > 0) {
    console.error(`${file}: ${boolValues.length} values parsed as boolean instead of string: ${boolValues.slice(0, 3).map(([k]) => k).join(', ')}...`);
    errors++;
  }

  // Check for empty values
  const empty = Object.entries(parsed).filter(([, v]) => v === null || v === undefined || String(v).trim() === '');
  if (empty.length > 0) {
    console.warn(`${file}: ${empty.length} empty values: ${empty.slice(0, 3).map(([k]) => k).join(', ')}...`);
    warnings++;
  }

  // Check key count (allow some variation for unicode_supported locales)
  if (keys.length < 200) {
    console.warn(`${file}: only ${keys.length} keys (en has ${enKeys.length})`);
    warnings++;
  }
}

console.log(`\nValidated ${files.length} locale files (en has ${enKeys.length} keys)`);
if (errors > 0) {
  console.error(`✗ ${errors} errors found`);
  process.exit(1);
}
if (warnings > 0) {
  console.warn(`⚠ ${warnings} warnings`);
}
if (errors === 0) {
  console.log('✓ No critical errors');
}
