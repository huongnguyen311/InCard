/**
 * fix-viewport.js
 * Set viewport width to exactly 390 so Figma captures a 390px-wide frame.
 *
 * Changes: <meta name="viewport" content="width=device-width, ...">
 *      to: <meta name="viewport" content="width=390, ...">
 *
 * Usage: node fix-viewport.js
 */

const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const rootDir = __dirname;

function findHtmlFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = [
  ...findHtmlFiles(screensDir),
  ...fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(rootDir, f))
];

console.log(`Found ${allFiles.length} HTML files to process.\n`);

let totalChanges = 0;

for (const filePath of allFiles) {
  let html = fs.readFileSync(filePath, 'utf-8');
  const original = html;
  const relPath = path.relative(rootDir, filePath);

  // Replace width=device-width with width=390
  html = html.replace(
    /(<meta\s+name="viewport"\s+content="[^"]*?)width=device-width/g,
    '$1width=390'
  );

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ ${relPath}`);
    totalChanges++;
  }
}

console.log(`\nDone. Updated ${totalChanges} / ${allFiles.length} files.`);
