"use client";

import { cn } from "@/lib/utils";
import { BookMarkedIcon, HomeIcon, LibraryBig, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

type Props = { className?: string };

const STUDENT_ELEMENTS = [
  { href: "/student", text: "Accueil", icon: HomeIcon },
  {
    href: "/student/lessons",
    text: "Votre bibliothèque",
    icon: BookMarkedIcon,
  },
  { href: "/student/shop", text: "Librairie", icon: LibraryBig },
];

const TEACHER_ELEMENTS = [
  { href: "/teacher", text: "Accueil", icon: HomeIcon },
  { href: "/teacher/students", text: "Vos étudiants", icon: UsersIcon },
  { href: "/teacher/lessons", text: "Vos formations", icon: BookMarkedIcon },
];

const MenuElements = ({ className }: Props) => {
  const pathname = usePathname();

  const isTeacher = pathname.startsWith("/teacher");

  const elements = isTeacher ? TEACHER_ELEMENTS : STUDENT_ELEMENTS;

  return (
    <div className={cn("gap-2", className)}>
      {elements.map((element) => (
        <Button
          asChild
          variant="outline"
          className={cn(pathname === element.href && "border-primary")}
        >
          <a href={element.href}>
            <element.icon size={16} />
            <span>{element.text}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};

export default MenuElements;
