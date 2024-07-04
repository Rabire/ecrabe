import { ApolloServer, BaseContext } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import type { Request } from "express";
import { verifyAccessToken } from "../helpers/jwt";
import ExtendedMinioClient from "../services/minio";

export interface GraphQLContext {
  userId: string | undefined;
  prisma: PrismaClient;
  minio: ExtendedMinioClient;
  req: Request;
}

const prisma = new PrismaClient();

const minio = new ExtendedMinioClient();

const createContext = async (
  req: Request,
  cache: ApolloServer<BaseContext>["cache"]
): Promise<GraphQLContext> => {
  const accessToken = req.headers["authorization"] as string;

  let userId: string | undefined;

  try {
    userId = verifyAccessToken(accessToken).userId;
  } catch (error) {
    userId = undefined;
  }

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    userId,
    prisma,
    minio,
    req,
  };
};

export default createContext;
