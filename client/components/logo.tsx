import { cn } from "@/lib/utils";

type Props = { className?: string };

const Logo = ({ className }: Props) => (
  <div
    className={cn(
      "bold bg-primary px-4 font-bold text-primary-foreground",
      className,
    )}
  >
    LOGO
  </div>
);

export default Logo;
