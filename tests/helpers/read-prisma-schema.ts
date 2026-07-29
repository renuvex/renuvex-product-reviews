import fs from 'node:fs';
import path from 'node:path';

function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

function collectPrismaFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectPrismaFiles(absolutePath);
    return entry.isFile() && entry.name.endsWith('.prisma') ? [absolutePath] : [];
  });
}

export function findPrismaSchemaFiles(projectRoot = process.cwd()): string[] {
  const prismaDirectory = path.join(projectRoot, 'prisma');
  const rootSchema = 'prisma/schema.prisma';
  const files = collectPrismaFiles(prismaDirectory)
    .map((absolutePath) => ({
      absolutePath,
      relativePath: toPosixPath(path.relative(projectRoot, absolutePath)),
    }))
    .sort((left, right) => {
      if (left.relativePath === rootSchema) return -1;
      if (right.relativePath === rootSchema) return 1;
      return left.relativePath.localeCompare(right.relativePath);
    });

  const invalidPaths = files
    .map(({ relativePath }) => relativePath)
    .filter(
      (relativePath) =>
        relativePath !== rootSchema &&
        (!relativePath.startsWith('prisma/models/') || path.posix.basename(relativePath) === 'schema.prisma'),
    );

  if (invalidPaths.length > 0) {
    throw new Error(`Unexpected Prisma schema file location: ${invalidPaths.join(', ')}`);
  }
  if (!files.some(({ relativePath }) => relativePath === rootSchema)) {
    throw new Error(`Missing Prisma schema entrypoint: ${rootSchema}`);
  }

  return files.map(({ absolutePath }) => absolutePath);
}

export function readCombinedPrismaSchema(projectRoot = process.cwd()): string {
  return findPrismaSchemaFiles(projectRoot)
    .map((filePath) => fs.readFileSync(filePath, 'utf8'))
    .join('\n');
}
