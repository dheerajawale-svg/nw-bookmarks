export const createPalette = () => ({
  mode: "light" as const,
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
  warning: {
    main: "hsl(var(--warning))",
    contrastText: "hsl(var(--warning-foreground))",
  },
  info: {
    main: "hsl(var(--info))",
    contrastText: "hsl(var(--info-foreground))",
  },
  success: {
    main: "hsl(var(--success))",
    contrastText: "hsl(var(--success-foreground))",
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
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
});