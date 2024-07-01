import apolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
