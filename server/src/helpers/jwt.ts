import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./env-variables";

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 10,
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: 604_800, // a week
  });
};

export const generateTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (accessToken: string) => {
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as { userId: string };
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
};
