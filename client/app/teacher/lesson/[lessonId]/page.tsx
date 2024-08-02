"use client";

import { LoadingWheel } from "@/components/loader";
import UpsertLessonForm from "@/components/upsert-lesson-form";
import { useTeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { useParams, useSearchParams } from "next/navigation";
import LessonBilling from "./billing/billing";
import LessonChapters from "./chapters/chapters";
import LessonStudents from "./students/students";

const LessonInfo = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { lessonId } = useParams<{ lessonId: string }>();

  const { data, loading } = useTeacherLessonsPageQuery({
    variables: { lessonId },
  });

  const getTabContent = () => {
    if (!data) return null;

    switch (tab) {
      case "students":
        return <LessonStudents />;

      case "chapters":
        return <LessonChapters lessonData={data} />;

      case "billing":
        return <LessonBilling />;

      default:
        return <UpsertLessonForm lessonData={data} />;
    }
  };

  return (
    <main>
      {loading && <LoadingWheel />}
      {/* if error TODO: handle */}

      {getTabContent()}
    </main>
  );
};

export default LessonInfo;
