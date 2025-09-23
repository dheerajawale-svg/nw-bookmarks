import { createTheme } from "@mui/material/styles";
import { createPalette } from "./palette";
import { createTypography } from "./typography";
import { components } from "./components";

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
    palette: createPalette(),
    shape: {
      borderRadius: getCssRadius(),
    },
    typography: createTypography(),
    components,
  });

export type AppTheme = ReturnType<typeof createAppTheme>;
