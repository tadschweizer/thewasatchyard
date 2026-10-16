import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

// Dependency-free checks for the security boundary of this static site.
const pages = (await readdir('.')).filter(name => name.endsWith('.html'));
assert.equal(pages.length, 6, 'Review security coverage when adding a page');
for (const name of pages) {
  const html = await readFile(name, 'utf8');
  const policy = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/)?.[1];
  assert.ok(policy, `${name}: missing CSP`);
  assert.ok(html.indexOf('Content-Security-Policy') < html.indexOf('<script'), `${name}: CSP must precede scripts`);
  for (const rule of ["default-src 'none'", "object-src 'none'", "base-uri 'none'", "connect-src 'none'", 'form-action https://formspree.io']) {
    assert.ok(policy.split(';').map(s => s.trim()).includes(rule), `${name}: missing ${rule}`);
  }
  const scriptRule = policy.split(';').find(s => s.trim().startsWith('script-src ')).trim();
  assert.equal(scriptRule, name === 'race-info.html' ? "script-src 'self' https://strava-embeds.com/embed.js" : "script-src 'self'", `${name}: unexpected script permission`);
  assert.ok(!/\son[a-z]+\s*=/i.test(html), `${name}: inline event handler`);
  assert.ok(!/\sstyle\s*=/i.test(html), `${name}: inline style`);
  assert.ok(html.includes('name="referrer" content="strict-origin-when-cross-origin"'), `${name}: missing referrer policy`);
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (match[1].includes('application/ld+json')) { JSON.parse(match[2]); continue; }
    assert.ok(/src="\/?assets\/site\.js"/.test(match[1]) || (name === 'race-info.html' && match[1].includes('src="https://strava-embeds.com/embed.js"')), `${name}: unexpected executable script`);
  }
  for (const form of html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)) {
    assert.ok(form[0].includes('action="https://formspree.io/f/xldobnzq"'), `${name}: unexpected form destination`);
    assert.ok(form[0].includes('method="POST"') && form[0].includes('name="_gotcha"'), `${name}: form must POST and retain spam trap`);
  }
  for (const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.match(link[0], /rel="[^"]*\bnoopener\b/, `${name}: unsafe new-tab link`);
  }
  assert.ok(html.includes('https://ultrasignup.com/register.aspx?did=138776'), `${name}: current registration link missing`);
  console.log(`PASS ${name}`);
}
