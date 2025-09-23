declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    default: true;
    destructive: true;
    outline: true;
    secondary: true;
    ghost: true;
    link: true;
  }

  interface ButtonPropsSizeOverrides {
    default: true;
    sm: true;
    lg: true;
    icon: true;
  }
}

declare module "@mui/material/Button/Button" {
  interface ButtonPropsVariantOverrides {
    default: true;
    destructive: true;
    outline: true;
    secondary: true;
    ghost: true;
    link: true;
  }

  interface ButtonPropsSizeOverrides {
    default: true;
    sm: true;
    lg: true;
    icon: true;
  }
}

export {};
