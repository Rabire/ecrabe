import dotenv from "dotenv";

dotenv.config();

export const IS_DEV = process.env.NODE_ENV === "development";

export const SERVER_PORT = process.env.SERVER_PORT || "SERVER_PORT";

export const MINIO_BUCKET = process.env.MINIO_BUCKET || "MINIO_BUCKET";
export const MINIO_ACCESS_KEY =
  process.env.MINIO_ACCESS_KEY || "MINIO_ACCESS_KEY";
export const MINIO_SECRET_KEY =
  process.env.MINIO_SECRET_KEY || "MINIO_SECRET_KEY";

export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";
