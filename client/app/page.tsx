import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Button asChild>
        <a href="/login">Se connecter / s&apos;inscrire</a>
      </Button>
    </main>
  );
}
