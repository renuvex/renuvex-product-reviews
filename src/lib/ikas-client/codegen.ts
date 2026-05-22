import type { CodegenConfig } from '@graphql-codegen/cli';
import { preset } from '@ikas/admin-api-client';

const config: CodegenConfig = {
  generates: {
    'src/lib/ikas-client/generated/graphql.ts': {
      schema: {
        'https://api.myikas.com/api/v2/admin/graphql': {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      },
      documents: ['src/lib/ikas-client/graphql-requests.ts'],
      preset,
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
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
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
