import { Divider, Menu, MenuItem, type MenuItemProps, type MenuProps } from "@mui/material";
import { ListSubheader, type ListSubheaderProps } from "@mui/material";
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
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { type SxProps, type Theme } from "@mui/material/styles";

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
        sx={[baseTriggerStyles, ...(Array.isArray(sx) ? sx : [sx])].filter(Boolean)}
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
    <span className={cn(!ctx.selectedLabel && "text-muted-foreground", className)}>
      {value ?? null}
    </span>
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

  const handleClose: NonNullable<MenuProps["onClose"]> = (event, reason) => {
    onClose?.(event, reason);
    ctx.setOpen(false);
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
      PaperProps={{
        elevation: 0,
        ...PaperProps,
        className: cn(
          "mt-2 max-h-64 min-w-[180px] overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md",
          PaperProps?.className,
        ),
        sx: {
          minWidth: ctx.triggerWidth,
          borderRadius: "var(--radius)",
          ...PaperProps?.sx,
        },
      }}
      MenuListProps={{
        dense: true,
        ...MenuListProps,
        className: cn("p-1", MenuListProps?.className),
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
  ({ value, className, children, onClick, ...props }, ref) => {
    const ctx = useSelectContext();
    const selected = ctx.value === value;

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
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
          selected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
          props.disabled && "pointer-events-none opacity-50",
          className,
        )}
      >
        {children}
      </MenuItem>
    );
  },
);

SelectItem.displayName = "SelectItem";

export type SelectLabelProps = ListSubheaderProps;

export const SelectLabel = forwardRef<HTMLLIElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <ListSubheader
      {...props}
      ref={ref}
      className={cn("px-2.5 py-1.5 text-xs font-semibold text-muted-foreground", className)}
    />
  ),
);

SelectLabel.displayName = "SelectLabel";

export interface SelectGroupProps extends PropsWithChildren {
  className?: string;
}

export const SelectGroup = ({ className, children }: SelectGroupProps) => (
  <div className={cn("py-1", className)}>{children}</div>
);

SelectGroup.displayName = "SelectGroup";

export const SelectSeparator = ({ className, ...props }: ComponentProps<typeof Divider>) => (
  <Divider {...props} className={cn("my-1", className)} />
);

SelectSeparator.displayName = "SelectSeparator";
