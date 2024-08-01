"use client";

import { Button } from "@/components/ui/button";
import { useTeacherHomePageQuery } from "@/src/types/graphql-generated";
import Link from "next/link";
import CreateLessonModal from "./components/create-lesson-modal";

export default function TeacherHome() {
  const { data } = useTeacherHomePageQuery();
  // TODO: loading, error handling

  const lessons = data?.user.lessons;

  return (
    <main>
      <h1>Vos formations</h1>

      <CreateLessonModal />

      {lessons?.map((lesson) => (
        <Button variant="outline" key={lesson.id} asChild>
          {/* TODO: replace buttons with cards */}
          <Link href={`/teacher/lesson/${lesson.id}`}>{lesson.title}</Link>
        </Button>
      ))}
    </main>
  );
}
