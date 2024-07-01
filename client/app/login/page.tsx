"use client";

import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import { Button } from "@/components/ui/button";
import apolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

export default function AuthenticationPage() {
  const [formState, setFormState] = useState<"login" | "register">("login");

  return (
    <ApolloProvider client={apolloClient}>
      <main className="container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          className="absolute right-4 top-4 md:right-8 md:top-8"
          variant="ghost"
          onClick={() =>
            setFormState((prev) => (prev === "login" ? "register" : "login"))
          }
        >
          {formState === "login" ? "Créer un compte" : "Se connecter"}
        </Button>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            e-crabe
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>

        {/* <AuthForm formState={formState} /> */}

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {formState === "login" ? "Connectez-vous" : "Bienvenue !"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nostrum hic odit pariatur.
              </p>
            </div>

            {formState === "login" ? <LoginForm /> : <RegisterForm />}

            <p className="px-8 text-center text-sm text-muted-foreground">
              En cliquant sur continuer, vous acceptez nos{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Conditions d&apos;utilisation
              </Link>{" "}
              et notre{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </ApolloProvider>
  );
}
