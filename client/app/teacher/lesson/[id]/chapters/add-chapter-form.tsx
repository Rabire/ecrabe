"use client";

// imports
import TextField from "@/components/form-field/text-field";
import MdEditor from "@/components/md-editor";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpsertChapterMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import QuestionForm from "./add-question";

// zod schema
const zSchema = z.object({
  markdownContent: z.string().nullable(),
  questions: z.array(
    z
      .object({
        answers: z.array(
          z.object({
            answer: z.string().min(1, {
              message: "Franjijo 3eichik met au moins un charactère",
            }),
            isCorrect: z.boolean().default(false),
          }),
        ),
        question: z
          .string()
          .min(1, { message: "Franjijo 3eichik met au moins un charactère" }),
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

// types

type FormSchema = z.infer<typeof zSchema>;

const AddChapterForm = ({ lessonId }: { lessonId: string }) => {
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
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
  };

  // console.log(form.formState.errors);

  const handleCreateChapter = async (formData: FormSchema) => {
    /* console.log(videoFile);
    console.log(lessonId);
    console.log(formData); */
    upsertChapter({
      variables: { lessonId, input: formData, videoFile },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateChapter)}
          className="space-y-4"
        >
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
            onClick={() => append({ question: "", answers: [] })}
          >
            Ajouter une question
          </Button>

          <DialogFooter>
            <Button type="submit">{loading ? "Loading..." : "Créer"}</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default AddChapterForm;
