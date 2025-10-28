import * as React from "react";
import { cva,  from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus,
  {
    variants,
        secondary,
        destructive,
        outline,
      },
    },
    defaultVariants,
    },
  },
);

export 

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
