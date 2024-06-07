import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";

const headersLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YmFiMzZkOS0xZjJkLTQxZWQtYTBiYy1hNzJiNDU0ODk0MTEiLCJpYXQiOjE3MTU5MzY0NDIsImV4cCI6MTcxNTk0MDA0Mn0.c4ac0mZHC7IOOX3Aw9Sqe8ggJ4ueuN7mdFWrgfqXPaM",
    "Apollo-Require-Preflight": "true",
    /*  Cookies: JSON.stringify({
      [import.meta.env.VITE_COOKIE_NAME]: cookies.get(
        import.meta.env.VITE_COOKIE_NAME
      ),
    }), */
  },
}));
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    // Handle Errors
    console.log(graphQLErrors.map((error) => error.message));
  }

  forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  link: from([headersLink, errorLink, httpLink]),
});

export default apolloClient;
