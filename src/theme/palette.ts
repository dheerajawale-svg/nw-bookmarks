export const createPalette = () => ({
  mode: "light" as const,
  primary: {
    main: "rgba(0, 140, 154, 1)",
  },
  secondary: {
    main: "rgba(0, 143, 140, 1)",
  },
  text: {
    primary: "rgba(45, 47, 47, 1)",
    secondary: "rgba(95, 99, 99, 1)",
  },
  background: {
    default: "rgba(244, 245, 245, 1)",
    paper: "rgba(252, 253, 253, 1)",
  },
  grey: {
    50: "rgba(244, 245, 245, 1)",
    100: "rgba(234, 235, 235, 1)",
    300: "rgba(146, 150, 150, 1)",
    400: "rgba(112, 117, 117, 1)",
    500: "rgba(95, 99, 99, 1)",
    600: "rgba(71, 71, 71, 1)",
    800: "rgba(45, 47, 47, 1)",
    900: "rgba(20, 21, 21, 1)",
  },
});