"use client";

import { ChapterPageQuery } from "@/src/types/graphql-generated";
import { ApolloError } from "@apollo/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Type = {
  chapter?: ChapterPageQuery["chapter"];
  error?: ApolloError;
  loading: boolean;
  quizState?: "success" | "failed";
  setQuizState: Dispatch<SetStateAction<"success" | "failed" | undefined>>;
};

export const ChapterPageContext = createContext<Type>({
  loading: false,
  setQuizState: () => {},
});

export const ChapterPageProvider = ({ children }: { children: ReactNode }) => {
  // const { chapterId } = useParams<{ chapterId: string }>();
  const [quizState, setQuizState] = useState<"success" | "failed">();

  // const { data, error, loading } = useChapterPageQuery({
  //   variables: { chapterId },
  //   onCompleted: ({ chapter }) => {
  //     if (chapter?.isQuizCompletedByUser) setQuizState("success");
  //   },
  // });

  const [loading, setLoading] = useState(true);
  const error = undefined;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const value = {
    chapter: MOCK_CHAPTER,
    error,
    loading,
    quizState,
    setQuizState,
  };

  return (
    <ChapterPageContext.Provider value={value}>
      {children}
    </ChapterPageContext.Provider>
  );
};

export const useChapterPage = () => {
  const context = useContext(ChapterPageContext);
  return context;
};

const MOCK_CHAPTER = {
  id: "ch1",
  title: "Introduction à la Photographie",
  markdownContent:
    "# Introduction\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n## Les Bases\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  updatedAt: new Date("2024-08-01T12:00:00Z"),
  videoUrl: "https://example.com/videos/intro-to-photography.mp4",
  videoDuration: 930,
  isQuizCompletedByUser: true,
  isVideoWatchedByUser: true,
  userVideoWatchProgress: 100,
  hasQuestions: true,
  lesson: {
    id: "les1",
    title: "Apprendre la Photographie",
    pictureUrl: "https://example.com/images/learn-photography.jpg",
    chapters: [
      {
        id: "ch1",
        title: "Introduction à la Photographie",
        isVideoWatchedByUser: true,
        isQuizCompletedByUser: true,
        hasQuestions: true,
      },
      {
        id: "ch2",
        title: "Les Réglages de Base",
        isVideoWatchedByUser: false,
        isQuizCompletedByUser: false,
        hasQuestions: true,
      },
      {
        id: "ch3",
        title: "Composition et Cadrage",
        isVideoWatchedByUser: false,
        isQuizCompletedByUser: false,
        hasQuestions: false,
      },
    ],
  },
  questions: [
    {
      id: "q1",
      question: "Qu'est-ce que l'exposition en photographie?",
      answers: [
        "La quantité de lumière qui atteint le capteur de l'appareil photo",
        "La distance focale de l'objectif",
        "La vitesse de l'obturateur",
      ],
    },
    {
      id: "q2",
      question: "Quelle est l'utilité de l'ouverture du diaphragme?",
      answers: [
        "Contrôler la quantité de lumière entrant dans l'appareil photo",
        "Régler la distance focale",
        "Déterminer la durée de l'exposition",
      ],
    },
  ],
  comments: [
    {
      id: "c1",
      content: "Très bon chapitre, j'ai beaucoup appris!",
      createdAt: new Date("2024-08-01T14:00:00Z"),
      deletedAt: null,
      author: {
        id: "u1",
        firstName: "Alice",
        lastName: "Dupont",
        fullName: "Alice Dupont",
      },
    },
    {
      id: "c2",
      content: "Je n'ai pas bien compris la partie sur les réglages de base.",
      createdAt: new Date("2024-08-01T15:30:00Z"),
      deletedAt: null,
      author: {
        id: "u2",
        firstName: "Bob",
        lastName: "Martin",
        fullName: "Bob Martin",
      },
    },
  ],
};
