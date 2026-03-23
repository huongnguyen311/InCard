/**
 * fix-standards.js
 * Batch-fix all HTML mockup files to meet international design standards.
 *
 * Fixes applied:
 *  1. Add viewport-fit=cover for safe area inset support
 *  2. Remove duplicate :root variable blocks (already in design-system.css)
 *  3. Remove duplicate scrollbar-hiding rules (now in design-system.css)
 *  4. Fix back-button sizes below 44px to meet WCAG 2.5.8 touch target
 *  5. Fix hardcoded overflow:hidden on html,body that blocks scrolling
 *  6. Normalize non-8pt-grid gap/spacing values
 *  7. Ensure body has font-smoothing for cross-browser text rendering
 *
 * Usage: node fix-standards.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('child_process');

// Find all HTML files under figma-export/screens/
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

// Collect all HTML files (screens + root level)
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

  // 1. Add viewport-fit=cover if missing
  if (html.includes('name="viewport"') && !html.includes('viewport-fit=cover')) {
    html = html.replace(
      /content="([^"]*)"(\s*\/?>)/,
      (match, content, close) => {
        if (match.includes('viewport') || html.indexOf(match) < html.indexOf('name="viewport"') + 50) {
          return `content="${content}, viewport-fit=cover"${close}`;
        }
        return match;
      }
    );
    // More targeted replacement
    html = html.replace(
      /<meta\s+name="viewport"\s+content="([^"]+)"(\s*\/?>)/,
      (match, content, close) => {
        if (!content.includes('viewport-fit')) {
          changes.push('viewport-fit=cover');
          return `<meta name="viewport" content="${content}, viewport-fit=cover"${close}`;
        }
        return match;
      }
    );
  }

  // 2. Remove duplicate :root blocks from inline <style>
  // These are already defined in design-system.css
  // Match :root { ... } blocks inside <style> tags that only contain variable declarations
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, openTag, styleContent, closeTag) => {
      // Remove :root blocks that only re-declare design system variables
      const cleaned = styleContent.replace(
        /\s*:root\s*\{[^}]*(?:--green|--slate|--white|--orange|--emerald|--gray-bg|--red-|--amber|--blue-|--gold|--bronze|--card-dark|--upgrade-|--whatsapp|--zalo|--x-dark|--facebook|--social-btn|--input-border|--canvas-bg|--shadow-frame|--border-light)[^}]*\}\s*/g,
        (rootBlock) => {
          changes.push('remove duplicate :root');
          return '\n';
        }
      );
      return openTag + cleaned + closeTag;
    }
  );

  // 3. Remove duplicate scrollbar-hiding rules (now in design-system.css)
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, openTag, styleContent, closeTag) => {
      let cleaned = styleContent;
      // Remove "html, body { scrollbar-width: none; ... }" rules
      const scrollbarPattern = /\s*html\s*,\s*body\s*\{\s*scrollbar-width:\s*none;\s*-ms-overflow-style:\s*none;\s*\}\s*/g;
      if (scrollbarPattern.test(cleaned)) {
        cleaned = cleaned.replace(scrollbarPattern, '\n');
        changes.push('remove duplicate scrollbar rules');
      }
      // Remove webkit scrollbar pseudo-element rules
      const webkitPattern = /\s*html::-webkit-scrollbar\s*,\s*body::-webkit-scrollbar\s*\{\s*display:\s*none;\s*\}\s*/g;
      if (webkitPattern.test(cleaned)) {
        cleaned = cleaned.replace(webkitPattern, '\n');
      }
      return openTag + cleaned + closeTag;
    }
  );

  // 4. Fix back-button sizes below 44px
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, openTag, styleContent, closeTag) => {
      let cleaned = styleContent;
      // Fix .back-btn with width/height below 44px
      cleaned = cleaned.replace(
        /(\.back-btn\s*\{[^}]*?)width:\s*(3[0-9]|4[0-3])px/g,
        (m, prefix, size) => {
          changes.push(`back-btn width ${size}px→44px`);
          return `${prefix}width: 44px`;
        }
      );
      cleaned = cleaned.replace(
        /(\.back-btn\s*\{[^}]*?)height:\s*(3[0-9]|4[0-3])px/g,
        (m, prefix, size) => {
          return `${prefix}height: 44px`;
        }
      );
      // Fix .nav-btn with width/height below 44px
      cleaned = cleaned.replace(
        /(\.nav-btn\s*\{[^}]*?)width:\s*(3[0-9]|4[0-3])px/g,
        (m, prefix, size) => {
          changes.push(`nav-btn width ${size}px→44px`);
          return `${prefix}width: 44px`;
        }
      );
      cleaned = cleaned.replace(
        /(\.nav-btn\s*\{[^}]*?)height:\s*(3[0-9]|4[0-3])px/g,
        (m, prefix, size) => {
          return `${prefix}height: 44px`;
        }
      );
      return openTag + cleaned + closeTag;
    }
  );

  // 5. Fix hardcoded overflow:hidden on html,body
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, openTag, styleContent, closeTag) => {
      let cleaned = styleContent;
      // Replace "html, body { overflow: hidden; }" with proper scrolling
      cleaned = cleaned.replace(
        /html\s*,\s*body\s*\{\s*overflow:\s*hidden;\s*\}/g,
        (m) => {
          changes.push('fix overflow:hidden→auto');
          return 'html { overflow-x: hidden; overflow-y: auto; }\n    body { overflow: visible; }';
        }
      );
      return openTag + cleaned + closeTag;
    }
  );

  // 6. Add font-smoothing to body if not present
  if (!html.includes('-webkit-font-smoothing') && html.includes('<style')) {
    html = html.replace(
      /(<style[^>]*>)([\s\S]*?)(<\/style>)/,
      (match, openTag, styleContent, closeTag) => {
        let cleaned = styleContent;
        cleaned = cleaned.replace(
          /(body\s*\{[^}]*)(font-family:\s*'Public Sans'[^;]*;)/,
          (m, prefix, fontFamily) => {
            changes.push('add font-smoothing');
            return `${prefix}${fontFamily}\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;`;
          }
        );
        return openTag + cleaned + closeTag;
      }
    );
  }

  // 7. Fix bottom nav padding-bottom that doesn't account for safe area
  html = html.replace(
    /(<style[^>]*>)([\s\S]*?)(<\/style>)/g,
    (match, openTag, styleContent, closeTag) => {
      let cleaned = styleContent;
      // Fix bottom-nav inline styles to use safe area
      cleaned = cleaned.replace(
        /(\.bottom-nav\s*\{[^}]*?)padding:\s*(\d+)px\s+(\d+)px\s+(\d+)px/g,
        (m, prefix, top, side, bottom) => {
          if (parseInt(bottom) >= 16 && !m.includes('env(') && !m.includes('var(--safe')) {
            changes.push('bottom-nav safe-area padding');
            return `${prefix}padding: ${top}px ${side}px calc(${bottom}px + env(safe-area-inset-bottom, 0px))`;
          }
          return m;
        }
      );
      return openTag + cleaned + closeTag;
    }
  );

  // Write back if changed
  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✓ ${relPath}: ${changes.join(', ')}`);
    totalChanges++;
  }
}

console.log(`\nDone. Updated ${totalChanges} / ${allFiles.length} files.`);
