import { MdEditor } from "@/components/app_component/MDEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  courseTitle: z.string().min(2).max(100),
  courseText: z.string(),
  courseImageUrl: z.string(),
  courseVideoUrl: z.string(),
});
const AddCoursePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseTitle: "",
      courseText: "",
      courseImageUrl: "",
      courseVideoUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-4/5 p-4 h-[100vh] overflow-y-auto">
      <h1 className="text-2xl font-bold">Ajouter un cours</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ...champs du formulaire... */}
          <FormField
            control={form.control}
            name="courseTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre du cours</FormLabel>
                <FormControl>
                  <Input placeholder="Titre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MdEditor name={"courseText"} label={"Contenue du cours"} />
          <FormField
            control={form.control}
            name="courseImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image du cours</FormLabel>
                <FormControl>
                  <Input placeholder="Image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseVideoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video du cours</FormLabel>
                <FormControl>
                  <Input placeholder="Video" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddCoursePage;
