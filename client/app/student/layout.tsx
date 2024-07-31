"use client";

import Header from "@/components/header";
import apolloClient from "@/lib/apollo-client";
import { $accessToken } from "@/store/access-token";
import { ApolloProvider } from "@apollo/client";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const accessToken = useStore($accessToken);
  const router = useRouter();

  if (!accessToken) router.push("/login");

  return (
    <ApolloProvider client={apolloClient}>
      <Header />

      {children}
    </ApolloProvider>
  );
}
