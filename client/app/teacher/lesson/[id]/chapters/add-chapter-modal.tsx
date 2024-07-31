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
import { useUpsertChapterMutation } from "@/src/types/graphql-generated";
import { FieldValues, useForm } from "react-hook-form";

const AddChapterModal = ({ lessonId }: { lessonId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [upsertChapter, { loading }] = useUpsertChapterMutation({
    onCompleted: (data) => {
      // console.log(data);
      // rediriger vers la page de la formation
      // router.push(`/teacher/lesson/${data.createLesson.id}`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCreateChapter = async (formData: FieldValues) => {
    try {
      await upsertChapter({
        variables: {
          lessonId,
          input: {
            markdownContent: formData.markdownContent,
            title: formData.title,
            questions: formData.questions,
            videoDuration: formData.videoDuration,
          },
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
        <form onSubmit={handleSubmit(handleCreateChapter)}>
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

export default AddChapterModal;
