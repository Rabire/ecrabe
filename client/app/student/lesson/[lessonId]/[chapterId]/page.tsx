"use client";

import { LoadingText } from "@/components/loader";
import ChapterContent from "./components/content";
import { useChapterPage } from "./context";

const ChapterPage = () => {
  const { chapter, error, loading } = useChapterPage();

  return (
    <main className="relative mx-auto max-w-4xl grow space-y-6 px-4 pb-4 sm:px-5 sm:pb-5">
      <div
        style={{ zIndex: 100 }}
        className="sticky top-16 border-b bg-background py-4 lg:top-0"
      >
        <h1>{chapter?.title || <LoadingText charLength={35} />}</h1>
        <a
          href={`/lesson/${chapter?.lesson.id}`}
          className="text-muted-foreground hover:underline"
        >
          {chapter?.lesson.title || <LoadingText charLength={60} />}
        </a>
      </div>

      {error && (
        <p className="error">
          Une erreur est survenue lors de la récupération du chapitre.
        </p>
      )}

      {loading && (
        <>
          <div className="aspect-video animate-pulse bg-muted-foreground opacity-20" />
          <p>
            <LoadingText charLength={350} />
          </p>
          <p>
            <LoadingText charLength={550} />
          </p>
        </>
      )}

      {chapter && <ChapterContent />}
    </main>
  );
};

export default ChapterPage;
