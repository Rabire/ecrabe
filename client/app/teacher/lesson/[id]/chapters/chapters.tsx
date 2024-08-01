import { Button } from "@/components/ui/button";
import { TeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import Link from "next/link";

const LessonChapters = ({
  lessonData,
}: {
  lessonData: TeacherLessonsPageQuery;
}) => (
  <div>
    <h1>Chapitres</h1>
    <div className="mt-4">
      <Button>
        <Link href={`/teacher/lesson/${lessonData.lesson?.id}/chapters/edit/`}>
          Ajouter un chapitre
        </Link>
      </Button>
    </div>
    <div>
      {lessonData.lesson?.chapters.map((chapter) => (
        <div key={chapter.id}>
          <p>{chapter.title}</p>
        </div>
      ))}
    </div>
  </div>
);

export default LessonChapters;
