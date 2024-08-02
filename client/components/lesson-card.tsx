import { Lesson } from "@/src/types/graphql-generated";
import { Card, CardContent } from "./ui/card";

type Props = {
  lesson: Pick<Lesson, "id" | "title" | "description" | "pictureUrl">;
  isTeacher?: boolean;
};

const LessonCard = ({ lesson, isTeacher }: Props) => {
  const url = isTeacher
    ? `/teacher/lesson/${lesson.id}`
    : `/student/lesson/${lesson.id}`;

  return (
    <a href={url}>
      <Card clickable className="h-full">
        <CardContent className="space-y-4 p-3">
          {/* <Image
          src={lesson.pictureUrl}
          alt="Couverture de la leçon"
          className="h-36 rounded-md"
        /> */}
          <div className="h-36 rounded-md bg-accent" />

          <div>
            <p className="text-base font-medium">{lesson.title}</p>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default LessonCard;
