import TextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const inputRootClasses =
  "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const inputInnerClasses =
  "h-full w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none";

export interface InputProps
  extends Omit<MuiTextFieldProps, "variant" | "margin" | "size"> {
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      slotProps,
      InputProps,
      fullWidth = true,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const mergedSlotProps = {
      ...slotProps,
      root: {
        ...(slotProps?.root ?? {}),
        className: cn(slotProps?.root?.className, className),
      },
      htmlInput: {
        ...(slotProps?.htmlInput ?? {}),
        className: cn(slotProps?.htmlInput?.className, inputInnerClasses, inputClassName),
      },
    };

    const mergedInputProps = {
      ...InputProps,
      classes: {
        ...(InputProps?.classes ?? {}),
        root: cn(inputRootClasses, InputProps?.classes?.root),
        input: cn(InputProps?.classes?.input),
        notchedOutline: cn("border-0", InputProps?.classes?.notchedOutline),
      },
    };

    return (
      <TextField
        {...props}
        type={type}
        fullWidth={fullWidth}
        variant="outlined"
        size="small"
        slotProps={mergedSlotProps}
        InputProps={mergedInputProps}
        inputRef={ref}
      />
    );
  },
);

Input.displayName = "Input";
