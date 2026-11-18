import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[#4caf50]/30 bg-[#4caf50]/12 text-[#81c784]",
        solid:
          "border-transparent bg-[#4caf50] text-[#051608] font-semibold",
        secondary:
          "border-[#262629] bg-[#18181b] text-[#a1a1aa]",
        outline:
          "border-[#262629] bg-transparent text-[#d4d4d8]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
