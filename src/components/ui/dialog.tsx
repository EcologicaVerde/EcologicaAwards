import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 w-full max-w-md rounded-xl border border-[#242426] bg-[#111111] p-6 shadow-2xl shadow-black/80",
              className
            )}
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-md p-1 text-[#71717a] transition-colors hover:bg-[#1c1c1f] hover:text-[#fafafa] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 pr-6">
              <h2 className="text-base font-semibold tracking-tight text-[#fafafa]">
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-xs leading-relaxed text-[#8c8c94]">
                  {description}
                </p>
              )}
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
