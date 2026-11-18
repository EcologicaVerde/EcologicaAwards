import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4caf50] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#4caf50] text-[#051608] font-semibold shadow-sm hover:bg-[#66bb6a] active:scale-[0.98]",
        emeraldSoft:
          "bg-[#4caf50]/12 text-[#81c784] border border-[#4caf50]/30 hover:bg-[#4caf50]/20 hover:border-[#4caf50]/50 hover:text-[#a5d6a7]",
        secondary:
          "bg-[#18181b] text-[#fafafa] border border-[#27272a] hover:bg-[#222226] hover:border-[#323236]",
        outline:
          "border border-[#242426] bg-[#111111] text-[#e4e4e7] hover:bg-[#18181b] hover:border-[#343438] hover:text-white",
        ghost:
          "text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]",
        destructive:
          "bg-red-500/12 text-red-400 border border-red-500/25 hover:bg-red-500/20 hover:text-red-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-5 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
