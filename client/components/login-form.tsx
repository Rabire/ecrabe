import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoginMutation } from "@/src/types/graphql-generated";
import { setTokens } from "@/store/access-token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "./form-field/text-field";
import { toast } from "./ui/use-toast";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof schema>;

const LoginForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const [login, { loading }] = useLoginMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Connexion échouée",
        description: "Identifiants incorrects.",
      });
    },
    onCompleted: ({ loginUser }) => {
      setTokens(loginUser.tokens.accessToken, loginUser.tokens.refreshToken);
      router.push(`/${loginUser.user.role.toLocaleLowerCase()}`);
    },
  });

  async function onSubmit(formValues: FormSchema) {
    login({ variables: formValues });
  }

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <TextField name="email" placeholder="Adresse email" />

            <TextField
              name="password"
              placeholder="Mot de passe"
              type="password"
              description="8 caractères minimum, 1 majuscule, 1 chiffre"
            />
          </div>

          <Button disabled={loading} className="mt-10">
            Continuer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
