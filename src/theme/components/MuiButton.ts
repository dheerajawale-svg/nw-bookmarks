import { Components, Theme } from "@mui/material/styles";

export const MuiButton: Components<Theme>["MuiButton"] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      borderRadius: "calc(var(--radius) - 2px)",
      fontWeight: 500,
      transition: "all 150ms ease-in-out",
      textTransform: "none",
      "&:focus-visible": {
        outline: "2px solid hsl(var(--ring))",
        outlineOffset: "2px",
      },
    }),
  },
  variants: [
    {
      props: { variant: "contained" },
      style: {
        backgroundColor: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "&:hover": {
          backgroundColor: "hsl(var(--primary) / 0.9)",
        },
        "&:disabled": {
          backgroundColor: "hsl(var(--muted))",
          color: "hsl(var(--muted-foreground))",
        },
      },
    },
    {
      props: { variant: "outlined" },
      style: {
        backgroundColor: "transparent",
        color: "hsl(var(--foreground))",
        border: "1px solid hsl(var(--border))",
        "&:hover": {
          backgroundColor: "hsl(var(--accent))",
          color: "hsl(var(--accent-foreground))",
        },
        "&:disabled": {
          color: "hsl(var(--muted-foreground))",
          borderColor: "hsl(var(--border))",
        },
      },
    },
    {
      props: { variant: "text" },
      style: {
        color: "hsl(var(--primary))",
        "&:hover": {
          backgroundColor: "hsl(var(--accent))",
        },
        "&:disabled": {
          color: "hsl(var(--muted-foreground))",
        },
      },
    },
  ],
};