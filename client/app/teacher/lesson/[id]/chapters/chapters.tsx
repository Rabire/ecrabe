import { Button } from "@/components/ui/button";
import { TeacherLessonsPageQuery } from "@/src/types/graphql-generated";

const LessonChapters = ({
  lessonData,
}: {
  lessonData: TeacherLessonsPageQuery;
}) => (
  <div>
    <h1>Chapters</h1>
    <Button variant="outline">Ajouter un chapitre</Button>
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
