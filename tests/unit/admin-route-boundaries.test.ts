import { readFileSync } from 'node:fs';
import path from 'node:path';

import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';

import { WIDGET_IDS } from '@/lib/widgets/catalog';

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
    const inputs = await bundledInputs('src/features/admin-shell/AdminAuthBoundary.tsx');
    expect(inputs.some((input) => input.includes('/src/features/review-moderation/'))).toBe(false);
    expect(inputs.some((input) => input.includes('/src/features/widget-management/'))).toBe(false);
    expect(inputs.some((input) => input.endsWith('/src/lib/widgets/catalog.ts'))).toBe(false);
    expect(inputs.some((input) => input.includes('/src/widget/'))).toBe(false);
  });

  it('keeps visual workspace chrome out of the focused editor route', async () => {
    const workspaceInputs = await bundledInputs('src/features/admin-shell/AdminWorkspaceShell.tsx');
    const dashboardLayout = readFileSync(path.join(process.cwd(), 'src/app/dashboard/layout.tsx'), 'utf8');
    const reviewsLayout = readFileSync(path.join(process.cwd(), 'src/app/dashboard/reviews/layout.tsx'), 'utf8');
    const catalogLayout = readFileSync(path.join(process.cwd(), 'src/app/dashboard/widgets/(catalog)/layout.tsx'), 'utf8');
    const editorLayout = readFileSync(path.join(process.cwd(), 'src/app/dashboard/widgets/[widgetId]/layout.tsx'), 'utf8');

    expect(workspaceInputs.some((input) => input.includes('/src/features/review-moderation/'))).toBe(false);
    expect(workspaceInputs.some((input) => input.includes('/src/features/widget-management/'))).toBe(false);
    expect(workspaceInputs.some((input) => input.includes('/src/widget/'))).toBe(false);
    expect(dashboardLayout).toContain('AdminAuthBoundary');
    expect(dashboardLayout).not.toContain('AdminWorkspaceShell');
    expect(reviewsLayout).toContain('AdminWorkspaceShell');
    expect(catalogLayout).toContain('AdminWorkspaceShell');
    expect(editorLayout).not.toContain('AdminWorkspaceShell');
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
    const cardSource = readFileSync(path.join(process.cwd(), 'src/features/widget-management/components/WidgetCard.tsx'), 'utf8');
    const editorSource = readFileSync(path.join(process.cwd(), 'src/features/widget-management/components/editor/WidgetEditor.tsx'), 'utf8');
    const bundleVerifierSource = readFileSync(path.join(process.cwd(), 'scripts/verify-admin-route-bundles.mjs'), 'utf8');

    expect(routeSource).not.toContain("'use client'");
    expect(routeSource).toContain('resolveWidgetDefinition(widgetId)');
    expect(routeSource).toContain('notFound()');
    expect(routeSource).toContain('export const dynamicParams = true');
    expect(routeSource).toContain('export function generateStaticParams()');
    expect(routeSource).toContain('return WIDGET_IDS.map((widgetId) => ({ widgetId }))');
    expect(cardSource).toContain("from 'next/link'");
    expect(cardSource).toContain('<Link');
    expect(cardSource).toContain('href={customizeHref}');
    expect(cardSource).toContain('prefetch={false}');
    expect(cardSource).toContain('router.prefetch(customizeHref)');
    for (const widgetId of WIDGET_IDS) {
      expect(bundleVerifierSource).toContain(`/dashboard/widgets/${widgetId}`);
    }
    expect(editorSource).toContain("addEventListener('beforeunload'");
    expect(editorSource).toContain('event.preventDefault()');
    expect(editorSource).toContain('event.returnValue = true');
    expect(editorSource).not.toMatch(/addEventListener\(['"]popstate/);
    expect(editorSource).not.toMatch(/history\.(?:pushState|replaceState)/);
    expect(editorSource).not.toMatch(/(?:sessionStorage|localStorage|indexedDB)/);
    expect(editorSource).not.toContain('registerNavigationBlocker');
  });
});
