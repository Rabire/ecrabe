import { cn } from "@/lib/utils";
import { Chapter } from "@/src/types/graphql-generated";
import ChapterLink from "./chapter-link";
import { Card, CardContent } from "./ui/card";

type Props = {
  isFloating?: boolean;

  chapters: Pick<
    Chapter,
    | "id"
    | "title"
    | "isVideoWatchedByUser"
    | "isQuizCompletedByUser"
    | "hasQuestions"
  >[];
};

const ChapterList = ({ chapters, isFloating }: Props) => (
  <Card
    style={{ zIndex: 100 }}
    className={cn(
      isFloating && "group fixed right-4 top-16 shadow-md lg:top-0",
    )}
  >
    <CardContent className="space-y-0.5 p-1">
      {chapters.length === 0 && <p className="muted p-2">Aucun chapitre.</p>}

      {chapters.map((chapter) => (
        <ChapterLink
          key={chapter.id}
          chapter={chapter}
          isFloating={isFloating}
        />
      ))}
    </CardContent>
  </Card>
);

export default ChapterList;
