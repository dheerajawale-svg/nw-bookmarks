import { Alert, AlertTitle, Snackbar, type SnackbarCloseReason } from "@mui/material";
import type { AlertColor } from "@mui/material/Alert";
import type { PropsWithChildren, ReactNode } from "react";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

export type ToastActionElement = ReactNode;

export interface ToastProps {
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  duration?: number;
  variant?: ToastVariant;
  className?: string;
}

interface ToastProviderProps extends PropsWithChildren {}

const severityMap: Record<ToastVariant, AlertColor> = {
  default: "info",
  destructive: "error",
  success: "success",
  warning: "warning",
  info: "info",
};

const defaultDuration = 5000;

export const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    {children}
    <Toaster />
  </>
);

export const Toaster = () => {
  const { toasts, dismiss } = useToast();

  const handleClose = useCallback(
    (toastId: string, onOpenChange?: (open: boolean) => void) =>
      (_event: unknown, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
          return;
        }

        onOpenChange?.(false);
        dismiss(toastId);
      },
    [dismiss],
  );

  return (
    <>
      {toasts.map((toast) => {
        const severity = severityMap[toast.variant ?? "default"];
        const showTitle = Boolean(toast.title);

        return (
          <Snackbar
            key={toast.id}
            open={toast.open}
            autoHideDuration={toast.duration ?? defaultDuration}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={handleClose(toast.id, toast.onOpenChange)}
            disableWindowBlurListener
            ContentProps={{ sx: { pointerEvents: "auto" } }}
          >
            <Alert
              elevation={6}
              variant="filled"
              severity={severity}
              icon={false}
              onClose={toast.onOpenChange ? handleClose(toast.id, toast.onOpenChange) : undefined}
              action={toast.action}
              sx={{
                width: "min(100vw - 32px, 360px)",
                borderRadius: "var(--radius)",
                backgroundColor:
                  toast.variant === "destructive"
                    ? "hsl(var(--destructive))"
                    : toast.variant === "success"
                      ? "hsl(var(--accent))"
                      : "hsl(var(--card))",
                color:
                  toast.variant === "destructive"
                    ? "hsl(var(--destructive-foreground))"
                    : "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
                boxShadow:
                  "0px 20px 25px -5px rgba(15, 23, 42, 0.1), 0px 10px 10px -5px rgba(15, 23, 42, 0.04)",
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                p: 2.25,
              }}
            >
              <div className="flex flex-col gap-1 text-sm">
                {showTitle ? <AlertTitle className="font-semibold text-sm leading-tight">{toast.title}</AlertTitle> : null}
                {toast.description ? <div className="text-sm text-muted-foreground">{toast.description}</div> : null}
              </div>
            </Alert>
          </Snackbar>
        );
      })}
    </>
  );
};

interface ToastActionProps extends PropsWithChildren {
  altText: string;
}

export const ToastAction = ({ children }: ToastActionProps) => <>{children}</>;
