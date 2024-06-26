"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUpsertLessonMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileField from "./form-field/file-field";
import TextField from "./form-field/text-field";
import TextAreaField from "./form-field/textarea-field";

const schema = z.object({
  description: z.string(),
  title: z.string(),
  markdownContent: z.string(),
  //pictureFile: z.instanceof(File).optional(),
});

type FormSchema = z.infer<typeof schema>;

const UpsertLessonForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  console.log(form.formState.errors);
  const [upsert, { loading }] = useUpsertLessonMutation({
    onError: () => null, // TODO: error toast
    onCompleted: () => {
      // TODO: success toast
      // TODO: redirect
    },
  });

  async function onSubmit(formValues: FormSchema) {
    upsert({ variables: { input: { ...formValues } } });
  }

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <TextField name="title" placeholder="Titre" />
            <TextAreaField name="description" placeholder="Description" />
            <TextAreaField
              name="markdownContent"
              placeholder="Contenue du cours (Markdown)"
            />

            <FileField name="pictureFile" placeholder="Image de couverture" />
          </div>

          <Button disabled={loading}>Continuer</Button>
        </div>
      </form>
    </Form>
  );
};

export default UpsertLessonForm;
