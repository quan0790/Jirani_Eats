import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(function ToastViewport(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:top-auto sm:bottom-0 sm:flex-col",
        className
      )}
      {...props}
    />
  );
});

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef(function Toast(
  { className, variant, ...props },
  ref
) {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});

const ToastAction = React.forwardRef(function ToastAction(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-muted",
        className
      )}
      {...props}
    />
  );
});

const ToastClose = React.forwardRef(function ToastClose(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 opacity-50 hover:opacity-100 transition",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  );
});

const ToastTitle = React.forwardRef(function ToastTitle(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
});

const ToastDescription = React.forwardRef(function ToastDescription(
  { className, ...props },
  ref
) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  );
});

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
