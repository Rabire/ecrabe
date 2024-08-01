import { Lesson } from "@/src/types/graphql-generated";
import { Card, CardContent } from "./ui/card";

type Props = {
  lesson: Pick<
    Lesson,
    "id" | "title" | "description" | "pictureUrl" | "userProgress"
  >;
};

const LessonCard = ({ lesson }: Props) => (
  <a href={`/student/lesson/${lesson.id}`}>
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

export default LessonCard;
