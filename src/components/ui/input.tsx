import TextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

export interface InputProps
  extends Omit<MuiTextFieldProps, "variant" | "margin" | "size"> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      fullWidth = true,
      type = "text",
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
      />
    );
  },
);

Input.displayName = "Input";
