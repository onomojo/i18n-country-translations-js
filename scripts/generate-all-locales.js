import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const langsDir = join(__dirname, '..', 'langs');

const allLocales = readdirSync(langsDir)
  .filter(f => f.endsWith('.json') && f !== 'all.json')
  .sort()
  .map(f => JSON.parse(readFileSync(join(langsDir, f), 'utf8')));

writeFileSync(join(langsDir, 'all.json'), JSON.stringify(allLocales));
console.log(`Generated all.json with ${allLocales.length} locales`);
