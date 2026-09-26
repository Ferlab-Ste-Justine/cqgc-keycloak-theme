import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
    "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    {
        variants: {
            variant: {
                default: "bg-card text-card-foreground",
                info: "border-cqgc-blue-4 bg-cqgc-blue-1 text-cqgc-gray-8 [&>svg]:text-cqgc-blue-6",
                success:
                    "border-[#b7eb8f] bg-[#f5ffeb] text-cqgc-gray-8 [&>svg]:text-[#389e0d]",
                warning:
                    "border-[#ffd591] bg-[#fff7e6] text-cqgc-gray-8 [&>svg]:text-[#d46b08]",
                destructive:
                    "border-destructive/40 bg-cqgc-red-1 text-cqgc-gray-8 *:data-[slot=alert-description]:text-cqgc-gray-8 [&>svg]:text-destructive"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

function Alert({
    className,
    variant,
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
                className
            )}
            {...props}
        />
    );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                "col-start-2 grid justify-items-start gap-1 text-sm text-cqgc-gray-8 [&_p]:leading-relaxed",
                className
            )}
            {...props}
        />
    );
}

export { Alert, AlertTitle, AlertDescription };
