import type { CodegenConfig } from '@graphql-codegen/cli';
import { preset } from '@ikas/admin-api-client';

const adminSchema = {
  'https://api.myikas.com/api/v2/admin/graphql': {
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

const config = {
  generates: {
    'src/lib/ikas-client/generated/graphql.ts': {
      schema: adminSchema,
      documents: ['src/lib/ikas-client/graphql-requests.ts'],
      preset,
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    'src/types/ikas-order-enum-globals.d.ts': {
      schema: adminSchema,
      documents: ['src/lib/ikas-client/graphql-requests.ts'],
      plugins: ['./scripts/ikas-enum-globals-codegen.cjs'],
    },
    'src/lib/ikas-client/generated/v1-graphql.ts': {
      schema: {
        'https://api.myikas.com/api/v1/admin/graphql': {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      },
      documents: ['src/lib/ikas-client/v1-graphql-requests.ts'],
      preset,
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
} as CodegenConfig;

export default config;
