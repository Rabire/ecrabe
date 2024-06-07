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
import { useRegisterUserMutation } from "@/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  confirmPassword: z.string().min(6),
  password: z.string().min(6),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitRegister, { loading }] = useRegisterUserMutation({
    onCompleted: (data) => {
      console.log(data);
      navigate("/login");
      // TODO: Redirect to the loginPage and display a success message toast
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Erreur lors de l'inscription",
      });

      // TODO: Display an error message toast
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    if (formData.email !== formData.confirmEmail) {
      return alert("Emails do not match");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    const { confirmEmail, confirmPassword, ...rest } = formData; // Remove the 'confirmEmail' and 'confirmPassword' properties from the 'formData' object

    submitRegister({ variables: { input: rest } }); // Add the 'input' property to the 'submitRegister' function call
  }

  return (
    <div className="h-screen w-full flex justify-center">
      <Toaster />
      <Card className="w-1/3 p-4 m-auto">
        <h1 className="text-2xl font-bold mb-2">S'inscrire</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="confirmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer votre email</FormLabel>
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer votre mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
    </div>
  );
};

export default RegisterPage;
