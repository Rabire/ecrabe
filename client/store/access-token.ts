import { persistentAtom } from "@nanostores/persistent";
import Cookies from "universal-cookie";

export const $accessToken = persistentAtom<string | null>(
  "access-token",
  null,
  { encode: JSON.stringify, decode: JSON.parse },
);

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || "COOKIE_NAME";

const cookies = new Cookies(null, { path: "/" });

export const setTokens = (accessToken: string, refreshToken: string) => {
  $accessToken.set(accessToken);
  cookies.set(COOKIE_NAME, refreshToken);
};

export const logout = () => {
  $accessToken.set(null);
  cookies.remove(COOKIE_NAME);
};
