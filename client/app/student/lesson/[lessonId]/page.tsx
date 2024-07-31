import ChapterList from "@/components/chapter-list";
import { LessonPageQuery } from "@/src/types/graphql-generated";
import LessonDetail from "./components/details";
import LessonHeader from "./components/header";
import SimilarLessons from "./components/similars";

const MOCK_LESSON: LessonPageQuery["lesson"] = {
  id: "1",
  chapters: [
    {
      id: "1",
      order: 1,
      title: "Chapitre 1",
      isQuizCompletedByUser: true,
      isVideoWatchedByUser: true,
      hasQuestions: true,
    },
    {
      id: "2",
      order: 2,
      title: "Chapitre 2",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: true,
      hasQuestions: true,
    },
    {
      id: "3",
      order: 3,
      title: "Chapitre 3",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: false,
      hasQuestions: true,
    },
    {
      id: "4",
      order: 4,
      title: "Chapitre 4",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: false,
      hasQuestions: true,
    },
    {
      id: "5",
      order: 5,
      title: "Chapitre 5",
      isQuizCompletedByUser: false,
      isVideoWatchedByUser: false,
      hasQuestions: true,
    },
  ],
  title: "Lorem ipsum dolor sit amet consectetur",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam in nostrum perspiciatis doloribus est quo pariatur, dolore aut ipsam ipsa.",
  pictureUrl: "https://via.placeholder.com/300",
  totalDuration: 600,
  markdownContent:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum blanditiis repellendus minima nostrum, totam veniam voluptas, beatae id corrupti alias sint voluptatum animi. Fugit autem eius a eveniet magni fugiat, asperiores reiciendis similique aperiam excepturi! Dolorum aperiam adipisci alias nisi!",
  teacher: {
    fullName: "Rabire Hakim",
    firstName: "Rabire",
    lastName: "Hakim",
    id: "1",
  },
  userProgress: 50,
  updatedAt: new Date(),
};

type PageParams = { params: { lessonId: string } };

const LessonPage = ({ params }: PageParams) => {
  const { lessonId } = params;

  console.log(`TODO: fetch lesson ${lessonId}`);

  return (
    <main>
      <LessonHeader lesson={MOCK_LESSON} />

      <div className="grid grid-cols-2 gap-2">
        <LessonDetail lesson={MOCK_LESSON} />

        <div>
          <div className="space-y-4 md:order-last">
            <h2>Chapitres</h2>
            <ChapterList chapters={MOCK_LESSON.chapters} />
          </div>
        </div>
      </div>

      <SimilarLessons lessons={[]} />
    </main>
  );
};

export default LessonPage;
