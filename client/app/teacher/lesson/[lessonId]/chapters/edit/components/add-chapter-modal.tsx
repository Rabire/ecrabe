"use client";

import TextField from "@/components/form-field/text-field";
import MdEditor from "@/components/md-editor";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpsertChapterMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import QuestionForm from "./question-form";

export const zQuestion = z
  .object({
    question: z.string().min(1).default(""),
    answers: z
      .array(
        z.object({
          answer: z.string().min(1),
          isCorrect: z.boolean().default(false),
        }),
      )
      .min(2),
  })
  .refine(({ answers }) => {
    const correctAnswerArray = answers.filter((answer) => answer.isCorrect);
    return correctAnswerArray.length === 1;
  });

export const zCreateChapter = z.object({
  title: z.string().min(1).default(""),
  markdownContent: z.string().nullable(),
  videoDuration: z.number(),
  questions: z.array(zQuestion),
});

type FormSchema = z.infer<typeof zCreateChapter>;

// TODO: On ne se sert de co composant nul part ?
const AddChapterModal = ({ lessonId }: { lessonId: string }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(zCreateChapter),
    defaultValues: {
      title: "",
      markdownContent: "",
      videoDuration: 0,
      questions: [],
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions`,
  });

  const [upsertChapter, { loading }] = useUpsertChapterMutation({
    onCompleted: () => {
      // console.log(data);
      // rediriger vers la page de la formation
      // router.push(`/teacher/lesson/${data.createLesson.id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCreateChapter = async (formData: FieldValues) => {
    /*  */
    const formattedQuestions = formData.questions.map((question: any) => {
      const correctAnswer = question.answers.find(
        (answer: any) => answer.isCorrect,
      );
      return {
        question: question.question,
        answers: question.answers.map((answer: any) => answer.answer),
        correctAnswer: correctAnswer?.answer,
      };
    });
    const videoDuration = parseInt(formData.videoDuration, 10);
    const newFormData = {
      ...formData,
      questions: formattedQuestions,
      videoDuration,
      videoFile,
    } as FieldValues;

    console.log(videoFile);

    await upsertChapter({
      variables: {
        lessonId,
        input: {
          markdownContent: formData.markdownContent,
          title: newFormData.title,
          questions: newFormData.questions,
          videoDuration: newFormData.videoDuration,
        },
        videoFile: newFormData.videoFile,
      },
    });
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setVideoFile(files[0]);
    }
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
          <TextField name="videoDuration" label="Durée de la vidéo" />
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

export default AddChapterModal;
