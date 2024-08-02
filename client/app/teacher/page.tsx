"use client";

import LessonCard from "@/components/lesson-card";
import { LoadingWheel } from "@/components/loader";
import { useTeacherHomePageQuery } from "@/src/types/graphql-generated";
import CreateLessonModal from "./components/create-lesson-modal";

export default function TeacherHome() {
  const { data, loading, error } = useTeacherHomePageQuery();

  const lessons = data?.user.lessons;

  return (
    <main>
      <h1>Vos formations</h1>

      {loading && (
        <div className="flex justify-center">
          <LoadingWheel />
        </div>
      )}

      {error && (
        <p className="error">
          Une erreur est survenue lors de la récupération de vos formations.
        </p>
      )}

      <CreateLessonModal />

      {lessons?.length === 0 && (
        <p className="text-center italic text-muted-foreground">
          Vous n&apos;avez pas encore de formation.
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lessons?.map((lesson) => <LessonCard lesson={lesson} isTeacher />)}
      </div>
    </main>
  );
}
