import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import type { Resolvers } from "../types/generated";
import mutationsResolvers from "./mutations";
import queryResolvers from "./queries";
import typeResolvers from "./types";

const resolvers: Resolvers = {
  Upload: GraphQLUpload,

  Query: queryResolvers,
  Mutation: mutationsResolvers,

  ...typeResolvers,
};

export default resolvers;
