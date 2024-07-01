import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "**/*.{gql,graphql}",
  generates: {
    "src/types/graphql-generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        { add: { content: "/* eslint-disable */" } },
      ],
      config: {
        avoidOptionals: { inputValue: false },
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
};

export default config;
