import { Components, Theme } from "@mui/material/styles";

export const MuiListItemText: Components<Theme>["MuiListItemText"] = {
  styleOverrides: {
    primary: ({ theme }) => ({
      ...theme.typography.h1,
    }),
    secondary: ({ theme }) => ({
      ...theme.typography.body1,
    }),
  },
};