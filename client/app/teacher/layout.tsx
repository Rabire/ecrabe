"use client";

import Header from "@/components/header";
import apolloClient from "@/lib/apollo-client";
import { $accessToken } from "@/store/access-token";
import { ApolloProvider } from "@apollo/client";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";
import React from "react";

interface TeacherLayoutProps {
  children: React.ReactNode;
}
const TeacherLayout = ({ children }: TeacherLayoutProps) => {
  const accessToken = useStore($accessToken);
  const router = useRouter();

  if (!accessToken) router.push("/login");

  return (
    <ApolloProvider client={apolloClient}>
      <Header />

      {children}
    </ApolloProvider>
  );
};

export default TeacherLayout;
