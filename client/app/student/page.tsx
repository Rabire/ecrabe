import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2Icon } from "lucide-react";

export default function StudentHome() {
  return (
    <main>
      <section>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:justify-end">
          <h2 className="flex-grow">Vos formations</h2>

          <div className="flex gap-2">
            <Button variant="outline" className="h-9">
              <Settings2Icon size={16} />
              <span>Filtres</span>
            </Button>

            <Input placeholder="Rechercher..." className="h-9" />
          </div>
        </div>

        <div className="h-40 bg-green-200">
          Slider formations souscrites/achetées
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:justify-end">
          <h2 className="flex-grow">Découvrir nos formations en ligne</h2>

          <div className="flex gap-2">
            <Button variant="outline" className="h-9">
              <Settings2Icon size={16} />
              <span>Filtres</span>
            </Button>

            <Input placeholder="Rechercher..." className="h-9" />
          </div>
        </div>

        <div className="h-40 bg-green-200">Liste des formations</div>
      </section>
    </main>
  );
}
