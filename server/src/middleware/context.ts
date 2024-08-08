import { ApolloServer, BaseContext } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import type { Request } from "express";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../helpers/env-variables";
import { verifyAccessToken } from "../helpers/jwt";
import ExtendedMinioClient from "../services/minio";
export interface GraphQLContext {
  userId: string | undefined;
  prisma: PrismaClient;
  minio: ExtendedMinioClient;
  stripe: Stripe;
  req: Request;
}

const prisma = new PrismaClient();

const minio = new ExtendedMinioClient();

const stripe = new Stripe(STRIPE_SECRET_KEY || "");

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
    stripe,
    req,
  };
};

export default createContext;
