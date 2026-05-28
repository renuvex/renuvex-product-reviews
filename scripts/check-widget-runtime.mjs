import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'public', 'widget-runtime', 'build-manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const files = new Set([
  path.join(root, 'public', 'widget.js'),
  path.join(root, 'public', 'widget-runtime', 'runtime.js'),
]);

for (const output of manifest.outputs || []) {
  const outputFile = output.file || output.path;
  if (outputFile && outputFile.endsWith('.js')) {
    const relativeFile = outputFile.startsWith('public/')
      ? outputFile
      : path.join('public', outputFile);
    files.add(path.join(root, relativeFile));
  }
}

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout || `Syntax check failed: ${file}\n`);
    process.exit(result.status || 1);
  }
}

console.log(`[check-widget-runtime] ${files.size} generated JS files passed node --check`);
