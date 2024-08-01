import { LoadingWheel } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Question } from "@/src/types/graphql-generated";
import { RefObject } from "react";
import { useFormContext } from "react-hook-form";
import { useChapterPage } from "../context";
import QuizStatus from "./quiz-status";

type Props = {
  buttonRef?: RefObject<HTMLButtonElement>;
  question: Pick<Question, "id" | "question" | "answers">;
};

const QuizQuestion = ({ buttonRef, question }: Props) => {
  const form = useFormContext();

  const { quizState } = useChapterPage();

  return (
    <div className="space-y-2 border-l-2 border-primary px-4 pb-2">
      <p className="text-base font-medium text-primary">{question.question}</p>

      <FormField
        control={form.control}
        name={question.id}
        render={({ field }) => (
          <FormItem className={cn(buttonRef && "pb-3")}>
            <FormControl>
              <RadioGroup onValueChange={field.onChange}>
                {question.answers.map((option) => (
                  <FormItem
                    key={option}
                    className="flex flex-row items-center gap-2"
                  >
                    <FormControl>
                      <RadioGroupItem value={option} />
                    </FormControl>
                    <FormLabel className="grow cursor-pointer">
                      {option}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {buttonRef && quizState !== "success" && (
        <Button ref={buttonRef} type="submit" className="group">
          <span>Valider le questionnaire</span>
          <LoadingWheel className="hidden group-disabled:block" />
        </Button>
      )}

      {buttonRef && <QuizStatus />}
    </div>
  );
};

export default QuizQuestion;
