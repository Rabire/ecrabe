"use client";

import TextField from "@/components/form-field/text-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useCreateLessonMutation } from "@/src/types/graphql-generated";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

const CreateLessonModal = () => {
  const router = useRouter();
  const form = useForm();

  const [createLesson, { loading }] = useCreateLessonMutation({
    onCompleted: (data) => {
      router.push(`/teacher/lesson/${data.createLesson.id}`);
    },
    onError: (error) => {
      console.error(error);
      // TODO: handle error with toast
    },
  });

  const handleCreateLesson = async (formData: FieldValues) => {
    await createLesson({ variables: { title: formData.title } });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nouvelle formation</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une formation</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateLesson)}
            className="space-y-4"
          >
            <TextField name="title" label="Titre" />

            <DialogFooter>
              <Button type="submit">{loading ? "Loading..." : "Créer"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLessonModal;
