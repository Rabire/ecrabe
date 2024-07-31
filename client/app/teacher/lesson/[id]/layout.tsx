"use client";

import SidebarNav from "@/components/sidebar-nav";
import Separator from "@/components/ui/separator";
import apolloClient from "@/lib/apollo-client";
import { useTeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { ApolloProvider } from "@apollo/client";
import { useParams } from "next/navigation";

const SIDEBAR_ITEMS = [
  { title: "Formation", tab: "home" },
  { title: "Chapitres", tab: "chapters" },
  { title: "Facturation", tab: "billing" },
  { title: "Étudiants", tab: "students" },
];

type Props = { children: React.ReactNode };

export default function LessonLayout({ children }: Props) {
  const params = useParams<{ id: string }>();

  const { data, loading } = useTeacherLessonsPageQuery({
    variables: { lessonId: params.id },
  });

  // TODO: handle error

  if (loading) return <p>loading...</p>;

  if (data)
    return (
      <ApolloProvider client={apolloClient}>
        <main>
          <h2>{data.lesson?.title}</h2>

          <Separator className="my-6" />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={SIDEBAR_ITEMS} />
            </aside>

            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </main>
      </ApolloProvider>
    );
}
