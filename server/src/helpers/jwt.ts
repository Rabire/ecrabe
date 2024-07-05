import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./env-variables";

const ACCESS_TOKEN = ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
const REFRESH_TOKEN = REFRESH_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN, {
    expiresIn: 60 * 60,
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN, {
    expiresIn: 604_800, // a week
  });
};

export const generateTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (accessToken: string) => {
  return jwt.verify(accessToken, ACCESS_TOKEN) as { userId: string };
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN) as { userId: string };
};
