import type { ReactNode } from "react";

export function FormShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10 ${className}`.trim()}>
      {children}
    </div>
  );
}
