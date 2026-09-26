import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "h-8 w-full min-w-0 rounded-md border border-input bg-white px-3 py-1 text-sm transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-cqgc-gray-6 hover:border-cqgc-blue-7 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-cqgc-gray-3 disabled:text-cqgc-gray-6",
                "focus-visible:border-cqgc-blue-7 focus-visible:ring-2 focus-visible:ring-ring",
                "aria-invalid:border-destructive aria-invalid:bg-cqgc-red-0 aria-invalid:ring-destructive/20",
                className
            )}
            {...props}
        />
    );
}

export { Input };
