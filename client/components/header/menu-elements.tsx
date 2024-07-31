import { cn } from "@/lib/utils";
import { BookMarkedIcon, HomeIcon, LibraryBig } from "lucide-react";
import { Button } from "../ui/button";

type Props = { className?: string };

const MenuElements = ({ className }: Props) => (
  <div className={cn("gap-2", className)}>
    <Button asChild variant="outline">
      <a href="/teacher">
        <HomeIcon size={16} />
        <span>Accueil</span>
      </a>
    </Button>

    <Button asChild variant="outline">
      <a href="/student/library">
        <BookMarkedIcon size={16} />
        <span>Bibliothèque</span>
      </a>
    </Button>

    <Button asChild variant="outline">
      <a href="/student/shop">
        <LibraryBig size={16} />
        <span>Librairie</span>
      </a>
    </Button>
  </div>
);

export default MenuElements;
