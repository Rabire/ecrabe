import ChapterList from "@/components/chapter-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatSeconds } from "@/lib/format-utils";
import { LessonPageQuery } from "@/src/types/graphql-generated";
import { ArrowRight, BookIcon, CalendarIcon, TimerIcon } from "lucide-react";
import Link from "next/link";

type PageParams = { params: { lessonId: string } };

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

const LessonPage = ({ params }: PageParams) => (
  <main>
    <Card>
      <CardContent className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <img
          src={MOCK_LESSON.pictureUrl || undefined}
          alt="Couverture de la leçon"
          className="max-h-52 rounded-lg md:order-last md:h-auto"
        />

        <CardHeader className="space-y-4">
          <CardTitle>
            {MOCK_LESSON.title} {params.lessonId}
            {/* {lesson?.title || <TextLoader />} */}
          </CardTitle>
          <CardDescription>
            {MOCK_LESSON.description}
            {/* {lesson?.description || <TextLoader charLength={115} />} */}
          </CardDescription>

          <Button asChild>
            <Link href="/#" className="mr-auto">
              <span>
                Commencer
                {/* TODO: "reprendre" si débuté */}
              </span>
              <ArrowRight size={20} />
            </Link>
          </Button>
        </CardHeader>
      </CardContent>
    </Card>

    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-4">
        <h2>Détails</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon size={20} />
            <p>Mis à jour le {formatDate(MOCK_LESSON.updatedAt)}</p>
          </div>

          <div className="flex items-center gap-2">
            <BookIcon size={20} />
            <p>{MOCK_LESSON.chapters.length} chapitres</p>
          </div>

          <div className="flex items-center gap-2 pb-4">
            <TimerIcon size={20} />
            <p>Durée de {formatSeconds(MOCK_LESSON.totalDuration)}</p>
          </div>
        </div>

        {/* TODO: MdRenderer */}
        {/* <MdRenderer text={lesson.markdownContent} /> */}
        <p>{MOCK_LESSON.markdownContent}</p>

        <h2>Formateur</h2>
        <p>TODO: UserInfo</p>
        {/* <UserInfo user={lesson.teacher} /> */}
      </div>

      <div>
        <div className="space-y-4 md:order-last">
          <h2>Chapitres</h2>
          <ChapterList chapters={MOCK_LESSON.chapters} />
        </div>
      </div>
    </div>

    {/* {lesson.similarLessons.length > 0 && ( */}
    <div className="space-y-4">
      <h2>Formations similaires</h2>

      {/* <CardsCarousel
        items={lesson.similarLessons.map((item) => (
          <LessonCard key={item.id} lesson={item} />
        ))}
        itemClassName="basis-full sm:basis-1/2 xl:basis-1/3"
      /> */}
    </div>
    {/* )} */}
  </main>
);

export default LessonPage;
