#!/usr/bin/env node
/**
 * build.js — Local minification pipeline for FG2GLandingpage
 * Minifies styles.css and scripts.js → dist/ for local review only.
 * Vercel deploys the unminified source files directly.
 *
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// Ensure dist/ exists
if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true });
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

function minifyCSS(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')   // remove block comments
    .replace(/\s{2,}/g, ' ')             // collapse whitespace
    .replace(/\s*([{};:,>+~])\s*/g, '$1') // remove spaces around selectors/rules
    .replace(/;\}/g, '}')                // remove trailing semicolons
    .trim();
}

function minifyJS(src) {
  return src
    .replace(/\/\/[^\n]*/g, '')          // remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')    // remove block comments
    .replace(/\s{2,}/g, ' ')             // collapse whitespace
    .replace(/\n\s*/g, '\n')             // remove leading whitespace on lines
    .trim();
}

const files = [
  { src: 'styles.css', out: 'styles.min.css', minify: minifyCSS },
  { src: 'scripts.js', out: 'scripts.min.js', minify: minifyJS },
];

let allOk = true;
for (const { src, out, minify } of files) {
  const srcPath = path.join(ROOT, src);
  const outPath = path.join(DIST, out);
  if (!fs.existsSync(srcPath)) {
    console.error(`MISSING: ${src}`);
    allOk = false;
    continue;
  }
  const input = fs.readFileSync(srcPath, 'utf8');
  const output = minify(input);
  fs.writeFileSync(outPath, output, 'utf8');
  const saved = ((1 - output.length / input.length) * 100).toFixed(1);
  console.log(`${src} → dist/${out}  ${formatBytes(input.length)} → ${formatBytes(output.length)}  (-${saved}%)`);
}

if (allOk) {
  console.log('\nBuild complete. dist/ is for local review only — Vercel serves unminified source.');
} else {
  process.exit(1);
}
