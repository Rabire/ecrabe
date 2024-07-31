"use client";

import { Button } from "@/components/ui/button";
import { useTeacherHomePageQuery } from "@/src/types/graphql-generated";
import { logout } from "@/store/access-token";
import Link from "next/link";
import CreateLessonModal from "./createLessonModal";

export default function TeacherHome() {
  const { data } = useTeacherHomePageQuery();
  // console.log(data, loading, error);
  const lessons = data?.user.lessons;
  return (
    <main>
      <h1>Teacher home page</h1>

      <CreateLessonModal />

      {lessons?.map((lesson) => (
        <Button variant="outline" key={lesson.id} asChild>
          <Link href={`/teacher/lesson/${lesson.id}`}>{lesson.title}</Link>
        </Button>
      ))}

      <Button variant="ghost" onClick={logout}>
        Déconnexion
      </Button>
    </main>
  );
}
