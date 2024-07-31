"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Chapter } from "@/src/types/graphql-generated";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  isFloating?: boolean;
  chapter: Pick<
    Chapter,
    | "id"
    | "title"
    | "isVideoWatchedByUser"
    | "isQuizCompletedByUser"
    | "hasQuestions"
  >;
};

const ChapterLink = ({ chapter, isFloating }: Props) => {
  const { lessonId, chapterId } = useParams();

  const {
    id,
    title,
    isVideoWatchedByUser,
    isQuizCompletedByUser,
    hasQuestions,
  } = chapter;

  const isQuestionsOK = isQuizCompletedByUser || !hasQuestions;

  return (
    <div
      className={cn(
        "flex w-full rounded-md px-2 hover:bg-accent",
        chapterId === id && "bg-accent",
      )}
    >
      <Link
        href={`/student/lesson/${lessonId}/${id}`}
        className="flex h-8 w-full items-center"
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <CheckIcon
                size={20}
                className={cn(
                  isVideoWatchedByUser && isQuestionsOK
                    ? "text-primary"
                    : "text-muted-foreground/50",
                )}
              />
            </TooltipTrigger>

            {(isVideoWatchedByUser || isQuestionsOK) && (
              <TooltipContent>
                {isVideoWatchedByUser ? "Vidéo vue" : "Video non vue"}
                <br />
                {hasQuestions &&
                  (isQuizCompletedByUser
                    ? "Quiz complété"
                    : "Quiz non complété")}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <span
          className={cn(
            "ml-2 text-start",
            isFloating && "hidden group-hover:block",
          )}
        >
          {title}
        </span>
      </Link>
    </div>
  );
};

export default ChapterLink;
