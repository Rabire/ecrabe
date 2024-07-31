import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./logo";
import MenuDropdown from "./menu-dropdown";
import MenuElements from "./menu-elements";

const BurgerSideBar = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" className="block md:hidden">
        <MenuIcon size={24} />
      </Button>
    </SheetTrigger>

    <SheetContent className="flex flex-col justify-between gap-6 pt-32">
      <Logo />
      <MenuElements className="flex flex-col gap-4" />
      <MenuDropdown className="flex-row-reverse justify-center" />
    </SheetContent>
  </Sheet>
);

export default BurgerSideBar;
