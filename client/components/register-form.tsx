"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRegisterMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "./form-field/text-field";

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
  });

type FormSchema = z.infer<typeof schema>;

const RegisterForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const [register, { loading }] = useRegisterMutation({
    onError: () => null, // TODO: error toast
    onCompleted: () => {
      // TODO: success toast
      // TODO: redirect
    },
  });

  async function onSubmit(formValues: FormSchema) {
    register({ variables: { input: formValues } });
  }

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

          <Button disabled={loading}>Continuer</Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
