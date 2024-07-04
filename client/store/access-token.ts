import { persistentAtom } from "@nanostores/persistent";
import Cookies from "universal-cookie";

export const $accessToken = persistentAtom<string | null>(
  "access-token",
  null,
  { encode: JSON.stringify, decode: JSON.parse }
);

const cookies = new Cookies(null, { path: "/" });

const COOKIE_NAME = process.env.COOKIE_NAME || "COOKIE_NAME";

export const setTokens = (accessToken: string, refreshToken: string) => {
  $accessToken.set(accessToken);
  cookies.set(COOKIE_NAME, refreshToken);
};

export const logout = () => {
  $accessToken.set(null);
  cookies.remove(COOKIE_NAME);
};
