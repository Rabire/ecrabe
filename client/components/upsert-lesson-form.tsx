import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useUpdateLessonMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileField from "./form-field/file-field";
import TextField from "./form-field/text-field";
import TextAreaField from "./form-field/textarea-field";

const schema = z.object({
  description: z.string(),
  title: z.string(),
  markdownContent: z.string(),
  // pictureFile: z.instanceof(File).optional(),
});

type FormSchema = z.infer<typeof schema>;

const UpsertLessonForm = () => {
  const { id } = useParams();
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const [upsert, { loading }] = useUpdateLessonMutation({
    onError: () => null, // TODO: error toast
    onCompleted: () => null, // TODO: success toast
  });

  async function onSubmit(formValues: FormSchema) {
    upsert({ variables: { lessonId: id as string, input: { ...formValues } } });
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
