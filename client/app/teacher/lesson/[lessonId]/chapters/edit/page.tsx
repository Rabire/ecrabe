"use client";

import TextField from "@/components/form-field/text-field";
import { LoadingWheel } from "@/components/loader";
import MdEditor from "@/components/md-editor";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpsertChapterMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import QuestionForm from "./components/question-form";

const zSchema = z.object({
  markdownContent: z.string().nullable(),
  questions: z.array(
    z
      .object({
        answers: z.array(
          z.object({
            answer: z.string().min(1),
            isCorrect: z.boolean().default(false),
          }),
        ),
        question: z.string().min(1),
      })
      .refine(({ answers }) => {
        const correctAnswerArray = answers.filter((answer) => answer.isCorrect);
        return correctAnswerArray.length === 1;
      })
      .transform((data) => ({
        question: data.question,
        answers: data.answers.map((answer) => answer.answer),
        correctAnswer: data.answers.find((answer) => answer.isCorrect)!.answer,
      })),
  ),
  title: z.string().min(1),
  videoDuration: z.coerce.number(),
});

type FormSchema = z.infer<typeof zSchema>;

const EditChapterPage = ({ params }: { params: { lessonId: string } }) => {
  const { lessonId } = params;

  const form = useForm<FormSchema>({
    resolver: zodResolver(zSchema),
    defaultValues: {
      markdownContent: "",
      questions: [],
      title: "",
      videoDuration: 0,
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions` as never,
  });

  const [upsertChapter, { loading }] = useUpsertChapterMutation({
    onCompleted: () => {
      // TODO: do something onCompleted
    },
    onError: () => {
      // TODO: errorToast
    },
  });

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  };

  const handleSubmit = async (formData: FormSchema) => {
    await upsertChapter({
      variables: { lessonId, input: formData, videoFile },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TextField name="title" label="Titre" />
          <MdEditor name="markdownContent" label="Contenu" />

          <TextField
            type="number"
            name="videoDuration"
            label="Durée de la vidéo"
            // TODO: change to number field
          />

          <Input
            type="file"
            name="videoFile"
            onChange={handleVideoFileChange}
          />
          <p>{videoFile?.name}</p>

          {/* Ajouter des questions */}
          {fields.map((questionField, index) => (
            <QuestionForm
              key={questionField.id}
              questionIndex={index}
              removeQuestion={() => remove(index)}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ question: "", answers: [] })}
          >
            <PlusIcon size={16} />
            <span>Ajouter une question</span>
          </Button>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              <span>Créer le chapitre</span>
              {loading ? <LoadingWheel size={16} /> : <SaveIcon size={16} />}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};
export default EditChapterPage;
