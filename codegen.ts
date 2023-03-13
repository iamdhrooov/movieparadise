import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http:localhost:4000/graphql/',
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: ['typescript-react-apollo'],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true,
};

export default config;
