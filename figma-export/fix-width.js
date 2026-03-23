/**
 * fix-width.js
 * Constrain html and body to 390px width so Figma captures only the screen frame.
 *
 * Usage: node fix-width.js
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
  const changes = [];

  // Strategy: Add width:390px and overflow:hidden to html and body
  // This ensures Figma captures exactly 390px wide frame

  // Fix html tag styles
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/,
    (match, openTag, styleContent, closeTag) => {
      let cleaned = styleContent;

      // If there's an "html {" or "html," rule, add width:390px if missing
      if (cleaned.match(/\bhtml\s*\{/) && !cleaned.match(/\bhtml\s*\{[^}]*width\s*:/)) {
        cleaned = cleaned.replace(
          /(\bhtml\s*\{)/,
          (m) => {
            changes.push('html width:390px');
            return m + ' width: 390px;';
          }
        );
      }

      // If there's "html { overflow-x: hidden; overflow-y: auto; }" add width
      if (cleaned.match(/\bhtml\s*\{[^}]*overflow/) && !cleaned.match(/\bhtml\s*\{[^}]*width/)) {
        cleaned = cleaned.replace(
          /(\bhtml\s*\{)([^}]*)(})/,
          (m, open, content, close) => {
            changes.push('html width:390px');
            return open + content + ' width: 390px;' + close;
          }
        );
      }

      // If there's a "body {" rule, add width:390px if missing
      // Find the first body { rule
      if (cleaned.match(/\bbody\s*\{/) && !cleaned.match(/\bbody\s*\{[^}]*width\s*:\s*390px/)) {
        // Only add to the first body { block
        let replaced = false;
        cleaned = cleaned.replace(
          /(\bbody\s*\{)([^}]*)(})/,
          (m, open, content, close) => {
            if (!replaced && !content.includes('width:') && !content.includes('width :')) {
              replaced = true;
              changes.push('body width:390px');
              return open + content + '\n      width: 390px;\n    ' + close;
            }
            return m;
          }
        );
      }

      // If no html rule exists, add one after the first line of style content
      if (!cleaned.match(/\bhtml\s*[,{]/)) {
        cleaned = cleaned.replace(
          /(\*\s*\{[^}]*\})/,
          (m) => {
            changes.push('add html{width:390px}');
            return m + '\n    html { width: 390px; overflow: hidden; }';
          }
        );
      }

      // If no body rule exists at all (rare), we skip — all files should have body styles

      return openTag + cleaned + closeTag;
    }
  );

  // For the splash screen which uses body as the screen container
  // (no .screen div), body already has width:390px — just ensure html does too

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ ${relPath}: ${changes.join(', ')}`);
    totalChanges++;
  } else {
    // Check if html already has width
    if (!html.match(/\bhtml\s*\{[^}]*width/)) {
      // Need to add it manually
      html = html.replace(
        /(<style[^>]*>)([\s\S]*?)(<\/style>)/,
        (match, openTag, styleContent, closeTag) => {
          changes.push('add html width:390px');
          return openTag + '\n    html { width: 390px; overflow: hidden; }\n' + styleContent + closeTag;
        }
      );
      if (html !== original) {
        fs.writeFileSync(filePath, html, 'utf-8');
        console.log(`  ✓ ${relPath}: ${changes.join(', ')}`);
        totalChanges++;
      }
    }
  }
}

console.log(`\nDone. Updated ${totalChanges} / ${allFiles.length} files.`);
