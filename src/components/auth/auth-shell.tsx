import React from "react";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: React.ReactNode;
  className?: string;
  heroTitle?: string;
  heroSubtitle?: string;
};

export function AuthShell({
  children,
  className,
  heroTitle = "Welcome",
  heroSubtitle = "Secure access to your account",
}: AuthShellProps) {
  return (
    <div className={cn("relative min-h-svh overflow-hidden bg-background", className)}>
      {/* subtle grid and radial glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_50%_at_50%_0%,hsl(var(--muted-foreground)/0.12)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_400px_at_10%_10%,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_400px_at_90%_90%,hsl(var(--chart-3)/0.08),transparent_60%)]" />

      <div className="mx-auto grid min-h-svh w-full max-w-6xl grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        <div className="relative hidden items-center justify-center p-10 md:flex">
          <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="relative z-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">{heroTitle}</h1>
            <p className="mt-3 text-balance text-muted-foreground">{heroSubtitle}</p>
          </div>
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-chart-3/20 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
