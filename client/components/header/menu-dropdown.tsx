import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/store/access-token";
import {
  CreditCardIcon,
  GraduationCapIcon,
  LogOutIcon,
  MoonIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import AvatarBubble from "../avatar-bubble";

const MOCK_USER = {
  firstName: "Rabire",
  lastName: "Hakim",
  fullName: "Rabire Hakim",
};

type Props = { className?: string };

const MenuDropdown = ({ className }: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn(
        "flex items-center gap-2 rounded-full pl-4 text-sm hover:bg-accent",
        className,
      )}
    >
      {MOCK_USER.fullName}
      <AvatarBubble user={MOCK_USER} />
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem asChild>
        <Link href="/profile">
          <User2Icon size={16} />
          <span className="ml-2">Profil</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/teacher">
          <GraduationCapIcon size={16} />
          <span className="ml-2">Espace formateur</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/payments">
          <CreditCardIcon size={16} />
          <span className="ml-2">Paiements</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <MoonIcon size={16} />
        {/* TODO: change theme */}
        <span className="ml-2">Thème sombre</span>
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={logout}>
        <LogOutIcon size={16} />
        <span className="ml-2">Déconnexion</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default MenuDropdown;
