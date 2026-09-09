#!/usr/bin/env bash

set -euo pipefail

browser="${1:-}"

case "$browser" in
  chromium | firefox | webkit) ;;
  *)
    echo "[playwright-ci] expected chromium, firefox, or webkit" >&2
    exit 64
    ;;
esac

if [[ "${GITHUB_ACTIONS:-}" == "true" && "${RUNNER_OS:-}" == "Linux" ]]; then
  for source_path in \
    /etc/apt/sources.list.d/google-chrome.list \
    /etc/apt/sources.list.d/google-chrome.sources; do
    if [[ ! -f "$source_path" ]]; then
      continue
    fi

    if ! grep -Fq "dl.google.com/linux/chrome" "$source_path"; then
      echo "[playwright-ci] leaving unexpected apt source unchanged: $source_path" >&2
      continue
    fi

    echo "[playwright-ci] disabling unused Google Chrome apt source: $source_path"
    sudo mv -- "$source_path" "${source_path}.renuvex-disabled"
  done
fi

pnpm exec playwright install --with-deps "$browser"
