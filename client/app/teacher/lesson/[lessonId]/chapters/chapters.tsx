import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatSeconds } from "@/lib/format-utils";
import { TeacherLessonsPageQuery } from "@/src/types/graphql-generated";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

type Props = { lessonData: TeacherLessonsPageQuery };

/* const handleDeleteChapter = async (chapterId: string) => {
  // TODO: handle delete chapter mutation
}; */

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
              <p>{formatSeconds(chapter.videoDuration || 0)}</p>
              <p>{chapter.questions.length} question(s)</p>

              <div className="flex gap-2">
                <Button asChild>
                  <Link
                    href={`/teacher/lesson/${lessonData.lesson?.id}/chapters/${chapter.id}`}
                  >
                    <span>Éditer</span>
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  /* onClick={() => handleDeleteChapter(chapter.id)} TODO: handle delete chapter mutation */
                  asChild
                >
                  <span>Supprimer</span>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    ))}
  </>
);

export default LessonChapters;
