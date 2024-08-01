"use client";

// imports
import TextField from "@/components/form-field/text-field";
import MdEditor from "@/components/md-editor";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChapterQuery,
  useEditChapterMutation,
} from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import QuestionForm from "../edit/components/question-form";

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
      }),
  ),
  title: z.string().min(1),
  videoDuration: z.coerce.number(),
});

// types

type FormSchema = z.infer<typeof zSchema>;

const EditChapterForm = ({ chapterData }: { chapterData: ChapterQuery }) => {
  useEffect(() => {
    form.reset({
      markdownContent: chapterData.chapter.markdownContent,
      title: chapterData.chapter.title,
      videoDuration: chapterData.chapter.videoDuration || 0,

      questions: chapterData.chapter.questions.map((question) => ({
        question: question.question,
        answers: question.answers.map((answer) => ({
          answer,
          isCorrect: answer === question.correctAnswer,
        })),
      })),
    });
  }, [chapterData]);
  const form = useForm<FormSchema>({
    resolver: zodResolver(zSchema),
    defaultValues: {
      markdownContent: chapterData.chapter.markdownContent,
      questions: chapterData.chapter.questions.map((question) => ({
        question: question.question,
        answers: question.answers.map((answer) => ({
          answer,
          isCorrect: answer === question.correctAnswer,
        })),
      })),
      title: chapterData.chapter.title,
      videoDuration: chapterData.chapter.videoDuration || 0,
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions` as never,
  });

  const [upsertChapter, { loading }] = useEditChapterMutation({
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

  const handleEditChapter = async (formData: FormSchema) => {
    const questions = formData.questions.map((question) => ({
      question: question.question,
      answers: question.answers.map((answer) => answer.answer),
      correctAnswer: question.answers.find((answer) => answer.isCorrect)!
        .answer,
    }));

    upsertChapter({
      variables: {
        lessonId: chapterData.chapter.lesson.id,
        input: { ...formData, questions },
        videoFile,
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEditChapter)}
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
            <Button type="submit">
              {loading ? "Loading..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default EditChapterForm;
