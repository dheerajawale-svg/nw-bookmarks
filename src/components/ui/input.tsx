import TextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";
import { type SxProps, type Theme } from "@mui/material/styles";

export interface InputProps
  extends Omit<MuiTextFieldProps, "variant" | "margin" | "size"> {
  sx?: SxProps<Theme>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      fullWidth = true,
      type = "text",
      sx,
      ...props
    },
    ref,
  ) => {
    return (
      <TextField
        {...props}
        type={type}
        fullWidth={fullWidth}
        variant="outlined"
        size="small"
        inputRef={ref}
        sx={[
          {
            borderRadius: "6px", // Example styling
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "hsl(var(--input-border))",
              },
              "&:hover fieldset": {
                borderColor: "hsl(var(--input-border-hover))",
              },
              "&.Mui-focused fieldset": {
                borderColor: "hsl(var(--input-border-focus))",
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ].filter(Boolean)}
      />
    );
  },
);

Input.displayName = "Input";
