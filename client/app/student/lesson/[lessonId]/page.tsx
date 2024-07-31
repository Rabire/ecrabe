"use client";

import ChapterList from "@/components/chapter-list";
import { useLessonPageQuery } from "@/src/types/graphql-generated";
import LessonDetail from "./components/details";
import LessonHeader from "./components/header";
import Loading from "./components/loading";
import SimilarLessons from "./components/similars";

type PageParams = { params: { lessonId: string } };

const LessonPage = ({ params }: PageParams) => {
  const { lessonId } = params;

  const { data, loading, error } = useLessonPageQuery({
    variables: { lessonId },
  });

  return (
    <main>
      {loading && <Loading />}

      {error && (
        <p className="error">
          Impossible de récupérer la formation. Veuillez réessayer plus tard.
        </p>
      )}

      {data && (
        <>
          <LessonHeader lesson={data.lesson} />

          <div className="grid grid-cols-2 gap-2">
            <LessonDetail lesson={data.lesson} />

            <div>
              <div className="space-y-4 md:order-last">
                <h2>Chapitres</h2>
                <ChapterList chapters={data.lesson.chapters} />
              </div>
            </div>
          </div>

          <SimilarLessons lessons={[]} />
        </>
      )}
    </main>
  );
};

export default LessonPage;
