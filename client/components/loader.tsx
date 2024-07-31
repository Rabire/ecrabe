import { cn } from "@/lib/utils";
import { Loader2, LucideProps } from "lucide-react";
import { Card, CardContent } from "./ui/card";

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

type Props = {
  count?: number;
  show?: boolean;
  height?: number;
  className?: string;
};

const MockCard = ({
  height,
  className,
}: {
  height?: number;
  className?: string;
}) => (
  <Card
    className={cn("pt-6", className)}
    style={{ height: height ? `${height}px` : "auto" }}
  >
    <CardContent className="flex h-full flex-col justify-end gap-2">
      <LoadingText className="h-4 w-2/3" />
      <LoadingText className="h-4 w-1/3" />
      <LoadingText className="h-4 w-3/4" />
    </CardContent>
  </Card>
);

export const LoadingCards = ({
  count = 1,
  show = true,
  height,
  className,
}: Props) => {
  if (!show) return null;

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <MockCard key={i} height={height} className={className} />
      ))}
    </>
  );
};
