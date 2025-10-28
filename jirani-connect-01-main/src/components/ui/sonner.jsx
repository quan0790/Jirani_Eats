import { Toaster as Sonner, toast } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      theme="light" // or "dark" or "system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border shadow-lg rounded-md",
          description: "text-muted-foreground",
          actionButton: "text-primary font-medium hover:underline",
          cancelButton: "text-muted-foreground hover:underline",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
