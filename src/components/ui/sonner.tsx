"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-emerald-500 dark:text-emerald-400" />
        ),
        info: <InfoIcon className="size-4 text-sky-500 dark:text-sky-400" />,
        warning: (
          <TriangleAlertIcon className="size-4 text-amber-500 dark:text-amber-400" />
        ),
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin text-primary" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--popover)] group-[.toaster]:text-[var(--popover-foreground)] group-[.toaster]:border-[var(--border)] group-[.toaster]:shadow-lg group-[.toaster]:rounded-[var(--radius)] font-sans",
          description: "group-[.toast]:text-muted-foreground font-sans text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toast]:border-destructive/30 group-[.toast]:bg-red-50/80 dark:group-[.toast]:bg-red-950/20",
          success:
            "group-[.toast]:border-emerald-500/30 group-[.toast]:bg-emerald-50/80 dark:group-[.toast]:bg-emerald-950/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
