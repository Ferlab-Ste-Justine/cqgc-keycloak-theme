import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { I18n } from "../i18n";

type Props = {
    icon?: ReactNode;
    title: ReactNode;
    children?: ReactNode;
    /** Show the support contact block below the message. */
    contact?: boolean;
    /** Optional sentence introducing the contact block. */
    contactText?: ReactNode;
    align?: "center" | "start";
    i18n: I18n;
};

/** Icon + title + message (+ support contact), used by the error, expiry, info and confirmation screens. */
export function StatusMessage({
    icon,
    title,
    children,
    contact = false,
    contactText,
    align = "center",
    i18n
}: Props) {
    return (
        <section
            className={cn(
                "mx-20 flex max-w-[680px] flex-col gap-2",
                align === "center" ? "items-center text-center" : "items-start gap-8"
            )}
        >
            {icon && <div className="mb-6">{icon}</div>}
            <h1 className="text-base">{title}</h1>
            {children && <div className="mb-6 flex flex-col gap-2">{children}</div>}
            {contact && <ContactBlock i18n={i18n} text={contactText} />}
        </section>
    );
}

export function ContactBlock({ i18n, text }: { i18n: I18n; text?: ReactNode }) {
    const { msgStr } = i18n;
    const email = msgStr("error_contact_email");

    return (
        <address className="flex flex-col gap-1 not-italic">
            {text && <p>{text}</p>}
            <span>{msgStr("error_contact_name")}</span>
            <a href={`mailto:${email}`}>{email}</a>
            <span>{msgStr("error_contact_phone")}</span>
        </address>
    );
}
