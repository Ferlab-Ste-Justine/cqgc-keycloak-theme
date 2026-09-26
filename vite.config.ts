import { execFileSync } from "node:child_process";
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
                const themeName = buildContext.themeNames[0];

                const file = path.join("theme", themeName, "login", "theme.properties");
                const content = fs.readFileSync(file, "utf8");
                fs.writeFileSync(
                    file,
                    content.replace(/^locales=.*$/m, `locales=${LOCALES.join(",")}`)
                );

                // Also ship the theme as a plain directory + archive, for deployments that copy
                // it into Keycloak's themes/ directory instead of installing the JAR provider.
                // Same files as the JAR, minus the register-user-profile.ftl/update-user-profile.ftl
                // aliases Keycloakify adds later for Keycloak <= 23 (not used by Keycloak 26).
                const outDir = path.join(buildContext.keycloakifyBuildDirPath, "theme");
                fs.rmSync(outDir, { recursive: true, force: true });
                fs.cpSync(path.join("theme", themeName), path.join(outDir, themeName), {
                    recursive: true
                });
                execFileSync("tar", [
                    "-czf",
                    path.join(
                        buildContext.keycloakifyBuildDirPath,
                        "cqgc-keycloak-theme.tar.gz"
                    ),
                    "-C",
                    outDir,
                    themeName
                ]);
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
