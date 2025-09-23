import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { forwardRef, cloneElement, isValidElement } from "react";
import { type SxProps, type Theme } from "@mui/material/styles";

const baseStyles: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",
  borderRadius: "6px", // rounded-md equivalent
  fontSize: "0.875rem", // text-sm
  fontWeight: 500, // font-medium
  transition: "color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out",
  "&:focus-visible": {
    outline: "2px solid hsl(var(--ring))",
    outlineOffset: "2px",
  },
  "&:disabled": {
    pointerEvents: "none",
    opacity: 0.5,
  },
};

const variantStyles = {
  default: {
    backgroundColor: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--primary) / 0.9)",
    },
  },
  destructive: {
    backgroundColor: "hsl(var(--destructive))",
    color: "hsl(var(--destructive-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--destructive) / 0.9)",
    },
  },
  outline: {
    border: "1px solid hsl(var(--input))",
    backgroundColor: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
    },
  },
  secondary: {
    backgroundColor: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--secondary) / 0.8)",
    },
  },
  ghost: {
    backgroundColor: "transparent",
    color: "hsl(var(--foreground))",
    "&:hover": {
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
    },
  },
  link: {
    color: "hsl(var(--primary))",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    backgroundColor: "transparent",
    "&:hover": {
      textDecoration: "underline",
    },
  },
} as const;

const sizeStyles = {
  default: {
    height: "2.5rem", // h-10
    paddingX: "1rem", // px-4
    paddingY: "0.5rem", // py-2
  },
  sm: {
    height: "2.25rem", // h-9
    borderRadius: "6px", // rounded-md
    paddingX: "0.75rem", // px-3
  },
  lg: {
    height: "2.75rem", // h-11
    borderRadius: "6px", // rounded-md
    paddingX: "2rem", // px-8
  },
  icon: {
    height: "2.5rem", // h-10
    width: "2.5rem", // w-10
  },
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

const getButtonStyles = ({
  variant = "default",
  size = "default",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
}): SxProps<Theme> => ({
  ...baseStyles,
  ...variantStyles[variant],
  ...sizeStyles[size],
});

export interface ButtonProps
  extends Omit<MuiButtonProps, "color" | "size" | "variant"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ sx, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const buttonStyles = getButtonStyles({ variant, size });

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ...(props as Record<string, unknown>),
        sx: [buttonStyles, ...(Array.isArray(sx) ? sx : [sx])].filter(Boolean),
        ref,
      });
    }

    return (
      <MuiButton
        {...props}
        ref={ref}
        sx={[
          buttonStyles,
          {
            textTransform: "none",
            minWidth: 0,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ].filter(Boolean)}
        disableElevation
        disableRipple
        disableFocusRipple
        color="inherit"
        variant="text"
      >
        {children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";
