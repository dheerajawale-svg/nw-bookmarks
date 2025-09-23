import { Components, Theme } from "@mui/material/styles";

export const MuiTextField: Components<Theme>["MuiTextField"] = {
  styleOverrides: {
    root: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: "hsl(var(--background))",
        borderRadius: "calc(var(--radius) - 2px)",
        fontSize: "0.875rem",
        transition: "all 150ms ease-in-out",
        "& fieldset": {
          borderColor: "hsl(var(--border))",
        },
        "&:hover fieldset": {
          borderColor: "hsl(var(--border))",
        },
        "&.Mui-focused fieldset": {
          borderColor: "hsl(var(--ring))",
          borderWidth: "2px",
        },
        "&.Mui-disabled": {
          backgroundColor: "hsl(var(--muted))",
          "& fieldset": {
            borderColor: "hsl(var(--border))",
          },
        },
      },
      "& .MuiInputBase-input": {
        color: "hsl(var(--foreground))",
        padding: "8px 12px",
        "&::placeholder": {
          color: "hsl(var(--muted-foreground))",
          opacity: 1,
        },
        "&:disabled": {
          color: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
};