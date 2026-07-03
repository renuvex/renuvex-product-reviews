#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = new Set(process.argv.slice(2));
const jsonOutput = args.has("--json");
const strict = args.has("--strict");
const noFail = args.has("--no-fail");
const printAll = args.has("--all");
const maxFindings = parsePositiveInt(readArgValue("--max-findings"), 80);

const root = process.cwd();
const selfPath = normalize(path.relative(root, fileURLToPath(import.meta.url)));

const MAX_BYTES = 3 * 1024 * 1024;
const EXCLUDED_DIRS = new Set([
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  ".wrangler",
  "node_modules",
  "coverage",
  "test-results",
  "playwright-report",
  "blob-report",
  ".tmp",
]);

const TARGET_PATTERNS = [
  { id: "provider-name", re: /cloudinary/gi },
  { id: "cloudinary-api-host", re: /api\.cloudinary\.com/gi },
  { id: "cloudinary-delivery-host", re: /res\.cloudinary\.com/gi },
  { id: "cloudinary-public-env", re: /NEXT_PUBLIC_CLOUDINARY_[A-Z0-9_]+/g },
  { id: "cloudinary-secret-env", re: /CLOUDINARY_(?:API_KEY|API_SECRET|CLOUD_NAME)/g },
];

const CURRENT_WIDGET_FILES = loadCurrentWidgetFiles();
const ACTIVE_ROOTS = [
  ".github/",
  "src/",
  "tests/",
  "scripts/",
  "workers/",
];
const ACTIVE_FILES = new Set([
  ".env.example",
  "next.config.js",
  "package.json",
  "pnpm-lock.yaml",
  "playwright.widget.config.ts",
  "playwright.media.config.ts",
  "vitest.config.ts",
  "tsconfig.json",
]);

const findings = [];
let scannedFiles = 0;
let skippedLarge = 0;
let skippedBinary = 0;

walk(root);

const blockers = findings.filter((finding) => isBlockingCategory(finding.category));
const result = {
  scannedFiles,
  skippedLarge,
  skippedBinary,
  findingCount: findings.length,
  blockerCount: blockers.length,
  strict,
  maxFindings,
  categories: summarize(findings, "category"),
  patterns: summarize(findings, "pattern"),
  findings,
};

if (jsonOutput) {
  console.log(JSON.stringify(result, null, 2));
} else {
  printHuman(result);
}

if (!noFail && (strict ? findings.length > 0 : blockers.length > 0)) {
  process.exitCode = 1;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    const rel = normalize(path.relative(root, absolute));
    if (!rel || rel === selfPath) continue;
    if (entry.isDirectory()) {
      walk(absolute);
      continue;
    }
    if (!entry.isFile()) continue;
    scanFile(absolute, rel);
  }
}

function scanFile(absolute, rel) {
  const stat = fs.statSync(absolute);
  if (stat.size > MAX_BYTES) {
    skippedLarge += 1;
    return;
  }
  const buffer = fs.readFileSync(absolute);
  if (buffer.includes(0)) {
    skippedBinary += 1;
    return;
  }
  const text = buffer.toString("utf8");
  scannedFiles += 1;
  const category = categorize(rel);
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const pattern of TARGET_PATTERNS) {
      pattern.re.lastIndex = 0;
      let match;
      while ((match = pattern.re.exec(line)) !== null) {
        findings.push({
          category,
          file: rel,
          line: index + 1,
          pattern: pattern.id,
          match: match[0],
          preview: sanitizePreview(line, match.index),
        });
      }
    }
  }
}

function categorize(rel) {
  if (/^\.env(?:\.|$)/.test(rel)) return "local_env";
  if (CURRENT_WIDGET_FILES.has(rel)) return "current_widget_runtime";
  if (rel.startsWith("public/widget-runtime/")) return "retained_widget_runtime";
  if (rel.startsWith("docs/wiki/")) return "wiki";
  if (rel.startsWith(".agents/skills/") || rel === "skills-lock.json") return "tooling_knowledge";
  if (ACTIVE_FILES.has(rel) || ACTIVE_ROOTS.some((prefix) => rel.startsWith(prefix))) return "active_source";
  if (rel.startsWith("public/")) return "public_other";
  return "other";
}

function isBlockingCategory(category) {
  if (strict) return true;
  return category === "active_source" || category === "current_widget_runtime";
}

function sanitizePreview(line, matchIndex) {
  const start = Math.max(0, matchIndex - 80);
  const end = Math.min(line.length, matchIndex + 120);
  const slice = `${start > 0 ? "..." : ""}${line.slice(start, end)}${end < line.length ? "..." : ""}`;
  return slice
    .replace(/([A-Z0-9_]*(?:SECRET|TOKEN|KEY|PASSWORD|PRIVATE)[A-Z0-9_]*\s*=\s*)[^\s"']+/gi, "$1<redacted>")
    .replace(/(CLOUDINARY_[A-Z0-9_]*\s*=\s*)[^\s"']+/gi, "$1<redacted>")
    .replace(/(NEXT_PUBLIC_CLOUDINARY_[A-Z0-9_]*\s*=\s*)[^\s"']+/gi, "$1<redacted>");
}

function loadCurrentWidgetFiles() {
  const files = new Set(["public/widget.js"]);
  const manifestPath = path.join(root, "public", "widget-runtime", "build-manifest.json");
  if (!fs.existsSync(manifestPath)) return files;
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    for (const candidate of [manifest.entry, manifest.stableEntry]) {
      if (candidate) files.add(normalize(path.join("public", candidate)));
    }
    for (const output of manifest.outputs || []) {
      if (output.file) files.add(normalize(path.join("public", output.file)));
      for (const item of output.imports || []) {
        if (item.path) files.add(normalize(item.path.startsWith("public/") ? item.path : path.join("public", item.path)));
      }
    }
  } catch {
    files.add("public/widget-runtime/build-manifest.json");
  }
  return files;
}

function summarize(items, field) {
  const summary = {};
  for (const item of items) {
    summary[item[field]] = (summary[item[field]] || 0) + 1;
  }
  return summary;
}

function printHuman(output) {
  console.log("Provider legacy reference audit");
  console.log(`Scanned files: ${output.scannedFiles}`);
  console.log(`Findings: ${output.findingCount}`);
  console.log(`Blocking findings: ${output.blockerCount}${strict ? " (strict)" : ""}`);
  if (output.skippedLarge) console.log(`Skipped large files: ${output.skippedLarge}`);
  if (output.skippedBinary) console.log(`Skipped binary files: ${output.skippedBinary}`);
  console.log("");
  console.log("Categories:");
  for (const [category, count] of Object.entries(output.categories)) {
    const marker = isBlockingCategory(category) ? "BLOCKER" : "info";
    console.log(`- ${category}: ${count} (${marker})`);
  }
  if (!output.findings.length) {
    console.log("");
    console.log("No provider legacy references found.");
    return;
  }
  console.log("");
  const visibleFindings = printAll ? output.findings : output.findings.slice(0, output.maxFindings);
  for (const finding of visibleFindings) {
    const marker = isBlockingCategory(finding.category) ? "BLOCKER" : "info";
    console.log(`[${marker}] ${finding.category} ${finding.file}:${finding.line} ${finding.pattern}`);
    console.log(`  ${finding.preview}`);
  }
  if (!printAll && output.findings.length > output.maxFindings) {
    console.log("");
    console.log(`Showing first ${output.maxFindings} findings. Re-run with --all or --json for the complete list.`);
  }
}

function normalize(value) {
  return value.replace(/\\/g, "/");
}

function readArgValue(name) {
  const prefix = `${name}=`;
  const arg = process.argv.slice(2).find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
