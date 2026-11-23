import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-4 shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-2", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h3 className={cn("font-heading text-xl font-semibold", className)}>{children}</h3>
  );
}

export function CardDescription({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-2", className)}>{children}</div>;
}