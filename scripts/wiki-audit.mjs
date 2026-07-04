#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const jsonOutput = args.has("--json");
const changedSourceCheck = args.has("--changed-source-check");
const strictMode = args.has("--strict");

const root = process.cwd();
const wikiRoot = path.join(root, "docs", "wiki");

const REQUIRED_FRONTMATTER_FIELDS = [
  "type",
  "status",
  "project",
  "created",
  "updated",
  "tags",
  "related",
];

const RECOMMENDED_FRONTMATTER_FIELDS = [
  "last_verified",
  "confidence",
  "source_files",
];

const ALLOWED_TYPES = new Set([
  "architecture",
  "codebase",
  "decision",
  "bug",
  "problem",
  "integration",
  "ikas",
  "widget",
  "api",
  "database",
  "prompt",
  "roadmap",
  "research",
  "status",
  "feature",
  "log",
  "context",
  "maintenance",
]);

const ALLOWED_STATUSES = new Set([
  "active",
  "draft",
  "outdated",
  "archived",
  "superseded",
]);

const ALLOWED_CONFIDENCE = new Set(["high", "medium", "low"]);

const DATE_FIELDS = ["created", "updated", "last_verified"];

const MAX_HOT_CONTEXT_WORDS = 500;
const MAX_HOT_CONTEXT_SOURCE_FILES = 20;
const MAX_PROMPT_PAGE_WORDS = 1200;
const MAX_AGENTS_WORDS = 600;
const LONG_PAGE_WORDS = 1200;
const AGENT_BRIEF_WORDS = 250;

const HOT_CONTEXT_REQUIRED_HEADINGS = [
  "## Current Focus",
  "## Must Know",
  "## Recent Important Changes",
  "## Current Risks / Open Questions",
  "## Read Next",
];

const allowedPromptFiles = new Set([
  "Agent_Rules.md",
  "New_Session_Start_Prompt.md",
  "Documentation_Update_Prompt.md",
  "Wiki_Maintenance_Prompt.md",
  "Problem_Resolution_Prompt.md",
  "IDE_Agent_Usage.md",
  "Architecture_Review_Prompt.md",
  "Claude_Code_Rules.md",
  "Codex_Rules.md",
  "Database_Review_Prompt.md",
  "Debug_Prompt.md",
  "Existing_AI_Rules_And_Ikas_CLI_Instructions.md",
  "Master_Project_Prompt.md",
  "Widget_Development_Prompt.md",
]);

const PROMPTS_DIR_NAME = "09_Prompts";

const AGENT_BRIEF_TYPES = new Set([
  "architecture",
  "api",
  "bug",
  "codebase",
  "database",
  "decision",
  "ikas",
  "maintenance",
  "research",
  "status",
  "widget",
]);

const results = {
  tool: "wiki-audit",
  errors: [],
  warnings: [],
  health: "Green",
};

function exists(p) {
  return fs.existsSync(p);
}

function walk(dir) {
  if (!exists(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".obsidian" || entry.name === ".trash") continue;
      files.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }

  return files;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function wikiRel(file) {
  return path.relative(wikiRoot, file).replaceAll("\\", "/");
}

function wordCount(text) {
  return text
    .replace(/^---\r?\n[\s\S]*?\r?\n---/, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasAgentBrief(text) {
  return /^## Agent Brief\s*$/im.test(text);
}

function getAgentBriefWordCount(text) {
  const start = text.search(/^## Agent Brief\s*$/im);
  if (start === -1) return 0;

  const afterHeading = text.slice(start).replace(/^## Agent Brief\s*\r?\n/im, "");
  const nextHeading = afterHeading.search(/^##\s+/m);
  const body = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);

  return body.split(/\s+/).filter(Boolean).length;
}

function stripYamlScalar(value) {
  return value
    .trim()
    .replace(/^["']/, "")
    .replace(/["']$/, "");
}

function parseInlineList(value) {
  const trimmed = value.trim();
  if (trimmed === "[]") return [];
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  const body = trimmed.slice(1, -1).trim();
  if (!body) return [];
  return body.split(",").map((item) => stripYamlScalar(item)).filter(Boolean);
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const values = {};
  let currentKey = null;

  for (const line of match[1].split(/\r?\n/)) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (keyMatch) {
      const key = keyMatch[1];
      const rawValue = keyMatch[2] ?? "";
      const inlineList = parseInlineList(rawValue);
      currentKey = key;
      values[key] = inlineList ?? stripYamlScalar(rawValue);
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(values[currentKey])) {
        values[currentKey] = values[currentKey] ? [values[currentKey]] : [];
      }
      values[currentKey].push(stripYamlScalar(listMatch[1]));
    }
  }

  return {
    keys: new Set(Object.keys(values)),
    values,
  };
}

function asList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value || value === "[]") return [];
  return [value];
}

function scalar(value) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function add(level, file, message) {
  const item = { file: file ? rel(file) : "", message };
  if (level === "ERROR") results.errors.push(item);
  else results.warnings.push(item);
}

function addByRel(level, relativePath, message) {
  const item = { file: relativePath, message };
  if (level === "ERROR") results.errors.push(item);
  else results.warnings.push(item);
}

function addStrictable(file, message) {
  add(strictMode ? "ERROR" : "WARN", file, message);
}

function finalizeHealth() {
  if (results.errors.length > 0) results.health = "Red";
  else if (results.warnings.length > 0) results.health = "Yellow";
  else results.health = "Green";
}

function printHuman() {
  for (const err of results.errors) {
    console.log(`ERROR: ${err.file} ${err.message}`);
  }
  for (const warn of results.warnings) {
    console.log(`WARN: ${warn.file} ${warn.message}`);
  }
  console.log("");
  console.log(`Wiki audit completed. Errors: ${results.errors.length}, warnings: ${results.warnings.length}`);
  console.log(`Wiki health: ${results.health}`);
}

function validateEnum(file, fm, key, allowed) {
  const value = scalar(fm.values[key]);
  if (value && !allowed.has(value)) {
    add("ERROR", file, `invalid frontmatter ${key}: ${value}`);
  }
}

function validateDate(file, fm, key) {
  const value = scalar(fm.values[key]);
  if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    add("WARN", file, `frontmatter ${key} should use YYYY-MM-DD. Current: ${value}`);
  }
}

function isInsideRoot(absPath) {
  const relative = path.relative(root, absPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function validateSourceFiles(file, fm, sourceToWikiPages) {
  if (!fm.keys.has("source_files")) return;

  const sourceFiles = asList(fm.values.source_files);
  for (const sourceFile of sourceFiles) {
    if (!sourceFile || sourceFile === "[]") continue;

    if (sourceFile.startsWith("[[")) {
      add("ERROR", file, `source_files must use project-relative paths, not Obsidian links: ${sourceFile}`);
      continue;
    }

    if (/^https?:\/\//i.test(sourceFile)) {
      add("WARN", file, `source_files should point to local source/config/test files, not URLs: ${sourceFile}`);
      continue;
    }

    if (path.isAbsolute(sourceFile)) {
      add("ERROR", file, `source_files must be project-relative, not absolute: ${sourceFile}`);
      continue;
    }

    const absSourcePath = path.resolve(root, sourceFile);
    if (!isInsideRoot(absSourcePath)) {
      add("ERROR", file, `source_files path escapes the project root: ${sourceFile}`);
      continue;
    }

    if (!exists(absSourcePath)) {
      add("ERROR", file, `source_files path does not exist: ${sourceFile}`);
      continue;
    }

    const normalized = sourceFile.replaceAll("\\", "/");
    if (!sourceToWikiPages.has(normalized)) {
      sourceToWikiPages.set(normalized, []);
    }
    sourceToWikiPages.get(normalized).push(rel(file));
  }
}

function getWikiLinkTargets(text) {
  const matches = text.matchAll(/\[\[([^\]]+)\]\]/g);
  return [...matches].map((match) => match[1].split("|")[0].split("#")[0].trim()).filter(Boolean);
}

function buildWikiLookup(files) {
  const exact = new Set();
  const basenames = new Set();

  for (const file of files) {
    const relative = wikiRel(file).replace(/\.md$/, "");
    exact.add(relative);
    basenames.add(path.basename(relative));
  }

  return { exact, basenames };
}

function wikiLinkExists(target, currentFile, lookup) {
  if (!target || target.startsWith("#")) return true;
  if (/^https?:\/\//i.test(target)) return true;

  const normalized = target.replace(/\.md$/, "").replaceAll("\\", "/");
  const currentDir = path.dirname(wikiRel(currentFile)).replaceAll("\\", "/");
  const relativeCandidate = path.posix.normalize(path.posix.join(currentDir, normalized));

  return (
    lookup.exact.has(normalized) ||
    lookup.exact.has(relativeCandidate) ||
    (!normalized.includes("/") && lookup.basenames.has(normalized))
  );
}

function validateWikiLinks(file, text, lookup) {
  const targets = getWikiLinkTargets(text);
  for (const target of targets) {
    if (/\.(ts|tsx|js|jsx|mjs|cjs|py|rb|go|rs|java|kt|php|cs|cpp|c|h|hpp|css|scss|sass|less|html|vue|svelte|json|yml|yaml|toml|env|sql|mdx?)$/i.test(target)) {
      add("ERROR", file, `source file path used as Obsidian link: [[${target}]]`);
      continue;
    }

    if (!wikiLinkExists(target, file, lookup)) {
      add("ERROR", file, `broken wiki link: [[${target}]]`);
    }
  }
}

function validateHotContext(file, text, fm) {
  for (const heading of HOT_CONTEXT_REQUIRED_HEADINGS) {
    if (!text.includes(heading)) {
      add("ERROR", file, `Hot_Context missing required heading: ${heading}`);
    }
  }

  if (fm?.keys?.has("source_files")) {
    const sourceFileCount = asList(fm.values.source_files).filter((item) => item && item !== "[]").length;
    if (sourceFileCount > MAX_HOT_CONTEXT_SOURCE_FILES) {
      addStrictable(
        file,
        `Hot_Context source_files should stay hot-path focused (${sourceFileCount}/${MAX_HOT_CONTEXT_SOURCE_FILES}). Move detailed routing to focused wiki pages.`
      );
    }
  }
}

function validateIndex(file, text) {
  if (!text.includes("## Task Routing")) {
    add("ERROR", file, "Index.md is missing ## Task Routing.");
  }
  if (!text.includes("| Task Type |") || !text.includes("| Read First |")) {
    add("ERROR", file, "Index.md task routing table is missing required columns.");
  }
}

function getChangedFilesFromGit() {
  try {
    const output = execFileSync("git", ["diff", "--name-only", "HEAD"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return output.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch {
    return null;
  }
}

function validateChangedSourceFiles(sourceToWikiPages) {
  if (!changedSourceCheck) return;

  const changedFiles = getChangedFilesFromGit();
  if (!changedFiles) {
    addByRel("WARN", "", "--changed-source-check requested, but git changed files could not be read.");
    return;
  }

  for (const changedFile of changedFiles) {
    const normalized = changedFile.replaceAll("\\", "/");
    const relatedWikiPages = sourceToWikiPages.get(normalized);
    if (relatedWikiPages?.length) {
      addByRel(
        "WARN",
        normalized,
        `changed source file is referenced by wiki pages; review durable memory if behavior changed: ${relatedWikiPages.join(", ")}`
      );
    }
  }
}

if (!exists(wikiRoot)) {
  results.errors.push({ file: "docs/wiki", message: "docs/wiki does not exist." });
  finalizeHealth();
  if (jsonOutput) console.log(JSON.stringify(results, null, 2));
  else printHuman();
  process.exit(1);
}

const files = walk(wikiRoot);
const wikiLookup = buildWikiLookup(files);
const sourceToWikiPages = new Map();

const requiredFiles = [
  path.join(wikiRoot, "Index.md"),
  path.join(wikiRoot, "Hot_Context.md"),
  path.join(wikiRoot, "Log.md"),
  path.join(wikiRoot, PROMPTS_DIR_NAME, "Agent_Rules.md"),
];

for (const file of requiredFiles) {
  if (!exists(file)) {
    add("ERROR", file, "required file is missing.");
  }
}

for (const file of files) {
  const text = read(file);
  const fm = parseFrontmatter(text);

  const relative = rel(file);
  const isArchive = relative.includes("/archive/");
  const isTemplate = /\/\d+_Templates\//.test(relative);

  if (!fm && !isArchive && !isTemplate) {
    add("ERROR", file, "missing frontmatter.");
  }

  if (fm) {
    for (const field of REQUIRED_FRONTMATTER_FIELDS) {
      if (!fm.keys.has(field)) {
        add("WARN", file, `missing frontmatter field: ${field}`);
      }
    }

    if (strictMode) {
      for (const field of RECOMMENDED_FRONTMATTER_FIELDS) {
        if (!fm.keys.has(field)) {
          add("WARN", file, `missing recommended frontmatter field: ${field}`);
        }
      }
    }

    validateEnum(file, fm, "type", ALLOWED_TYPES);
    validateEnum(file, fm, "status", ALLOWED_STATUSES);
    validateEnum(file, fm, "confidence", ALLOWED_CONFIDENCE);

    for (const field of DATE_FIELDS) {
      validateDate(file, fm, field);
    }

    validateSourceFiles(file, fm, sourceToWikiPages);
  }

  validateWikiLinks(file, text, wikiLookup);

  const wc = wordCount(text);

  if (relative === "docs/wiki/Hot_Context.md") {
    validateHotContext(file, text, fm);
    if (wc > MAX_HOT_CONTEXT_WORDS) {
      add("ERROR", file, `Hot_Context exceeds ${MAX_HOT_CONTEXT_WORDS} words. Current: ${wc}`);
    }
  }

  if (relative === "docs/wiki/Index.md") {
    validateIndex(file, text);
  }

  if (relative.includes(`docs/wiki/${PROMPTS_DIR_NAME}/`) && wc > MAX_PROMPT_PAGE_WORDS) {
    add("WARN", file, `prompt page exceeds ${MAX_PROMPT_PAGE_WORDS} words. Current: ${wc}`);
  }

  const pageType = scalar(fm?.values?.type);
  const pageStatus = scalar(fm?.values?.status);
  if (
    fm &&
    pageStatus === "active" &&
    AGENT_BRIEF_TYPES.has(pageType) &&
    !relative.includes(`docs/wiki/${PROMPTS_DIR_NAME}/`) &&
    !isArchive &&
    !isTemplate &&
    wc > LONG_PAGE_WORDS
  ) {
    if (!hasAgentBrief(text)) {
      addStrictable(
        file,
        `long active ${pageType} page should have a ## Agent Brief for low-token routing. Current: ${wc} words.`
      );
    } else {
      const briefWords = getAgentBriefWordCount(text);
      if (briefWords > AGENT_BRIEF_WORDS) {
        add("WARN", file, `Agent Brief exceeds ${AGENT_BRIEF_WORDS} words. Current: ${briefWords}`);
      }
    }
  }
}

const promptsDir = path.join(wikiRoot, PROMPTS_DIR_NAME);
if (exists(promptsDir)) {
  const promptFiles = fs.readdirSync(promptsDir).filter((name) => name.endsWith(".md"));
  const nonDefault = promptFiles.filter((name) => !allowedPromptFiles.has(name));

  if (nonDefault.length > 0) {
    add("WARN", promptsDir, `non-default ${PROMPTS_DIR_NAME} files found: ${nonDefault.join(", ")}`);
  }
}

const agentsFile = path.join(root, "AGENTS.md");
if (exists(agentsFile)) {
  const agentsContent = read(agentsFile);
  const startMarker = "<!-- SECOND_BRAIN_RULES_START -->";
  const endMarker = "<!-- SECOND_BRAIN_RULES_END -->";
  
  let targetContent = agentsContent;
  const startIndex = agentsContent.indexOf(startMarker);
  const endIndex = agentsContent.indexOf(endMarker);
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    targetContent = agentsContent.substring(startIndex + startMarker.length, endIndex);
  } else {
    add("WARN", agentsFile, "Second Brain markers not found in AGENTS.md.");
  }

  const wc = wordCount(targetContent);
  if (wc > MAX_AGENTS_WORDS) {
    add("WARN", agentsFile, `AGENTS.md (wiki rules section) is long (${wc} words). Keep it short and operational.`);
  }
} else {
  add("ERROR", agentsFile, "AGENTS.md is missing.");
}

validateChangedSourceFiles(sourceToWikiPages);

finalizeHealth();

if (jsonOutput) {
  console.log(JSON.stringify(results, null, 2));
} else {
  printHuman();
}

if (results.errors.length > 0) {
  process.exit(1);
}
