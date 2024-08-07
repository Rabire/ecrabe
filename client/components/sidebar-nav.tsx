import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    tab: string;
    title: string;
  }[];
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { lessonId } = useParams();

  const isTabActive = (currentTab: string | null, itemTab: string) => {
    if ((!currentTab || currentTab === "") && itemTab === "") return true;
    return currentTab === itemTab;
  };

  return (
    <aside className="px-2 lg:w-1/5">
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
            href={`/teacher/lesson/${lessonId}/?tab=${item.tab}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isTabActive(tab, item.tab)
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNav;
