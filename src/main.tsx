import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";

async function main() {
    // `npm run dev`: mock a page with e.g. /?page=login.ftl&lang=fr&client=clin-prescription-client
    if (import.meta.env.DEV && !window.kcContext) {
        const { getDevKcContext } = await import("./login/devKcContext");
        window.kcContext = getDevKcContext(new URLSearchParams(window.location.search));
    }

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            {!window.kcContext ? (
                <h1>No Keycloak Context</h1>
            ) : (
                <KcPage kcContext={window.kcContext} />
            )}
        </StrictMode>
    );
}

main();
