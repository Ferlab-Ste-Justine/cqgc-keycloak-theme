import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { KcContext } from "../KcContext";

const icons = {
    success: CircleCheck,
    info: Info,
    warning: TriangleAlert,
    error: CircleAlert
};

/** Displays a Keycloak message (kcContext.message) that isn't already shown next to a field. */
export function MessageAlert({
    message,
    title
}: {
    message: NonNullable<KcContext["message"]>;
    title?: string;
}) {
    const Icon = icons[message.type];

    return (
        <Alert variant={message.type === "error" ? "destructive" : message.type}>
            <Icon />
            {title && <AlertTitle>{title}</AlertTitle>}
            <AlertDescription>
                <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
            </AlertDescription>
        </Alert>
    );
}
