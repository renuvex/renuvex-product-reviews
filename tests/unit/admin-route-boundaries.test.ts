import { readFileSync } from 'node:fs';
import path from 'node:path';

import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';

async function bundledInputs(entryPoint: string) {
  const result = await build({
    entryPoints: [entryPoint],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    metafile: true,
    write: false,
    logLevel: 'silent',
    packages: 'external',
    tsconfig: 'tsconfig.json',
  });
  return Object.keys(result.metafile?.inputs ?? {}).map((input) => input.replaceAll('\\', '/'));
}

describe('admin route dependency boundaries', () => {
  it('delegates iframe root admission to the single AppBridge owner', () => {
    const rootHookSource = readFileSync(path.join(process.cwd(), 'src/app/hooks/use-base-home-page.ts'), 'utf8');

    expect(rootHookSource).toContain("router.replace('/dashboard/reviews')");
    expect(rootHookSource).not.toContain('AppBridgeHelper');
    expect(rootHookSource).not.toContain('TokenHelpers');
  });

  it('keeps the persistent shell feature-neutral', async () => {
    const inputs = await bundledInputs('src/features/admin-shell/AdminShell.tsx');
    expect(inputs.some((input) => input.includes('/src/features/review-moderation/'))).toBe(false);
    expect(inputs.some((input) => input.includes('/src/features/widget-management/'))).toBe(false);
    expect(inputs.some((input) => input.endsWith('/src/lib/widgets/catalog.ts'))).toBe(false);
    expect(inputs.some((input) => input.includes('/src/widget/'))).toBe(false);
  });

  it('keeps review moderation out of widget feature and runtime graphs', async () => {
    const inputs = await bundledInputs('src/features/review-moderation/ReviewModerationScreen.tsx');
    expect(inputs.some((input) => input.includes('/src/features/widget-management/'))).toBe(false);
    expect(inputs.some((input) => input.includes('/src/widget/'))).toBe(false);
  });

  it('keeps the widget catalog out of editor and preview runtime graphs', async () => {
    const inputs = await bundledInputs('src/features/widget-management/WidgetCatalogScreen.tsx');
    expect(inputs.some((input) => input.includes('/components/editor/'))).toBe(false);
    expect(inputs.some((input) => input.endsWith('/src/features/widget-management/WidgetEditorScreen.tsx'))).toBe(false);
    expect(inputs.some((input) => input.includes('/src/widget/'))).toBe(false);
  });

  it('keeps widget admission server-first and avoids history interception', () => {
    const routeSource = readFileSync(path.join(process.cwd(), 'src/app/dashboard/widgets/[widgetId]/page.tsx'), 'utf8');
    const editorSource = readFileSync(path.join(process.cwd(), 'src/features/widget-management/components/editor/WidgetEditor.tsx'), 'utf8');

    expect(routeSource).not.toContain("'use client'");
    expect(routeSource).toContain('resolveWidgetDefinition(widgetId)');
    expect(routeSource).toContain('notFound()');
    expect(editorSource).toContain("addEventListener('beforeunload'");
    expect(editorSource).toContain('event.preventDefault()');
    expect(editorSource).toContain('event.returnValue = true');
    expect(editorSource).not.toMatch(/addEventListener\(['"]popstate/);
    expect(editorSource).not.toMatch(/history\.(?:pushState|replaceState)/);
    expect(editorSource).not.toMatch(/(?:sessionStorage|localStorage|indexedDB)/);
  });
});
