import refreshTokenMutation from "@/app/login/refresh-token-mutation";
import { $accessToken, logout, setTokens } from "@/store/access-token";
import { ApolloClient, InMemoryCache, Observable, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const COOKIE_NAME = process.env.COOKIE_NAME || "COOKIE_NAME";

const headersLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: $accessToken.get(),
    "Apollo-Require-Preflight": "true",
    Cookies: JSON.stringify({ [COOKIE_NAME]: cookies.get(COOKIE_NAME) }),
  },
}));

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  graphQLErrors?.forEach((error) => console.error(error));

  // TODO: handle token refresh
  const isTokenInvalid = graphQLErrors?.some(
    (error) => error.message === "Invalid token"
  );

  if (isTokenInvalid) {
    return new Observable((observer) => {
      (async () => {
        try {
          const { data } = await apolloClient.mutate({
            mutation: refreshTokenMutation,
          });

          setTokens(
            data.refreshToken.accessToken,
            data.refreshToken.refreshToken
          );

          // Modify the operation context with a new token
          const oldHeaders = operation.getContext().headers;

          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: data.refreshToken.accessToken,
            },
          });

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          // Retry last failed request
          forward(operation).subscribe(subscriber);
        } catch (error) {
          observer.error(error);
          logout();
        }
      })();
    });
  }
});

const httpLink = new HttpLink({ uri: "/graphql" });

const apolloClient = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  link: from([headersLink, errorLink, httpLink]),
});

export default apolloClient;
