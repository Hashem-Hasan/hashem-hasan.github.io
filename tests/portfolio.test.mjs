import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test('all original exercise links resolve and remain available', () => {
  for (const name of ['project 1', 'project 2', 'project 3', 'project 4'])
    assert.ok(fs.existsSync(new URL(`../${name}/index.html`, import.meta.url)));
});
test('every local asset referenced by the portfolio exists', () => {
  for (const [, value] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (/^(https?:|mailto:)/.test(value)) continue;
    assert.ok(
      fs.existsSync(path.join(import.meta.dirname, '..', decodeURIComponent(value))),
      `Missing ${value}`
    );
  }
});
test('all twelve showcased projects have explicit categories and accessible filters', () => {
  assert.equal((html.match(/data-category=/g) || []).length, 12);
  assert.equal((html.match(/data-filter=/g) || []).length, 3);
  assert.ok(html.includes('role="status"'));
  assert.ok(html.includes('href="#main"'));
});
