"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const graphqlUploadExpress_js_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.js"));
const http_1 = __importDefault(require("http"));
const env_variables_1 = require("./helpers/env-variables");
// import { handleError } from "./helpers/error-handler";
// import createContext from "./middleware/context";
const schema_1 = __importDefault(require("./schema"));
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new server_1.ApolloServer({
            schema: schema_1.default,
            // formatError: (error) => handleError(error),
            status400ForVariableCoercionErrors: true,
        });
        yield server.start();
        app.use("/", body_parser_1.default.json(), (0, cors_1.default)({
            origin: "*",
            credentials: true,
        }), (0, graphqlUploadExpress_js_1.default)({
            maxFileSize: 10000000, // 10 MB
        }), (0, express4_1.expressMiddleware)(server, {
        // context: async ({ req }) => await createContext(req, server.cache),
        }));
        yield new Promise((resolve) => httpServer.listen({ port: env_variables_1.SERVER_PORT }, resolve));
        console.info(`🚀 Graphql server listening at http://localhost:${env_variables_1.SERVER_PORT}/`);
    });
}
startApolloServer();
