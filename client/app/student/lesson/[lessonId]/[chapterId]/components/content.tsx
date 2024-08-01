import ChapterList from "@/components/chapter-list";
import MdRenderer from "@/components/md-renderer";
import { Button } from "@/components/ui/button";
import { useSaveVideoProgressMutation } from "@/src/types/graphql-generated";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useChapterPage } from "../context";
import QuizSection from "./quiz-section";
import VideoPlayer from "./video-player";

// type Props = { chapter: ChapterPageQuery["chapter"] };

const ChapterContent = () => {
  const { chapter } = useChapterPage();

  const [saveProgress] = useSaveVideoProgressMutation();

  if (!chapter) throw new Error("No data from useChapterPage");

  const { chapters } = chapter.lesson;
  const currentChapterIndex = chapters.findIndex(({ id }) => id === chapter.id);

  const prevChapterId = chapters[currentChapterIndex - 1]?.id;
  const nextChapterId = chapters[currentChapterIndex + 1]?.id;

  const onVideoProgress = (currentTime: number) =>
    saveProgress({
      variables: { chapterId: chapter.id, watchedUntil: currentTime },
    });

  return (
    <>
      {chapter.videoUrl && (
        <VideoPlayer
          url={chapter.videoUrl}
          poster={chapter.lesson.pictureUrl || undefined}
          hightestCheckpoint={chapter.userVideoWatchProgress}
          isRestricted={false} // TODO: chapter.lesson.isRestricted or Qualiopi
          onProgress={onVideoProgress}
        />
      )}

      <MdRenderer text={chapter?.markdownContent} />

      {chapter.hasQuestions && <QuizSection />}

      <ChapterList isFloating chapters={chapters} />

      <div className="flex flex-col justify-between sm:flex-row">
        <Button variant="outline" asChild>
          <a href={`/lesson/${chapter.lesson.id}/${prevChapterId || ""}`}>
            <ArrowLeftIcon size={20} />
            <span>Chapitre précedent</span>
          </a>
        </Button>

        <Button asChild>
          <a href={`/lesson/${chapter.lesson.id}/${nextChapterId || ""}`}>
            <span>Chapitre suivant</span>
            <ArrowRightIcon size={20} />
          </a>
        </Button>
      </div>

      <div>
        <h2 className="mb-1">Partagez commentaires et posez vos questions.</h2>
        <p className="text-muted-foreground">
          Vos retours nous aident à nous améliorer ! Si vous êtes bloqué ou
          confus, faites-le nous savoir.
        </p>
      </div>

      {/* TODO:  comment section */}
      {/* <CommentsSection
        comments={chapter.comments}
        linkedEntityId={{ chapterId: chapter.id }}
      /> */}
    </>
  );
};

export default ChapterContent;
