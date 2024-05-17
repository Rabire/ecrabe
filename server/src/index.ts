import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import http from "http";
import { SERVER_PORT } from "./helpers/env-variables";
// import { handleError } from "./helpers/error-handler";
// import createContext from "./middleware/context";
import createContext from "./middleware/context";
import schema from "./schema";

async function startApolloServer() {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    // formatError: (error) => handleError(error),
    status400ForVariableCoercionErrors: true,
  });

  await server.start();

  app.use(
    "/",
    bodyParser.json(),
    cors({
      origin: "*",
      credentials: true,
    }),
    graphqlUploadExpress({
      // maxFileSize: 10_000_000, // 10 MB
    }),
    expressMiddleware(server, {
      context: async ({ req }) => await createContext(req, server.cache),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: SERVER_PORT }, resolve)
  );

  console.info(
    `🚀 Graphql server listening at http://localhost:${SERVER_PORT}/`
  );
}

startApolloServer();
