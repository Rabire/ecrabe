import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

type Props = { lessonData: TeacherLessonsPageQuery };

const LessonChapters = ({ lessonData }: Props) => (
  <>
    <h1 className="mb-4">Chapitres</h1>

    <div>
      <Button asChild>
        <Link href={`/teacher/lesson/${lessonData.lesson?.id}/chapters/edit`}>
          <PlusIcon size={16} />
          <span>Ajouter un chapitre</span>
        </Link>
      </Button>
    </div>

    {lessonData.lesson?.chapters.length === 0 && (
      <p className="text-center italic text-muted-foreground">
        Aucun chapitre dans cette formation pour le moment.
      </p>
    )}

    {lessonData.lesson?.chapters.map((chapter) => (
      <div key={chapter.id}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{chapter.title}</AccordionTrigger>
            <AccordionContent className="flex justify-between">
              <p>{chapter.videoDuration} h</p>
              <p>{chapter.questions.length} question(s)</p>

              <Button asChild>
                <Link
                  href={`/teacher/lesson/${lessonData.lesson?.id}/chapters/${chapter.id}`}
                >
                  <span>Éditer</span>
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ))}
  </>
);

export default LessonChapters;
