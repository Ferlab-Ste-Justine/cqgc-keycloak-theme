import { useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
    id: string;
    label: ReactNode;
    /** Error message; also flags the input as invalid. May contain sanitized HTML from Keycloak. */
    error?: string;
    hint?: ReactNode;
    children: ReactNode;
    className?: string;
};

export function FormField({
    id,
    label,
    error,
    hint,
    children,
    className
}: FormFieldProps) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label htmlFor={id} className="font-medium text-cqgc-gray-9">
                {label}
            </Label>
            {children}
            {error ? (
                <p
                    id={`${id}-error`}
                    aria-live="polite"
                    className="text-xs text-destructive"
                    dangerouslySetInnerHTML={{ __html: error }}
                />
            ) : (
                hint && (
                    <p id={`${id}-hint`} className="text-xs text-cqgc-gray-7">
                        {hint}
                    </p>
                )
            )}
        </div>
    );
}

/** Input with an icon rendered inside, on the right. */
export function IconInput({
    icon,
    className,
    ...props
}: ComponentProps<typeof Input> & { icon: ReactNode }) {
    return (
        <div className="relative">
            <Input className={cn("pr-9", className)} {...props} />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-cqgc-gray-6 [&_svg]:size-4">
                {icon}
            </span>
        </div>
    );
}

/** Password input with a show/hide toggle. */
export function PasswordInput({
    className,
    showLabel,
    hideLabel,
    ...props
}: Omit<ComponentProps<typeof Input>, "type"> & {
    showLabel: string;
    hideLabel: string;
}) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="relative">
            <Input
                type={revealed ? "text" : "password"}
                className={cn("pr-9", className)}
                {...props}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-cqgc-gray-6 hover:text-cqgc-gray-8 [&_svg]:size-4"
                aria-label={revealed ? hideLabel : showLabel}
                aria-controls={props.id}
                onClick={() => setRevealed(r => !r)}
            >
                {revealed ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
}
