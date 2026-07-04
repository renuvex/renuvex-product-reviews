#!/usr/bin/env python3

from pathlib import Path
from datetime import date, datetime
import argparse
import json
import re
import sys

ROOT = Path.cwd()
WIKI = ROOT / "docs" / "wiki"

MAX_HOT_CONTEXT_WORDS = 500
MAX_HOT_CONTEXT_SOURCE_FILES = 20
MAX_PAGE_WORDS = 1200
HUGE_PAGE_WORDS = 3000
STALE_DAYS = 60

AGENT_BRIEF_TYPES = {
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
}

def read(path):
    return path.read_text(encoding="utf-8", errors="ignore")

def word_count(text):
    text = re.sub(r"^---[\s\S]*?---", "", text)
    return len([w for w in re.split(r"\s+", text) if w])

def frontmatter_value(text, key):
    m = re.search(rf"^{key}:\s*(.+)$", text, re.MULTILINE)
    if not m:
        return None
    return m.group(1).strip().strip('"').strip("'")

def frontmatter_list_count(text, key):
    lines = text.splitlines()
    count = 0
    in_key = False

    for line in lines:
        if re.match(rf"^{key}:\s*(\[.*\])?\s*$", line):
            in_key = True
            inline = line.split(":", 1)[1].strip()
            if inline == "[]":
                return 0
            continue

        if in_key:
            if line.strip() == "---":
                break
            if re.match(r"^[A-Za-z0-9_-]+:", line):
                break
            if re.match(r"^\s*-\s+", line):
                count += 1

    return count

def parse_date(value):
    if not value:
        return None
    try:
        return datetime.strptime(value[:10], "%Y-%m-%d").date()
    except ValueError:
        return None

def duplicate_heading_score(text):
    headings = re.findall(r"^#{2,4}\s+(.+)$", text, flags=re.MULTILINE)
    normalized = [h.strip().lower() for h in headings]
    return len(normalized) - len(set(normalized))

def has_agent_brief(text):
    return bool(re.search(r"^## Agent Brief\s*$", text, flags=re.MULTILINE | re.IGNORECASE))

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", action="store_true", help="Output JSON")
    args = parser.parse_args()

    result = {
        "tool": "wiki-prune-report",
        "suggestions": [],
        "health": "Green",
    }

    if not WIKI.exists():
        result["suggestions"].append({
            "file": "docs/wiki",
            "message": "docs/wiki does not exist."
        })
        result["health"] = "Red"
        if args.json:
            print(json.dumps(result, indent=2))
        else:
            print("ERROR: docs/wiki does not exist.")
        return 1

    today = date.today()

    for file in WIKI.rglob("*.md"):
        text = read(file)
        rel = str(file.relative_to(ROOT))
        wc = word_count(text)
        last_verified = parse_date(frontmatter_value(text, "last_verified"))
        status = frontmatter_value(text, "status")
        page_type = frontmatter_value(text, "type")
        duplicate_headings = duplicate_heading_score(text)

        if file.name == "Hot_Context.md" and wc > MAX_HOT_CONTEXT_WORDS:
            result["suggestions"].append({
                "file": rel,
                "message": f"Hot_Context exceeds {MAX_HOT_CONTEXT_WORDS} words ({wc}). Summarize active context."
            })

        if file.name == "Hot_Context.md":
            source_file_count = frontmatter_list_count(text, "source_files")
            if source_file_count > MAX_HOT_CONTEXT_SOURCE_FILES:
                result["suggestions"].append({
                    "file": rel,
                    "message": f"Hot_Context has {source_file_count} source_files. Keep only hot-path anchors; move detailed routing to focused pages."
                })

        if (
            wc > MAX_PAGE_WORDS
            and "archive" not in rel
            and status == "active"
            and page_type in AGENT_BRIEF_TYPES
            and not has_agent_brief(text)
        ):
            result["suggestions"].append({
                "file": rel,
                "message": f"Long active {page_type} page has no Agent Brief ({wc} words). Add a 150-250 word routing brief before pruning."
            })

        if wc > HUGE_PAGE_WORDS and "archive" not in rel and page_type == "log":
            result["suggestions"].append({
                "file": rel,
                "message": f"Large log page ({wc} words). Consider rolling old entries into archive/history only if current routing stays clear."
            })

        if last_verified and (today - last_verified).days > STALE_DAYS:
            if page_type in {"architecture", "api", "database", "integration", "status", "codebase"} and status == "active":
                result["suggestions"].append({
                    "file": rel,
                    "message": f"Active {page_type} page last verified {(today - last_verified).days} days ago. Re-verify if still important."
                })

        if duplicate_headings > 0:
            result["suggestions"].append({
                "file": rel,
                "message": f"Has {duplicate_headings} duplicate heading(s). Check for repeated sections."
            })

        if "09_Prompts" in rel:
            lower = text.lower()
            suspicious = [
                "market research",
                "database schema",
                "api endpoint",
                "feature status",
            ]
            hits = [s for s in suspicious if s in lower]
            if hits:
                result["suggestions"].append({
                    "file": rel,
                    "message": f"09_Prompts may contain project facts or non-procedure content: {', '.join(hits)}"
                })

    result["health"] = "Yellow" if result["suggestions"] else "Green"

    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print("Wiki prune report:")
        if not result["suggestions"]:
            print("- No obvious pruning suggestions.")
        else:
            for suggestion in result["suggestions"]:
                print(f"- {suggestion['file']}: {suggestion['message']}")
        print(f"Wiki prune health: {result['health']}")

    return 0

if __name__ == "__main__":
    sys.exit(main())
