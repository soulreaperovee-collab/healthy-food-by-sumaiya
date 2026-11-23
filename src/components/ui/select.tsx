import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select = React.forwardRef<
  HTMLDivElement,
  SelectProps
>(({ className, options, value, onChange, placeholder, ...props }, ref) => (
  <div
    className={cn(
      "relative",
      className
    )}
    ref={ref}
    {...props}
  >
    <div className="relative">
      <span className="select-none text-sm text-muted-foreground">{placeholder || "Select"}</span>
      <div className="py-1" role="listbox">
        {options.map((option) => (
          <button
            key={option.value}
            className={cn(
              "flex items-center rounded-sm px-2 py-1 text-sm select-none hover:bg-primary hover:text-primary-foreground",
              value === option.value && "bg-primary text-primary-foreground"
            )}
            onClick={() => onChange(option.value)}
            role="option"
            aria-selected={value === option.value}
            data-state={value === option.value ? "selected" : ""}
            data-disabled={false}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  </div>
));
Select.displayName = "Select";