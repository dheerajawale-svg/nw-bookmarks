import {
  Box,
  Divider,
  ListSubheader,
  type ListSubheaderProps,
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
} from "@mui/material";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ComponentProps, MutableRefObject, PropsWithChildren, ReactNode } from "react";
import { Button, type ButtonProps } from "@mui/material";
import { type SxProps, type Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

const toSxArray = (sx?: SxProps<Theme>): SystemStyleObject<Theme>[] => {
  if (!sx) return [];
  if (Array.isArray(sx)) {
    return sx.filter((item): item is SystemStyleObject<Theme> => 
      item !== null && item !== undefined && typeof item !== 'boolean'
    ).map(item => typeof item === 'function' ? {} : item);
  }
  if (typeof sx === 'function') return [];
  return [sx as SystemStyleObject<Theme>];
};

const mergeSlotSx = (
  base: SystemStyleObject<Theme>,
  sx?: SxProps<Theme>,
): SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>) => {
  if (!sx) {
    return base;
  }

  return (theme: Theme) => {
    const result: SystemStyleObject<Theme> = { ...base };

    const append = (value?: SxProps<Theme>) => {
      if (value === null || value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== null && item !== undefined && typeof item !== 'boolean') {
            append(item);
          }
        });
        return;
      }

      if (typeof value === "function") {
        const resolved = value(theme);
        if (resolved) {
          append(resolved);
        }
        return;
      }

      Object.assign(result, value as SystemStyleObject<Theme>);
    };

    append(sx);
    return result;
  };
};

interface SelectContextValue {
  value?: string;
  selectedLabel?: ReactNode;
  placeholder?: ReactNode;
  open: boolean;
  disabled?: boolean;
  setOpen: (open: boolean) => void;
  registerItem: (value: string, label: ReactNode) => void;
  unregisterItem: (value: string) => void;
  onSelect: (value: string, label: ReactNode) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  triggerWidth: number | undefined;
}

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select.* components must be used within <Select>");
  }
  return context;
};

export interface SelectProps extends PropsWithChildren {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: ReactNode;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Select = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  name,
  required,
  children,
  open: openProp,
  onOpenChange,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const currentValue = valueProp !== undefined ? valueProp : internalValue;

  const [internalOpen, setInternalOpen] = useState(false);
  const open = openProp !== undefined ? openProp : internalOpen;

  const [labels, setLabels] = useState<Map<string, ReactNode>>(new Map());
  const [selectedLabel, setSelectedLabel] = useState<ReactNode>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>();

  useEffect(() => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  useEffect(() => {
    if (currentValue === undefined) {
      setSelectedLabel(undefined);
      return;
    }
    const label = labels.get(currentValue);
    if (label !== undefined) {
      setSelectedLabel(label);
    }
  }, [labels, currentValue]);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (disabled) {
        return;
      }
      onOpenChange?.(nextOpen);
      if (openProp === undefined) {
        setInternalOpen(nextOpen);
      }
    },
    [disabled, onOpenChange, openProp],
  );

  const setValue = useCallback(
    (nextValue: string) => {
      if (valueProp === undefined) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [onValueChange, valueProp],
  );

  const registerItem = useCallback((itemValue: string, label: ReactNode) => {
    setLabels((prev) => {
      const next = new Map(prev);
      next.set(itemValue, label);
      return next;
    });
  }, []);

  const unregisterItem = useCallback((itemValue: string) => {
    setLabels((prev) => {
      const next = new Map(prev);
      next.delete(itemValue);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (nextValue: string, label: ReactNode) => {
      if (disabled) {
        return;
      }
      setValue(nextValue);
      setSelectedLabel(label ?? labels.get(nextValue) ?? nextValue);
      setOpen(false);
    },
    [disabled, labels, setOpen, setValue],
  );

  const contextValue = useMemo<SelectContextValue>(
    () => ({
      value: currentValue,
      selectedLabel,
      placeholder,
      open,
      disabled,
      setOpen,
      registerItem,
      unregisterItem,
      onSelect: handleSelect,
      triggerRef,
      triggerWidth,
    }),
    [currentValue, disabled, handleSelect, open, placeholder, registerItem, selectedLabel, triggerWidth, unregisterItem, setOpen],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      {name ? <input type="hidden" name={name} value={currentValue ?? ""} required={required} /> : null}
      {children}
    </SelectContext.Provider>
  );
};

const mergeRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) =>
  (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };

export type SelectTriggerProps = Omit<ButtonProps, "variant" | "size">;

const baseTriggerStyles: SxProps<Theme> = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  border: "1px solid hsl(var(--input))",
  backgroundColor: "hsl(var(--background))",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  color: "hsl(var(--foreground))",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  transition: "color 150ms ease-in-out, background-color 150ms ease-in-out, border-color 150ms ease-in-out",
  "&:focus-visible": {
    outline: "2px solid hsl(var(--ring))",
    outlineOffset: "2px",
  },
  "&:hover": {
    backgroundColor: "hsl(var(--accent))",
    color: "hsl(var(--accent-foreground))",
  },
  "&:disabled": {
    pointerEvents: "none",
    opacity: 0.5,
  },
};

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ sx, children, onClick, disabled: disabledProp, ...props }, ref) => {
    const ctx = useSelectContext();
    const handleClick: NonNullable<SelectTriggerProps["onClick"]> = (event) => {
      onClick?.(event);
      if (ctx.disabled ?? disabledProp) {
        return;
      }
      ctx.setOpen(!ctx.open);
    };

    return (
      <Button
        {...props}
        ref={mergeRefs(ref, ctx.triggerRef)}
        onClick={handleClick}
        disabled={ctx.disabled ?? disabledProp}
        sx={sx ? [baseTriggerStyles, ...toSxArray(sx)] : baseTriggerStyles}
      >
        <span style={{ flex: 1, textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {children ?? <SelectValue />}
        </span>
        <span
          aria-hidden
          style={{
            marginLeft: "0.5rem",
            display: "flex",
            height: "1rem",
            width: "1rem",
            alignItems: "center",
            justifyContent: "center",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          ▼
        </span>
      </Button>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps {
  placeholder?: ReactNode;
  className?: string;
}

export const SelectValue = ({ placeholder: placeholderProp, className }: SelectValueProps) => {
  const ctx = useSelectContext();
  const fallback = placeholderProp ?? ctx.placeholder;
  const value = ctx.selectedLabel ?? fallback;

  return (
    <Box
      component="span"
      className={className}
      sx={{
        color: ctx.selectedLabel ? undefined : "hsl(var(--muted-foreground))",
        display: "inline",
      }}
    >
      {value ?? null}
    </Box>
  );
};

SelectValue.displayName = "SelectValue";

export type SelectContentProps = Omit<MenuProps, "open">;

export const SelectContent = ({
  className,
  MenuListProps,
  PaperProps,
  onClose,
  children,
  ...props
}: SelectContentProps) => {
  const ctx = useSelectContext();
  const minWidth = ctx.triggerWidth ?? 180;

  const handleClose: NonNullable<MenuProps["onClose"]> = (event, reason) => {
    onClose?.(event, reason);
    ctx.setOpen(false);
  };

  const defaultPaperSx: SystemStyleObject<Theme> = {
    marginTop: "8px",
    maxHeight: "16rem",
    minWidth: `${minWidth}px`,
    overflowY: "auto",
    borderRadius: "var(--radius)",
    border: "1px solid hsl(var(--border))",
    backgroundColor: "hsl(var(--popover))",
    color: "hsl(var(--popover-foreground))",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  };

  const defaultMenuListSx: SystemStyleObject<Theme> = {
    padding: "4px",
  };

  return (
    <Menu
      {...props}
      open={ctx.open}
      anchorEl={ctx.triggerRef.current}
      onClose={handleClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      className={className}
      PaperProps={{
        elevation: 0,
        ...PaperProps,
        sx: mergeSlotSx(defaultPaperSx, PaperProps?.sx),
      }}
      MenuListProps={{
        dense: true,
        ...MenuListProps,
        sx: mergeSlotSx(defaultMenuListSx, MenuListProps?.sx),
      }}
    >
      {children}
    </Menu>
  );
};

SelectContent.displayName = "SelectContent";

export interface SelectItemProps extends MenuItemProps {
  value: string;
}

export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>(
  ({ value, className, children, onClick, sx, ...props }, ref) => {
    const ctx = useSelectContext();
    const selected = ctx.value === value;
    const isDisabled = props.disabled ?? false;

    useEffect(() => {
      ctx.registerItem(value, children);
      return () => ctx.unregisterItem(value);
    }, [children, ctx, value]);

    const handleClick: NonNullable<MenuItemProps["onClick"]> = (event) => {
      onClick?.(event);
      ctx.onSelect(value, children);
    };

    return (
      <MenuItem
        {...props}
        ref={ref}
        selected={selected}
        onClick={handleClick}
        className={className}
        sx={sx ? [
          {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "0.125rem",
            padding: "8px 10px",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            transition: "color 150ms ease-in-out, background-color 150ms ease-in-out",
            cursor: isDisabled ? "default" : "pointer",
            outline: "none",
            "&:hover": {
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            },
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--accent-foreground))",
            },
            "&.Mui-disabled": {
              pointerEvents: "none",
              opacity: 0.5,
              cursor: "default",
            },
          },
          ...toSxArray(sx),
        ] : {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "0.125rem",
          padding: "8px 10px",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          transition: "color 150ms ease-in-out, background-color 150ms ease-in-out",
          cursor: isDisabled ? "default" : "pointer",
          outline: "none",
          "&:hover": {
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          },
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
          },
          "&.Mui-disabled": {
            pointerEvents: "none",
            opacity: 0.5,
            cursor: "default",
          },
        }}
      >
        {children}
      </MenuItem>
    );
  },
);

SelectItem.displayName = "SelectItem";

export type SelectLabelProps = ListSubheaderProps;

export const SelectLabel = forwardRef<HTMLLIElement, SelectLabelProps>(
  ({ className, sx, ...props }, ref) => (
    <ListSubheader
      {...props}
      ref={ref}
      className={className}
      sx={sx ? [
        {
          padding: "6px 10px",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "hsl(var(--muted-foreground))",
        },
        ...toSxArray(sx),
      ] : {
        padding: "6px 10px",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "hsl(var(--muted-foreground))",
      }}
    />
  ),
);

SelectLabel.displayName = "SelectLabel";

export interface SelectGroupProps extends PropsWithChildren {
  className?: string;
  sx?: SxProps<Theme>;
}

export const SelectGroup = ({ className, children, sx }: SelectGroupProps) => (
  <Box
    className={className}
    sx={sx ? [{ paddingTop: "4px", paddingBottom: "4px" }, ...toSxArray(sx)] : { paddingTop: "4px", paddingBottom: "4px" }}
  >
    {children}
  </Box>
);

SelectGroup.displayName = "SelectGroup";

export const SelectSeparator = ({ className, sx, ...props }: ComponentProps<typeof Divider>) => (
  <Divider
    {...props}
    className={className}
    sx={sx ? [{ marginTop: "4px", marginBottom: "4px" }, ...toSxArray(sx)] : { marginTop: "4px", marginBottom: "4px" }}
  />
);

SelectSeparator.displayName = "SelectSeparator";
