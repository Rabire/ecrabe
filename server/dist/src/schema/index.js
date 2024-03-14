"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const load_1 = require("@graphql-tools/load");
const schema_1 = require("@graphql-tools/schema");
const graphql_middleware_1 = require("graphql-middleware");
const path_1 = require("path");
const permissions_1 = __importDefault(require("../middleware/permissions"));
const resolvers_1 = __importDefault(require("../resolvers"));
const schema = (0, load_1.loadSchemaSync)((0, path_1.join)(__dirname, "**/*.gql"), {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
const schemaWithResolvers = (0, schema_1.addResolversToSchema)({ schema, resolvers: resolvers_1.default });
const schemaWithMiddleware = (0, graphql_middleware_1.applyMiddleware)(schemaWithResolvers, permissions_1.default); // with shields middleware
exports.default = schemaWithMiddleware;
