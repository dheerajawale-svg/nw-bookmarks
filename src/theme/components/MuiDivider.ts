import { Components, Theme } from "@mui/material/styles";

export const MuiDivider: Components<Theme>["MuiDivider"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderColor: theme.palette.grey[100],
      opacity: 1,
    }),
  },
};
