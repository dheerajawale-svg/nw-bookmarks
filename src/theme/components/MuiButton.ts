import { Components, Theme } from "@mui/material/styles";

const focusVisibleStyles = {
  outline: "2px solid hsl(var(--ring))",
  outlineOffset: "2px",
};

export const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableElevation: true,
    disableRipple: true,
    disableFocusRipple: true,
    color: "inherit",
    variant: "default",
    size: "default",
  },
  styleOverrides: {
    root: ({ theme }) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      borderRadius: "6px",
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "none",
      minWidth: 0,
      height: "2.5rem",
      paddingInline: "1rem",
      paddingBlock: "0.5rem",
      transition: theme.transitions.create([
        "color",
        "background-color",
        "border-color",
      ]),
      "&.Mui-focusVisible": focusVisibleStyles,
      "&.Mui-disabled": {
        pointerEvents: "none",
        opacity: 0.5,
      },
    }),
  },
  variants: [
    {
      props: { variant: "default" },
      style: {
        backgroundColor: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        "&:hover": {
          backgroundColor: "hsl(var(--primary) / 0.9)",
        },
      },
    },
    {
      props: { variant: "destructive" },
      style: {
        backgroundColor: "hsl(var(--destructive))",
        color: "hsl(var(--destructive-foreground))",
        "&:hover": {
          backgroundColor: "hsl(var(--destructive) / 0.9)",
        },
      },
    },
    {
      props: { variant: "outline" },
      style: {
        border: "1px solid hsl(var(--input))",
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        "&:hover": {
          backgroundColor: "hsl(var(--accent))",
          color: "hsl(var(--accent-foreground))",
        },
      },
    },
    {
      props: { variant: "secondary" },
      style: {
        backgroundColor: "hsl(var(--secondary))",
        color: "hsl(var(--secondary-foreground))",
        "&:hover": {
          backgroundColor: "hsl(var(--secondary) / 0.8)",
        },
      },
    },
    {
      props: { variant: "ghost" },
      style: {
        backgroundColor: "transparent",
        color: "hsl(var(--foreground))",
        "&:hover": {
          backgroundColor: "hsl(var(--accent))",
          color: "hsl(var(--accent-foreground))",
        },
      },
    },
    {
      props: { variant: "link" },
      style: {
        color: "hsl(var(--primary))",
        backgroundColor: "transparent",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
    {
      props: { size: "sm" },
      style: {
        height: "2.25rem",
        paddingInline: "0.75rem",
      },
    },
    {
      props: { size: "lg" },
      style: {
        height: "2.75rem",
        paddingInline: "2rem",
      },
    },
    {
      props: { size: "icon" },
      style: {
        height: "2.5rem",
        width: "2.5rem",
        paddingInline: 0,
        paddingBlock: 0,
      },
    },
  ],
};
