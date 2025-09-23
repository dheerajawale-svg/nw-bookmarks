import { Components, Theme } from "@mui/material/styles";

export const MuiTypography: Components<Theme>["MuiTypography"] = {
  variants: [
    {
      props: { variant: "bookmarkTitle" as any },
      style: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: "15.6px",
        color: "#2D2F2F",
      },
    },
    {
      props: { variant: "bookmarkReference" as any },
      style: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: "1rem",
        color: "#929696",
      },
    },
    {
      props: { variant: "bookmarkTime" as any },
      style: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: "1rem",
        color: "#2D2F2F",
      },
    },
    {
      props: { variant: "bookmarkContent" as any },
      style: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.4,
        color: "hsl(var(--foreground))",
      },
    },
  ],
};

// Extend the Typography variants interface
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bookmarkTitle: true;
    bookmarkReference: true;
    bookmarkTime: true;
    bookmarkContent: true;
  }
}