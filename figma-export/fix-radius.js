/**
 * fix-radius.js
 * Add border-radius: 44px and overflow: hidden to .screen in all HTML files.
 * Usage: node fix-radius.js
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

  // Add border-radius: 44px to .screen rules that don't have it
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, openTag, styleContent, closeTag) => {
      let cleaned = styleContent;

      // Match .screen { ... } blocks and add border-radius if missing
      cleaned = cleaned.replace(
        /(\.screen\s*\{)([^}]*)(})/g,
        (m, open, content, close) => {
          if (!content.includes('border-radius')) {
            return open + content + '\n      border-radius: 44px;\n      overflow: hidden;\n    ' + close;
          }
          // If border-radius exists but isn't 44px, update it
          if (content.includes('border-radius') && !content.includes('border-radius: 44px')) {
            content = content.replace(/border-radius:\s*\d+px/, 'border-radius: 44px');
          }
          // Ensure overflow: hidden is present
          if (!content.includes('overflow: hidden') && !content.includes('overflow:hidden')) {
            return open + content + '\n      overflow: hidden;\n    ' + close;
          }
          return m;
        }
      );

      return openTag + cleaned + closeTag;
    }
  );

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ ${relPath}`);
    totalChanges++;
  }
}

console.log(`\nDone. Updated ${totalChanges} / ${allFiles.length} files.`);
