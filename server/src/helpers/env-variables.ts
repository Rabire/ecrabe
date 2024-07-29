import dotenv from "dotenv";

dotenv.config();

export const IS_DEV = process.env.NODE_ENV === "development";

export const PORT = process.env.PORT;

export const MINIO_BUCKET = process.env.MINIO_BUCKET;
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
export const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const COOKIE_NAME = process.env.COOKIE_NAME;
