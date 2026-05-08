import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

function cn(...classes: Array<string | boolean | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type FormHTMLProps = React.FormHTMLAttributes<HTMLFormElement>;

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  asChild?: boolean;
};

type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

type FormControlProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

type FormFieldProps = React.HTMLAttributes<HTMLDivElement>;

export function Form({ className, ...props }: FormHTMLProps) {
  return <form className={cn("space-y-6", className)} {...props} />;
}

export function FormField({ className, ...props }: FormFieldProps) {
  return <div className={cn("grid gap-1.5", className)} {...props} />;
}

export function FormItem({ className, ...props }: FormItemProps) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-slate-900 dark:text-slate-100",
          className,
        )}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn("relative w-full", className)}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  ),
);
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "min-h-[1.25rem] text-sm font-medium text-destructive",
        className,
      )}
      {...props}
    />
  ),
);
FormMessage.displayName = "FormMessage";
