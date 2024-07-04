"use client";
import apolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import React from "react";

interface TeacherLayoutProps {
  children: React.ReactNode;
}
const TeacherLayout = ({ children }: TeacherLayoutProps) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default TeacherLayout;
