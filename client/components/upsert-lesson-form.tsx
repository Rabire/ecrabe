import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  TeacherLessonsPageQuery,
  useUpdateLessonMutation,
} from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileField from "./form-field/file-field";
import TextField from "./form-field/text-field";
import TextAreaField from "./form-field/textarea-field";
import { LoadingWheel } from "./loader";
import MdEditor from "./md-editor";

const schema = z.object({
  description: z.string(),
  title: z.string(),
  markdownContent: z.string(),
  // pictureFile: z.instanceof(File).optional(), // FIXME:
});

type FormSchema = z.infer<typeof schema>;

const UpsertLessonForm = ({
  lessonData,
}: {
  lessonData: TeacherLessonsPageQuery;
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: lessonData.lesson?.description || "",
      title: lessonData.lesson?.title || "",
      markdownContent: lessonData.lesson?.markdownContent || "",
    },
  });

  const [upsert, { loading }] = useUpdateLessonMutation({
    onError: () => null, // TODO: error toast
    onCompleted: () => null, // TODO: success toast
  });

  async function onSubmit(formValues: FormSchema) {
    upsert({ variables: { lessonId, input: { ...formValues } } });
  }

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField name="title" placeholder="Titre" />
        <TextAreaField name="description" placeholder="Description" />

        <MdEditor
          name="markdownContent"
          placeholder="Contenue du cours (Markdown)"
        />

        <FileField
          // TODO: peut mieux faire, avec un apercu de l'image et une dropzone
          name="pictureFile"
          placeholder="Image de couverture"
        />

        <Button disabled={loading} type="submit" className="ml-auto flex">
          <span>Sauvegarder</span>
          {loading ? <LoadingWheel size={16} /> : <SaveIcon size={16} />}
        </Button>
      </form>
    </Form>
  );
};

export default UpsertLessonForm;
