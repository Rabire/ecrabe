import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useLoginUserMutation } from "@/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage = () => {
  const [submitLogin, { loading }] = useLoginUserMutation({
    onCompleted: (data) => {
      console.log(data);
      // TODO: Redirect to the dashboard and store the token in the local storage
      const { accessToken, refreshToken, ...rest } = data.loginUser.tokens;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log({ rest });
      toast({
        title: "Vous-êtes désormais connecté",
      });
    },
    onError: (error) => {
      console.log(error);
      // TODO: Display an error message toast
      toast({
        title: "Erreur lors de la connexion !",
      });
    },
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    submitLogin({ variables: formData });
  }

  return (
    <div className="h-screen w-full flex justify-center">
      <Card className="w-1/3 p-4 m-auto">
        <h1 className="text-2xl font-bold mb-2">Se connecter</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ecrabe-user@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  );
};

export default LoginPage;
