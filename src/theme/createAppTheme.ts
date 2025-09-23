import { createTheme } from "@mui/material/styles";

const getCssRadius = () => {
  if (typeof window === "undefined") {
    return 8;
  }

  const rawValue = getComputedStyle(document.documentElement).getPropertyValue("--radius");
  const numeric = Number.parseFloat(rawValue);

  return Number.isFinite(numeric) ? numeric : 8;
};

export const createAppTheme = () =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "hsl(var(--primary))",
        contrastText: "hsl(var(--primary-foreground))",
      },
      secondary: {
        main: "hsl(var(--secondary))",
        contrastText: "hsl(var(--secondary-foreground))",
      },
      error: {
        main: "hsl(var(--destructive))",
        contrastText: "hsl(var(--destructive-foreground))",
      },
      background: {
        default: "hsl(var(--background))",
        paper: "hsl(var(--card))",
      },
      text: {
        primary: "hsl(var(--foreground))",
        secondary: "hsl(var(--muted-foreground))",
      },
      divider: "hsl(var(--border))",
    },
    shape: {
      borderRadius: getCssRadius(),
    },
    typography: {
      fontFamily: "inherit",
    },
  });

export type AppTheme = ReturnType<typeof createAppTheme>;
