"use client";

import SidebarNav from "@/components/sidebar-nav";
import Separator from "@/components/ui/separator";
import apolloClient from "@/lib/apollo-client";
import { useGetLessonByIdQuery } from "@/src/types/graphql-generated";
import { ApolloProvider } from "@apollo/client";
import { useParams } from "next/navigation";
import React from "react";

const SIDEBAR_ITEMS = [
  {
    title: "Formation",
    tab: "home",
  },
  {
    title: "Facturation",
    tab: "billing",
  },
  {
    title: "Étudiants",
    tab: "students",
  },
  {
    title: "Chapitres",
    tab: "chapters",
  },
];

interface LessonLayoutProps {
  children: React.ReactNode;
}

export default function LessonLayout({ children }: LessonLayoutProps) {
  const params = useParams<{ id: string }>();

  const { data, loading } = useGetLessonByIdQuery({
    variables: { lessonId: params.id },
  });

  // TODO: handle error

  if (loading) return <p>loading...</p>;

  if (data)
    return (
      <ApolloProvider client={apolloClient}>
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {data.lesson?.title}
            </h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={SIDEBAR_ITEMS} />
            </aside>

            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </ApolloProvider>
    );
}
