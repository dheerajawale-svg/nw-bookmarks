export const createTypography = () => ({
  fontFamily: "inherit",
  h1: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "hsl(var(--foreground))",
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.3,
    color: "hsl(var(--foreground))",
  },
  h3: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "hsl(var(--foreground))",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "hsl(var(--foreground))",
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.4,
    color: "hsl(var(--muted-foreground))",
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.3,
    color: "hsl(var(--muted-foreground))",
  },
  // Custom variants for bookmark components
  bookmarkTitle: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "15.6px",
    color: "#2D2F2F",
  },
  bookmarkReference: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "1rem",
    color: "#929696",
  },
  bookmarkTime: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: "1rem",
    color: "#2D2F2F",
  },
  bookmarkContent: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.4,
    color: "hsl(var(--foreground))",
  },
});