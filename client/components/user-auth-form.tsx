"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as React from "react";
import { Button } from "./ui/button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  formState: "login" | "register";
}

export function AuthForm({ className, formState, ...props }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {formState === "login" ? "Connectez-vous" : "Bienvenue !"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
            hic odit pariatur.
          </p>
        </div>

        <div className="grid gap-6" {...props}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                {formState === "register" && (
                  <>
                    <Input placeholder="Nom" disabled={isLoading} />
                    <Input placeholder="Prénom" disabled={isLoading} />
                  </>
                )}

                <Input
                  placeholder="Adresse email"
                  type="email"
                  autoCapitalize="none"
                  disabled={isLoading}
                />

                <Input
                  placeholder="Mot de passe"
                  type="password"
                  autoCapitalize="none"
                  disabled={isLoading}
                />

                {formState === "register" && (
                  <>
                    <Input
                      placeholder="Confirmez le mot de passe"
                      type="password"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </>
                )}
              </div>

              <Button disabled={isLoading}>Continuer</Button>
            </div>
          </form>
        </div>

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
  );
}
