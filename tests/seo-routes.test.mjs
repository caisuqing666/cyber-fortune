import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const robotsPath = path.join(root, 'app', 'robots.ts');
const sitemapPath = path.join(root, 'app', 'sitemap.ts');

assert.equal(
  fs.existsSync(robotsPath),
  true,
  'Expected cyber-fortune to provide app/robots.ts',
);

assert.equal(
  fs.existsSync(sitemapPath),
  true,
  'Expected cyber-fortune to provide app/sitemap.ts',
);

const robotsSource = fs.readFileSync(robotsPath, 'utf8');
const sitemapSource = fs.readFileSync(sitemapPath, 'utf8');

assert.match(
  robotsSource,
  /wenbu\.cc/,
  'Expected robots.ts to point to wenbu.cc',
);

assert.match(
  sitemapSource,
  /wenbu\.cc/,
  'Expected sitemap.ts to point to wenbu.cc',
);

console.log('cyber-fortune seo routes ok');
