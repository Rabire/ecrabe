"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useCreateLessonMutation } from "@/src/types/graphql-generated";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

const CreateLessonModal = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createLesson, { loading }] = useCreateLessonMutation({
    onCompleted: (data) => {
      // console.log(data);
      // rediriger vers la page de la formation
      router.push(`/teacher/lesson/${data.createLesson.id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCreateLesson = async (formData: FieldValues) => {
    try {
      await createLesson({
        variables: {
          title: formData.title,
        },
      });
    } catch (error) {
      console.error(error);
    }
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
        <form onSubmit={handleSubmit(handleCreateLesson)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input
                id="title"
                {...register("title", { required: true })}
                className="col-span-3"
              />
              {errors.title && (
                <p className="text-red-500">Le titre est requis</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{loading ? "Loading..." : "Créer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLessonModal;
