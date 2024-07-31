import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2Icon } from "lucide-react";

const LibraryPage = () => (
  <main>
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <h1>Vos formations</h1>

      <div className="flex gap-2">
        <Button variant="outline" className="h-9">
          <Settings2Icon size={16} />
          <span>Filtres</span>
        </Button>

        <Input placeholder="Rechercher..." className="h-9" />
      </div>
    </div>

    <div className="bg-green-200">
      TODO: Liste des formations
      <Button asChild>
        <a href="/student/lesson/1">Formation 1</a>
      </Button>
    </div>
  </main>
);

export default LibraryPage;
