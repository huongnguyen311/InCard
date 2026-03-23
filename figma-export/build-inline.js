/**
 * build-inline.js
 * Transforms gallery HTML files by:
 * 1. Replacing all <iframe> with inlined, CSS-scoped screen content
 * 2. Removing autoResize script, capture.js
 * 3. Scoping all CSS selectors under .s-{file}-{n} to prevent conflicts
 */

const fs = require('fs');
const path = require('path');

const GALLERY_FILES = [
  'auth.html',
  'home.html',
  'network.html',
  'notifications.html',
  'profile.html',
  'index.html',
];

const BASE = __dirname;

// ─── CSS Scoping (brace-depth tokenizer) ───────────────────────────────────────

function scopeCSS(cssText, sc) {
  // Tokenize the CSS into top-level blocks
  // A "block" is: selector(s) { declarations or nested blocks }
  // We scope the selector part, but not @keyframes internals

  const tokens = tokenizeCSS(cssText);
  return tokens.map(t => scopeToken(t, sc, false)).join('');
}

/**
 * Split CSS into an array of tokens:
 * - { type:'rule', selector, body }   – a rule block
 * - { type:'text', value }            – raw text between rules (comments, whitespace)
 */
function tokenizeCSS(css) {
  const tokens = [];
  let i = 0;
  const len = css.length;

  while (i < len) {
    // Skip whitespace and comments
    const wsStart = i;
    while (i < len) {
      // skip whitespace
      if (/\s/.test(css[i])) { i++; continue; }
      // skip comments
      if (css[i] === '/' && css[i+1] === '*') {
        const end = css.indexOf('*/', i + 2);
        i = end === -1 ? len : end + 2;
        continue;
      }
      break;
    }
    if (i > wsStart) {
      tokens.push({ type: 'text', value: css.substring(wsStart, i) });
    }
    if (i >= len) break;

    // Find the opening brace
    const bracePos = css.indexOf('{', i);
    if (bracePos === -1) {
      // No more rules, rest is text
      tokens.push({ type: 'text', value: css.substring(i) });
      break;
    }

    const selector = css.substring(i, bracePos).trim();

    // Find matching closing brace
    let depth = 1;
    let j = bracePos + 1;
    while (j < len && depth > 0) {
      if (css[j] === '{') depth++;
      if (css[j] === '}') depth--;
      j++;
    }

    const body = css.substring(bracePos + 1, j - 1);
    tokens.push({ type: 'rule', selector, body });
    i = j;
  }

  return tokens;
}

function scopeToken(token, sc, insideKeyframes) {
  if (token.type === 'text') return token.value;

  const { selector, body } = token;

  // @keyframes — don't scope internals
  if (/^@keyframes\s/i.test(selector)) {
    return `${selector} {${body}}`;
  }

  // @media, @supports — scope selectors inside
  if (/^@(media|supports)\s/i.test(selector)) {
    const innerTokens = tokenizeCSS(body);
    const scopedInner = innerTokens.map(t => scopeToken(t, sc, false)).join('');
    return `${selector} {${scopedInner}}`;
  }

  // @font-face, @import — pass through
  if (/^@(font-face|import)/i.test(selector)) {
    return `${selector} {${body}}`;
  }

  // Regular rule — scope the selector and fix declarations
  const scopedSelector = scopeSelectorList(selector, sc);
  let fixedBody = fixDeclarations(body);

  // When the original selector was html/body/:root, apply root-level fixes
  const trimSel = selector.replace(/\s/g, '');
  const isRootSelector = ['body', 'html', ':root', 'html,body', 'body,html', '*'].includes(trimSel);
  if (isRootSelector) {
    fixedBody = fixRootDeclarations(fixedBody);
  }

  return `${scopedSelector} {${fixedBody}}`;
}

/**
 * Fix CSS declarations that break when inlined:
 * - position: fixed → position: absolute (escapes .phone-frame)
 * - 100vw/100vh → 100% (references viewport, not container)
 * - Clamp extreme z-index values
 */
function fixDeclarations(body) {
  let result = body;
  // position: fixed → position: absolute
  result = result.replace(/position\s*:\s*fixed/g, 'position: absolute');
  // position: sticky → position: relative (no scroll container when inlined)
  result = result.replace(/position\s*:\s*sticky/g, 'position: relative');
  // 100vw → 100%, 100vh → 100%
  result = result.replace(/100vw/g, '100%');
  result = result.replace(/100vh/g, '100%');
  // min-height: 100% on body-equivalent → remove (handled by .screen-content)
  // Cap z-index > 9999 down to 999
  result = result.replace(/z-index\s*:\s*(\d+)/g, (match, val) => {
    const n = parseInt(val, 10);
    if (n > 999) return `z-index: ${Math.min(n, 999)}`;
    return match;
  });
  return result;
}

/**
 * Fix declarations that only break when they were on html/body/:root.
 * These are fine on normal elements but cause layout collapse on a scoped div.
 * - height: 100% → remove (no parent height to inherit)
 * - min-height: 100% (was 100vh) → min-height: 844px (screen height)
 * - overflow: hidden / overflow-x/y → remove (clips inlined content)
 * - margin: 0 / padding: 0 → keep (harmless resets)
 */
function fixRootDeclarations(body) {
  let result = body;
  // min-height: 100% → min-height: 844px (MUST run before height: 100% removal)
  result = result.replace(/min-height\s*:\s*100%/g, 'min-height: 844px');
  // Remove height: 100% but NOT min-height (use negative lookbehind)
  result = result.replace(/(?<![-\w])height\s*:\s*100%\s*;?/g, '');
  // Remove overflow declarations that clip content
  result = result.replace(/overflow\s*:\s*hidden\s*;?/g, '');
  result = result.replace(/overflow-x\s*:\s*hidden\s*;?/g, '');
  result = result.replace(/overflow-y\s*:\s*(hidden|auto)\s*;?/g, '');
  // Keep scrollbar-width: none (just hides scrollbar, doesn't clip)
  return result;
}

function scopeSelectorList(selectorList, sc) {
  return selectorList.split(',').map(s => {
    s = s.trim();
    if (!s) return s;

    // Already scoped
    if (s.includes(`.${sc}`)) return s;

    // :root → .sc
    if (s === ':root') return `.${sc}`;

    // body, html → .sc  (including pseudo-elements like body::-webkit-scrollbar)
    if (s === 'body' || s === 'html') return `.${sc}`;
    if (s === 'html, body' || s === 'body, html') return `.${sc}`;

    // body::pseudo / html::pseudo / body:pseudo → .sc::pseudo / .sc:pseudo
    if (/^(body|html)(::?[\w-]+)/.test(s)) {
      return s.replace(/^(body|html)/, `.${sc}`);
    }

    // Compound: "html body" or similar
    const replaced = s
      .replace(/^html\s+body\b/, `.${sc}`)
      .replace(/^body\s+/, `.${sc} `)
      .replace(/^html\s+/, `.${sc} `);
    if (replaced !== s) return replaced;

    // Bare * selector
    if (s === '*') return `.${sc} *`;

    // Bare element selectors, .class, #id, etc. — prefix
    return `.${sc} ${s}`;
  }).join(', ');
}

// ─── HTML Parsing ──────────────────────────────────────────────────────────────

function extractStyles(html) {
  const styles = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    styles.push(m[1]);
  }
  return styles.join('\n');
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return m ? m[1].trim() : '';
}

function fixImagePaths(bodyHtml, iframeSrc) {
  const screenDir = path.dirname(iframeSrc);
  return bodyHtml.replace(/(src|href)="(\.\.\/[^"]+)"/g, (match, attr, relPath) => {
    const resolved = path.posix.normalize(path.posix.join(screenDir, relPath));
    return `${attr}="${resolved}"`;
  });
}

// ─── Gallery Processing ────────────────────────────────────────────────────────

function processGalleryFile(filename) {
  const filepath = path.join(BASE, filename);
  let html = fs.readFileSync(filepath, 'utf-8');

  // Note: capture.js in <head> is kept for Figma MCP capture support

  // Remove autoResize script block
  html = html.replace(/<script>\s*function\s+autoResize[\s\S]*?<\/script>\s*/g, '');

  // Remove iframe CSS rule
  html = html.replace(/\.phone-frame\s+iframe\s*\{[^}]*\}\s*/g, '');

  // Change phone-frame overflow to allow content to grow vertically (replicate autoResize behavior)
  html = html.replace(
    /\.phone-frame\s*\{([^}]*?)overflow:\s*hidden/g,
    '.phone-frame {$1overflow-x: hidden; overflow-y: visible'
  );

  const isIndex = filename === 'index.html';
  const iframeRe = /<iframe\s+src="([^"]+)"[^>]*><\/iframe>/g;
  let screenIndex = 0;
  const allScopedStyles = [];

  html = html.replace(iframeRe, (match, src) => {
    screenIndex++;
    const scopeClass = `s-${path.basename(filename, '.html')}-${screenIndex}`;

    const screenPath = path.join(BASE, src);
    if (!fs.existsSync(screenPath)) {
      console.warn(`  WARN: Missing file: ${src}`);
      return `<div class="screen-content ${scopeClass}" style="width:390px;height:844px;background:#fff;display:flex;align-items:center;justify-content:center;color:#999;">Missing: ${src}</div>`;
    }

    const screenHtml = fs.readFileSync(screenPath, 'utf-8');

    // Extract and scope CSS
    const rawCSS = extractStyles(screenHtml);
    if (rawCSS.trim()) {
      const scopedCSS = scopeCSS(rawCSS, scopeClass);
      allScopedStyles.push(`\n/* ── ${src} ── */\n${scopedCSS}`);
    }

    // Extract body and fix paths
    let body = extractBody(screenHtml);
    body = fixImagePaths(body, src);

    if (isIndex) {
      return `<div class="screen-content ${scopeClass}" style="width:390px;height:844px;transform:scale(0.174);transform-origin:top left;pointer-events:none;overflow:hidden;">${body}</div>`;
    }

    return `<div class="screen-content ${scopeClass}">${body}</div>`;
  });

  // Add base styles + all scoped styles
  const baseCss = isIndex
    ? ''
    : `\n    .screen-content { width: 390px; min-height: 844px; display: block; font-family: 'Public Sans', sans-serif; background: #fff; position: relative; }\n`;

  const scopedStyleBlock = `<style>${baseCss}${allScopedStyles.join('\n')}\n  </style>`;
  html = html.replace('</head>', `  ${scopedStyleBlock}\n</head>`);

  // Cleanup any remaining onload
  html = html.replace(/\s*onload="autoResize\(this\)"/g, '');

  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`  ✓ ${filename} — ${screenIndex} screens inlined`);
}

// ─── Main ──────────────────────────────────────────────────────────────────────

console.log('Inlining iframes with scoped CSS...\n');

for (const file of GALLERY_FILES) {
  const filepath = path.join(BASE, file);
  if (!fs.existsSync(filepath)) {
    console.log(`  SKIP: ${file} not found`);
    continue;
  }
  processGalleryFile(file);
}

console.log('\nDone!');
