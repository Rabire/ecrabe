import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";

export const LoadingWheel = ({ className, ...props }: LucideProps) => (
  <Loader2 className={cn("animate-spin", className)} {...props} />
);

type TextLoaderProps = { className?: string; charLength?: number };

export const LoadingText = ({
  className,
  charLength = 10,
}: TextLoaderProps) => (
  <span
    className={cn(
      "animate-pulse break-words bg-muted-foreground text-transparent opacity-20",
      className,
    )}
  >
    {"x".repeat(charLength)}
  </span>
);
