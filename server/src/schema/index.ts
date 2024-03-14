import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { join } from "path";

import permissions from "../middleware/permissions";
import resolvers from "../resolvers";

const schema = loadSchemaSync(join(__dirname, "**/*.gql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const schemaWithMiddleware = applyMiddleware(schemaWithResolvers, permissions); // with shields middleware

export default schemaWithMiddleware;
