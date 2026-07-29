import fs from 'node:fs';
import path from 'node:path';
import { Prisma } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import { findPrismaSchemaFiles, readCombinedPrismaSchema } from '../helpers/read-prisma-schema';

const root = process.cwd();
const rootSchemaPath = path.join(root, 'prisma', 'schema.prisma');
const schemaFiles = findPrismaSchemaFiles(root);
const combinedSchema = readCombinedPrismaSchema(root);

function declarations(source: string, keyword: 'datasource' | 'generator' | 'model'): string[] {
  return [...source.matchAll(new RegExp(`^${keyword}\\s+(\\w+)`, 'gm'))].map((match) => match[1]);
}

describe('Prisma multi-file schema layout', () => {
  it('keeps one root entrypoint and domain models under prisma/models', () => {
    const relativePaths = schemaFiles.map((filePath) => path.relative(root, filePath).split(path.sep).join('/'));

    expect(relativePaths[0]).toBe('prisma/schema.prisma');
    expect(relativePaths.slice(1)).toEqual([...relativePaths.slice(1)].sort());
    expect(relativePaths.slice(1).every((filePath) => filePath.startsWith('prisma/models/'))).toBe(true);
  });

  it('keeps generator and datasource only in the root entrypoint', () => {
    const rootSchema = fs.readFileSync(rootSchemaPath, 'utf8');

    expect(declarations(rootSchema, 'generator')).toEqual(['client']);
    expect(declarations(rootSchema, 'datasource')).toEqual(['db']);
    expect(declarations(rootSchema, 'model')).toEqual([]);

    for (const filePath of schemaFiles.slice(1)) {
      const source = fs.readFileSync(filePath, 'utf8');
      expect(declarations(source, 'generator')).toEqual([]);
      expect(declarations(source, 'datasource')).toEqual([]);
      expect(declarations(source, 'model').length).toBeGreaterThan(0);
    }
  });

  it('keeps model declarations unique and equal to the generated Prisma client', () => {
    const modelNames = declarations(combinedSchema, 'model');
    const uniqueModelNames = [...new Set(modelNames)].sort();
    const generatedModelNames = Object.values(Prisma.ModelName).sort();

    expect(uniqueModelNames).toHaveLength(modelNames.length);
    expect(uniqueModelNames).toEqual(generatedModelNames);
  });
});
