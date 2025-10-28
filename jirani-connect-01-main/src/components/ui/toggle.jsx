import React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "../../lib/utils"; // ✅ correct relative path

const baseStyles =
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors " +
  "hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  sm: "h-8 px-2",
  default: "h-9 px-3",
  lg: "h-10 px-4",
};

export const Toggle = React.forwardRef(
  ({ className, size = "default", ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(baseStyles, sizes[size], className)}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";
