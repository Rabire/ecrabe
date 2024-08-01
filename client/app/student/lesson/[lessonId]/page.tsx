"use client";

import ChapterList from "@/components/chapter-list";
import { useEffect, useState } from "react";
import LessonDetail from "./components/details";
import LessonHeader from "./components/header";
import Loading from "./components/loading";
import SimilarLessons from "./components/similars";

// type PageParams = { params: { lessonId: string } };

const LessonPage = () =>
  // { params }: PageParams
  {
    // const { lessonId } = params;

    // const { data, loading, error } = useLessonPageQuery({
    //   variables: { lessonId },
    // });

    const [loading, setLoading] = useState(true);
    const error = false;

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);

    const data = { lesson: MOCK_LESSON };

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

const MOCK_LESSON = {
  id: "1",
  title: "Apprendre la Photographie",
  description:
    "Une formation complète pour maîtriser les bases et techniques avancées de la photographie.",
  pictureUrl: "https://example.com/images/learn-photography.jpg",
  markdownContent:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nihil in\n\nBienvenue à cette formation sur la photographie. Dans ce cours, vous apprendrez...\n\n## Chapitre 1: Les Bases\n\n### Les réglages de base...\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nihil in fuga ducimus error ratione quo, ut dolore possimus veritatis ea doloribus quia impedit aut consequatur accusamus velit eius veniam iure omnis. Corporis, commodi. Fugiat, voluptatem rerum nostrum delectus necessitatibus molestias exercitationem dignissimos, pariatur repellat quo blanditiis, dolorum optio placeat! Ratione id tempore mollitia consequuntur, doloribus maxime illum deserunt ducimus cumque! Voluptas, quod temporibus inventore ipsum omnis tempora incidunt atque vero nulla maxime dolore reprehenderit quos maiores numquam nam voluptatibus quo quaerat ducimus, eligendi, perferendis iste quia repellendus odio neque. Ipsum expedita nihil, cumque quos, quo eaque explicabo optio eum amet est voluptatum harum voluptatem corrupti numquam incidunt rerum sed repellendus at neque quibusdam. Velit necessitatibus, aliquam amet maxime corporis exercitationem similique assumenda tempore labore eos odio non quam rerum ullam mollitia! Culpa voluptas aliquid esse, rem natus saepe? Repellat impedit culpa, distinctio magnam inventore ducimus deleniti velit maxime tempore!",
  totalDuration: 3800,
  userProgress: 35,
  updatedAt: new Date("2024-07-31T10:00:00Z"),
  teacher: {
    id: "301",
    firstName: "Sophie",
    lastName: "Lemoine",
    fullName: "Sophie Lemoine",
  },
  chapters: [
    {
      id: "1",
      order: 1,
      title: "Introduction à la Photographie",
      isQuizCompletedByUser: true,
      isVideoWatchedByUser: true,
      hasQuestions: true,
    },
    {
      id: "2",
      order: 2,
      title: "Les Réglages de Base",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: true,
      hasQuestions: true,
    },
    {
      id: "3",
      order: 3,
      title: "Composition et Cadrage",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: false,
      hasQuestions: false,
    },
    {
      id: "4",
      order: 4,
      title: "Techniques Avancées",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: false,
      hasQuestions: true,
    },
  ],
};
