"use client";

import SidebarNav from "@/components/sidebar-nav";
import Separator from "@/components/ui/separator";
import { useLessonQuery } from "@/src/types/graphql-generated";
import { useParams } from "next/navigation";

const SIDEBAR_ITEMS = [
  {
    title: "Formation",
    href: "/",
  },
  {
    title: "Facturation",
    href: "/billing",
  },
  {
    title: "Étudiants",
    href: "/students",
  },
  {
    title: "Chapitres",
    href: "/chapters",
  },
];

interface LessonLayoutProps {
  children: React.ReactNode;
}

export default function LessonLayout({ children }: LessonLayoutProps) {
  const params = useParams<{ id: string }>();

  const { data, loading } = useLessonQuery({
    variables: { lessonId: params.id },
  });

  // TODO: handle error

  if (loading) return <p>loading...</p>;

  if (data)
    return (
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
    );
}
