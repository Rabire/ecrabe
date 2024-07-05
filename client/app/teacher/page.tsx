"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/store/access-token";

export default function TeacherHome() {
  return (
    <main>
      <h1>Teacher home page</h1>

      <Button>Nouvelle formation</Button>

      <Button variant="outline" asChild>
        <a href="/teacher/lesson/1">Formation 1</a>
      </Button>

      <Button variant="outline" asChild>
        <a href="/teacher/lesson/2">Formation 2</a>
      </Button>

      <Button variant="ghost" onClick={logout}>
        Déconnexion
      </Button>
    </main>
  );
}
