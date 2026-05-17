"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black border border-white/10 text-foreground rounded-full shadow-[0_0_12px_rgba(249,115,22,0.1)] transition-all duration-300 hover:bg-[#121316] hover:shadow-[0_0_22px_rgba(249,115,22,0.35)] hover:border-white/20",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/10 bg-transparent rounded-full text-foreground hover:bg-[#121316] hover:border-white/20 transition-all duration-300",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        ghost: "hover:bg-card hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "group relative inline-flex items-center gap-3 pl-2 pr-6 bg-[#0B0C0E] border border-white/5 text-foreground rounded-full transition-all duration-300 hover:shadow-[0_0_22px_rgba(249,115,22,0.4)] hover:border-white/15 hover:bg-[#121316] select-none cursor-pointer font-bold tracking-wide h-auto py-2",
        whatsapp: "bg-whatsapp text-whatsapp-foreground hover:opacity-90 font-semibold",
        "outline-brand": "border border-sunset-red/30 bg-transparent text-sunset-orange hover:bg-sunset-red/10 hover:border-sunset-red/50",
        "ghost-light": "text-foreground/70 hover:text-foreground hover:bg-card",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

