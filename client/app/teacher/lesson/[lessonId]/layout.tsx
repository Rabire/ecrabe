"use client";

import { LoadingText } from "@/components/loader";
import SidebarNav from "@/components/sidebar-nav";
import Separator from "@/components/ui/separator";
import apolloClient from "@/lib/apollo-client";
import { useTeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { ApolloProvider } from "@apollo/client";
import { useParams } from "next/navigation";

const SIDEBAR_ITEMS = [
  { title: "Formation", tab: "" },
  { title: "Chapitres", tab: "chapters" },
  { title: "Facturation", tab: "billing" },
  { title: "Étudiants", tab: "students" },
];

type Props = { children: React.ReactNode };

export default function LessonLayout({ children }: Props) {
  const { lessonId } = useParams<{ lessonId: string }>();

  const { data } = useTeacherLessonsPageQuery({ variables: { lessonId } });

  // TODO: handle error & loading

  if (data)
    return (
      <ApolloProvider client={apolloClient}>
        <main>
          <h2>{data.lesson?.title || <LoadingText />}</h2>

          <Separator className="my-6" />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <SidebarNav items={SIDEBAR_ITEMS} />

            <div className="flex-1 lg:w-full">{children}</div>
          </div>
        </main>
      </ApolloProvider>
    );
}
