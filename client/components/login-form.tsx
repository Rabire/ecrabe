"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLoginMutation } from "@/src/types/graphql-generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextField from "./form-field/text-field";

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
    onError: (error) => console.log("error login", error), // TODO: error toast
    onCompleted: (data) => {
      console.log("login success", data);
      localStorage.setItem("accessToken", data.loginUser.tokens.accessToken);
      localStorage.setItem("refreshToken", data.loginUser.tokens.refreshToken);
      if (data.loginUser.user.role === "STUDENT") {
        router.push("/student");
      } else {
        router.push("/teacher");
      }
      // TODO: success toast
      // TODO: redirect
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

          <Button disabled={loading}>Continuer</Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
