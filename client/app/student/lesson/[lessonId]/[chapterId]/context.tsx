"use client";

import {
  ChapterPageQuery,
  useChapterPageQuery,
} from "@/src/types/graphql-generated";
import { ApolloError } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
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
  const { chapterId } = useParams<{ chapterId: string }>();
  const [quizState, setQuizState] = useState<"success" | "failed">();

  const { data, error, loading } = useChapterPageQuery({
    variables: { chapterId },
    onCompleted: ({ chapter }) => {
      if (chapter?.isQuizCompletedByUser) setQuizState("success");
    },
  });

  const value = {
    chapter: data?.chapter,
    data,
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
