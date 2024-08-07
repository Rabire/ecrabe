import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRegisterMutation } from "@/src/types/graphql-generated";
import { setTokens } from "@/store/access-token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "./form-field/text-field";
import { toast } from "./ui/use-toast";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    const has8Characters = password.length >= 8;

    if (
      !containsUppercase ||
      !containsLowercase ||
      !containsNumber ||
      !has8Characters
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
      });
    }

    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPassword"],
      });
    }
  }); // TODO: export schema to a new file

type FormSchema = z.infer<typeof schema>;

const RegisterForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const [register, { loading }] = useRegisterMutation({
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer.",
      });
    },
    onCompleted: ({ registerUser }) => {
      setTokens(
        registerUser.tokens.accessToken,
        registerUser.tokens.refreshToken,
      );
      router.push(`/${registerUser.user.role.toLocaleLowerCase()}`);
      toast({
        title: "Votre compte a été créé avec succès.",
      });
    },
  });

  const onSubmit = (formValues: FormSchema) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = formValues;
    register({ variables: { input: rest } });
  };

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <TextField name="firstName" placeholder="Prénom" />

            <TextField name="lastName" placeholder="Nom" />

            <TextField name="email" placeholder="Adresse email" />

            <TextField
              name="password"
              placeholder="Mot de passe"
              type="password"
              description="8 caractères minimum, 1 majuscule, 1 chiffre"
            />

            <TextField
              name="confirmPassword"
              placeholder="Confirmez le mot de passe"
              type="password"
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

export default RegisterForm;
