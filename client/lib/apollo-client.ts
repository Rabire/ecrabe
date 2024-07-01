import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http";

const headersLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: "TODO: Add your token here",
    "Apollo-Require-Preflight": "true",
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
