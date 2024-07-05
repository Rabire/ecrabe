"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/store/access-token";

export default function StudentHome() {
  return (
    <main>
      <h1>Student home page</h1>

      <Button asChild>
        <a href="/teacher">Devenir formateur</a>
      </Button>
      <Button variant="ghost" onClick={logout}>
        Déconnexion
      </Button>
    </main>
  );
}
