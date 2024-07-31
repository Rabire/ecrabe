import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useSubmitQuizMutation } from "@/src/types/graphql-generated";
import { useChapterPage } from "../context";
import QuizQuestion from "./quiz-question";

const FormSchema = z.record(z.string(), z.string());

const QuizSection = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { chapter, setQuizState } = useChapterPage();

  if (!chapter) throw new Error("No data from useChapterPage");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [submitAnswers, { loading }] = useSubmitQuizMutation({
    onError: () => {
      // errorToast();
    },
    onCompleted: ({ submitQuiz }) => {
      if (submitQuiz.isValid) {
        setQuizState("success");
        // TODO: confetti
        // fireConfettiFromElement(buttonRef.current);
      } else {
        setQuizState("failed");
        submitQuiz.incorrectQuestionsId.forEach((questionId) =>
          form.setError(questionId, {}),
        );
      }
    },
  });

  useEffect(() => {
    if (buttonRef.current) buttonRef.current.disabled = loading;
  }, [loading, buttonRef]);

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (!chapter) throw new Error("No data from useChapterPage");

    const answers = Object.entries(formData).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    submitAnswers({ variables: { chapterId: chapter.id, answers } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-14">
        <h2>Questionnaire</h2>
        {chapter.questions.map((question, index) => (
          <QuizQuestion
            key={question.id}
            question={question}
            buttonRef={
              index === chapter.questions.length - 1 ? buttonRef : undefined
            }
          />
        ))}
      </form>
    </Form>
  );
};

export default QuizSection;
