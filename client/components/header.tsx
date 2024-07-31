import { Button } from "@/components/ui/button";
import { BookMarkedIcon, HomeIcon, LibraryBig } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-40 bg-background/80 shadow-sm backdrop-blur-sm">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3">
      <div className="bold bg-primary px-4 font-bold text-primary-foreground">
        LOGO
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline">
          <a href="/teacher">
            <HomeIcon size={16} />
            <span>Accueil</span>
          </a>
        </Button>

        <Button asChild variant="outline">
          <a href="/teacher">
            <BookMarkedIcon size={16} />
            <span>Devenir formateur</span>
          </a>
        </Button>

        <Button asChild variant="outline">
          <a href="/teacher">
            <LibraryBig size={16} />
            <span>Bibliothèque</span>
          </a>
        </Button>
      </div>

      <button>Rabire HAKIM</button>

      {/* THEME */}

      {/* <Button asChild variant="outline">
          <a href="/teacher">Devenir formateur</a>
        </Button> */}

      {/* Mon profile */}

      {/* Mes certifications */}

      {/* <Button variant="ghost" onClick={logout}>
        Déconnexion
      </Button> */}
    </div>
  </header>
);

export default Header;
