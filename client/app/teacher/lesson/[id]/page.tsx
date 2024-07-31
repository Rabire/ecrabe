"use client";

import UpsertLessonForm from "@/components/upsert-lesson-form";
import { useTeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { useParams, useSearchParams } from "next/navigation";
import LessonBilling from "./billing/billing";
import LessonChapters from "./chapters/chapters";
import LessonStudents from "./students/students";

const LessonInfo = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const params = useParams<{ id: string }>();

  const { data, loading } = useTeacherLessonsPageQuery({
    variables: { lessonId: params.id },
  });

  if (!data) return null;

  return (
    <main>
      {loading && <p>loading...</p>}
      {tab === "students" && <LessonStudents />}
      {tab === "chapters" && <LessonChapters lessonData={data} />}
      {tab === "billing" && <LessonBilling />}
      {(tab === "home" || tab === "" || !tab) && (
        <UpsertLessonForm lessonData={data} />
      )}
    </main>
  );
};

export default LessonInfo;
