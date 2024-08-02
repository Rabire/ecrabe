import TextField from "@/components/form-field/text-field";
import { Button } from "@/components/ui/button";
import { FormControl, FormField } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
  questionIndex: number;
  removeQuestion: (index: number) => void;
};

const QuestionForm = ({ questionIndex, removeQuestion }: Props) => {
  const name = `questions.${questionIndex}`;

  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `${name}.answers`,
  });

  return (
    <div className="relative flex flex-col gap-2 rounded-md bg-input/20 p-4 pr-12">
      <TextField name={`${name}.question`} label="Question" />

      {fields.map((answerField, index) => (
        <div key={answerField.id} className="flex items-end gap-4">
          <TextField
            name={`${name}.answers.${index}.answer`}
            label={`Réponse ${index + 1}`}
          />

          <FormField
            control={form.control}
            name={`${name}.answers.${index}.isCorrect`}
            render={({ field }) => (
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            )}
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            Supprimer
          </Button>
        </div>
      ))}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="link"
          onClick={() => append({ answer: "", isCorrect: false })}
        >
          Ajouter une réponse
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={() => removeQuestion(questionIndex)}
        >
          Supprimer la question
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
