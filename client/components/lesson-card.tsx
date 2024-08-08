import { formatPrice } from "@/lib/format-utils";
import { cn } from "@/lib/utils";
import { Lesson } from "@/src/types/graphql-generated";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

type Props = {
  lesson: Pick<
    Lesson,
    | "id"
    | "title"
    | "description"
    | "pictureUrl"
    | "userProgress"
    | "isPurchasedByCurrentUser"
    | "price"
  >;
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
          <div className="relative h-36 overflow-hidden rounded-md bg-accent">
            {lesson.pictureUrl && (
              <Image src={lesson.pictureUrl} alt="Couverture" fill />
            )}
          </div>

          <div>
            <p className="text-base font-medium">{lesson.title}</p>
            <p className="text-sm text-muted-foreground">
              {lesson.description}
            </p>

            {!isTeacher && lesson.isPurchasedByCurrentUser && (
              <div className={cn("mt-2 flex items-center gap-2")}>
                <div className="h-1 w-full overflow-hidden rounded bg-accent">
                  <span
                    className="block h-full bg-primary"
                    style={{ width: `${lesson.userProgress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {lesson.userProgress}%
                </span>
              </div>
            )}

            {!isTeacher && !lesson.isPurchasedByCurrentUser && lesson.price && (
              <p className="mt-2 text-end font-medium">
                {formatPrice(lesson.price)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default LessonCard;
