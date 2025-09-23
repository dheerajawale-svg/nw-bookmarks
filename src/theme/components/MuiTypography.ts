import { Components, Theme } from "@mui/material/styles";

export const MuiTypography: Components<Theme>["MuiTypography"] = {
  variants: [
    {
      props: { variant: "bookmarkTitle" as any },
      style: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "16px",
        color: "rgba(45, 47, 47, 1)",
      },
    },
    {
      props: { variant: "bookmarkReference" as any },
      style: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "16px",
        color: "rgba(95, 99, 99, 1)",
      },
    },
    {
      props: { variant: "bookmarkTime" as any },
      style: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "16px",
        color: "rgba(45, 47, 47, 1)",
      },
    },
    {
      props: { variant: "bookmarkContent" as any },
      style: {
        fontSize: "11px",
        fontWeight: 400,
        lineHeight: "18px",
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