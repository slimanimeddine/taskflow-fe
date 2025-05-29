import { defineConfig } from 'orval'

export default defineConfig({
  App: {
    input: {
      target: 'http://localhost:8000/docs.openapi',
    },
    output: {
      namingConvention: 'kebab-case',
      mode: 'tags-split',
      target: 'src/__codegen/endpoints',
      schemas: 'src/__codegen/models',
      client: 'react-query',
      indexFiles: false,
      override: {
        header: false,
        mutator: {
          path: 'src/lib/axios.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          usePrefetch: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'npx prettier --write',
    },
  },
  AppZod: {
    input: {
      target: 'http://localhost:8000/docs.openapi',
    },
    output: {
      namingConvention: 'kebab-case',
      mode: 'tags-split',
      client: 'zod',
      override: {
        header: false,
        zod: {
          generate: {
            response: false,
            query: false,
            param: false,
            header: false,
            body: true,
          },
        },
      },
      indexFiles: false,
      target: 'src/__codegen/zod',
    },
    hooks: {
      afterAllFilesWrite: 'npx prettier --write',
    },
  },
})
