import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { keycloakify } from "keycloakify/vite-plugin";

/** Languages offered by the theme (Keycloakify would otherwise declare ~30). Keep in sync with src/email/theme.properties. */
const LOCALES = ["en", "fr"];

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        keycloakify({
            themeName: "keycloakify-cqgc-app",
            accountThemeImplementation: "none",
            keycloakVersionTargets: {
                "all-other-versions": "cqgc-keycloak-theme.jar",
                "22-to-25": false
            },
            // Runs in the generated resources directory, before the JAR is packaged.
            postBuild: async buildContext => {
                const file = path.join(
                    "theme",
                    buildContext.themeNames[0],
                    "login",
                    "theme.properties"
                );
                const content = fs.readFileSync(file, "utf8");
                fs.writeFileSync(
                    file,
                    content.replace(/^locales=.*$/m, `locales=${LOCALES.join(",")}`)
                );
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
