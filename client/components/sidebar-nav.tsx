import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    tab: string;
    title: string;
  }[];
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathName = usePathname();
  const { id } = useParams();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.tab}
          href={`/teacher/lesson/${id}/?tab=${item.tab}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathName.includes(item.tab)
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
