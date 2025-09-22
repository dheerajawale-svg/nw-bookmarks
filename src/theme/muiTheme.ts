import { createTheme } from '@mui/material/styles';

// Define the color scheme based on the existing design system
const lightTheme = {
  background: 'hsl(0, 0%, 100%)',
  foreground: 'hsl(222.2, 84%, 4.9%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(222.2, 84%, 4.9%)',
  primary: 'hsl(222.2, 47.4%, 11.2%)',
  primaryForeground: 'hsl(210, 40%, 98%)',
  secondary: 'hsl(210, 40%, 96.1%)',
  secondaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
  muted: 'hsl(210, 40%, 96.1%)',
  mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
  accent: 'hsl(210, 40%, 96.1%)',
  accentForeground: 'hsl(222.2, 47.4%, 11.2%)',
  destructive: 'hsl(0, 84.2%, 60.2%)',
  destructiveForeground: 'hsl(210, 40%, 98%)',
  border: 'hsl(214.3, 31.8%, 91.4%)',
  input: 'hsl(214.3, 31.8%, 91.4%)',
  ring: 'hsl(222.2, 84%, 4.9%)',
  // Card states
  cardNormal: 'hsl(0, 0%, 95.7%)',
  cardNormalBorder: 'hsl(0, 0%, 91.8%)',
  cardDisabled: 'hsl(0, 0%, 91.8%)',
  cardDisabledBorder: 'hsl(0, 0%, 81.6%)',
  cardSelected: 'hsl(0, 0%, 100%)',
  cardSelectedBorder: 'hsl(178, 100%, 33.5%, 0.7)',
  cardSelectedOverlay: 'hsl(177, 95.8%, 21.8%, 0.05)',
};

const darkTheme = {
  background: 'hsl(222.2, 84%, 4.9%)',
  foreground: 'hsl(210, 40%, 98%)',
  card: 'hsl(222.2, 84%, 4.9%)',
  cardForeground: 'hsl(210, 40%, 98%)',
  primary: 'hsl(210, 40%, 98%)',
  primaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
  secondary: 'hsl(217.2, 32.6%, 17.5%)',
  secondaryForeground: 'hsl(210, 40%, 98%)',
  muted: 'hsl(217.2, 32.6%, 17.5%)',
  mutedForeground: 'hsl(215, 20.2%, 65.1%)',
  accent: 'hsl(217.2, 32.6%, 17.5%)',
  accentForeground: 'hsl(210, 40%, 98%)',
  destructive: 'hsl(0, 62.8%, 30.6%)',
  destructiveForeground: 'hsl(210, 40%, 98%)',
  border: 'hsl(217.2, 32.6%, 17.5%)',
  input: 'hsl(217.2, 32.6%, 17.5%)',
  ring: 'hsl(212.7, 26.8%, 83.9%)',
  // Card states - dark mode
  cardNormal: 'hsl(217.2, 32.6%, 17.5%)',
  cardNormalBorder: 'hsl(217.2, 32.6%, 17.5%)',
  cardDisabled: 'hsl(240, 3.7%, 15.9%)',
  cardDisabledBorder: 'hsl(240, 3.7%, 15.9%)',
  cardSelected: 'hsl(222.2, 84%, 4.9%)',
  cardSelectedBorder: 'hsl(178, 100%, 33.5%, 0.7)',
  cardSelectedOverlay: 'hsl(177, 95.8%, 21.8%, 0.05)',
};

export const createAppTheme = (mode: 'light' | 'dark') => {
  const colors = mode === 'light' ? lightTheme : darkTheme;
  
  return createTheme({
    palette: {
      mode,
      background: {
        default: colors.background,
        paper: colors.card,
      },
      text: {
        primary: colors.foreground,
        secondary: colors.mutedForeground,
      },
      primary: {
        main: colors.primary,
        contrastText: colors.primaryForeground,
      },
      secondary: {
        main: colors.secondary,
        contrastText: colors.secondaryForeground,
      },
      error: {
        main: colors.destructive,
        contrastText: colors.destructiveForeground,
      },
      divider: colors.border,
    },
    shape: {
      borderRadius: 8, // 0.5rem equivalent
    },
    typography: {
      fontFamily: '"Inter", "Frutiger LT Std", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.4,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            '&.card-state-normal': {
              backgroundColor: colors.cardNormal,
              borderColor: colors.cardNormalBorder,
              border: `1px solid ${colors.cardNormalBorder}`,
            },
            '&.card-state-disabled': {
              backgroundColor: colors.cardDisabled,
              borderColor: colors.cardDisabledBorder,
              border: `1px solid ${colors.cardDisabledBorder}`,
              cursor: 'not-allowed',
              opacity: 0.8,
            },
            '&.card-state-selected': {
              backgroundColor: colors.cardSelected,
              borderColor: colors.cardSelectedBorder,
              border: `1px solid ${colors.cardSelectedBorder}`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundColor: colors.cardSelectedOverlay,
                pointerEvents: 'none',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 6,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: colors.background,
              '& fieldset': {
                borderColor: colors.border,
              },
              '&:hover fieldset': {
                borderColor: colors.ring,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.ring,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: colors.muted,
            color: colors.mutedForeground,
            fontSize: '0.75rem',
            height: '1.5rem',
            '& .MuiChip-deleteIcon': {
              color: colors.mutedForeground,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 140, 154, 0.1)',
            color: '#008C9A',
            fontSize: '0.6875rem',
            fontWeight: 400,
            width: 24,
            height: 24,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: colors.mutedForeground,
            '&:hover': {
              backgroundColor: colors.muted,
            },
          },
        },
      },
    },
  });
};