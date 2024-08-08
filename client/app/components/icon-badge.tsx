import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const backgroundVariant = cva("rounded-full flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-sky-100",
      success: "bg-emerald-500",
    },
    size: {
      default: "p-2",
      sm: "p-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-sky-700",
      success: "text-emerald-700",
    },
    size: {
      default: "w-8 h-9",
      sm: "w-4 h-4",
    },
    default: {
      variant: "default",
      size: "default",
    },
  },
});

type backgroundVariantProps = VariantProps<typeof backgroundVariant>;
type iconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends backgroundVariantProps, iconVariantProps {
  icon: LucideIcon;
}

const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => (
  <div className={cn(backgroundVariant({ variant, size }))}>
    <Icon className={cn(iconVariants({ variant, size }))} />
  </div>
);

export default IconBadge;
