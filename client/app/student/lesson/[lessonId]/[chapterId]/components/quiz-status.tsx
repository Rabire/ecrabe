import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, CheckCircleIcon, XIcon } from "lucide-react";
import { useChapterPage } from "../context";

const QuizStatus = () => {
  const { quizState, setQuizState } = useChapterPage();

  if (!quizState) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-0 text-primary-foreground",
        quizState === "success" && "bg-primary",
        quizState === "failed" && "bg-destructive",
      )}
    >
      {quizState === "success" && <CheckCircleIcon size={20} />}
      {quizState === "failed" && <AlertCircleIcon size={20} />}

      <p>
        <span className="text-base font-semibold">
          {quizState === "success" && "Questionnaire validé ! "}
          {quizState === "failed" && "Essayez encore ! "}
        </span>
        {quizState === "success" && "Bravo, vous avez les bonnes réponses."}
        {quizState === "failed" && "Revisionner la vidéo si necessaire."}
      </p>

      <Button
        variant="outline"
        className="ml-auto text-primary-foreground hover:bg-inherit hover:text-inherit"
        onClick={() => setQuizState(undefined)}
      >
        <XIcon size={20} />
      </Button>
    </div>
  );
};

export default QuizStatus;
