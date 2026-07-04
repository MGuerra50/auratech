"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "ghost" | "accent";
type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  "aria-label": string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  default:
    "bg-surface-elevated text-foreground border border-border hover:bg-surface hover:border-muted",
  ghost: "bg-transparent text-muted hover:bg-surface-elevated hover:text-foreground",
  accent:
    "bg-accent-muted text-accent border border-accent/20 hover:bg-accent/20 hover:text-accent-hover",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "md",
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

IconButton.displayName = "IconButton";
