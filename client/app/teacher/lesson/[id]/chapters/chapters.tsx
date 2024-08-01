import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{chapter.title}</AccordionTrigger>
              <AccordionContent className="flex justify-between">
                <p>{chapter.videoDuration} h</p>
                <p>{chapter.questions.length} question(s)</p>
                <Button>
                  <Link
                    href={`/teacher/lesson/${lessonData.lesson?.id}/chapters/${chapter.id}`}
                  >
                    Editer
                  </Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  </div>
);

export default LessonChapters;
