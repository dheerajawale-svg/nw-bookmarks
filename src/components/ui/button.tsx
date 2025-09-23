import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { forwardRef, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

export const buttonVariants = ({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) => cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

export interface ButtonProps
  extends Omit<MuiButtonProps, "color" | "size" | "variant"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, className });

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ...(props as Record<string, unknown>),
        className: cn(classes, (children.props as { className?: string }).className),
        ref,
      });
    }

    return (
      <MuiButton
        {...props}
        ref={ref}
        className={classes}
        disableElevation
        disableRipple
        disableFocusRipple
        color="inherit"
        variant="text"
        sx={{
          textTransform: "none",
          minWidth: 0,
        }}
      >
        {children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";
