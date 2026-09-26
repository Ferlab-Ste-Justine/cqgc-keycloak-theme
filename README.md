# CQGC Keycloak theme

Login and email theme for the CQGC (Centre québécois de génomique clinique) Keycloak, built with [Keycloakify 11](https://docs.keycloakify.dev), Vite, Tailwind CSS v4 and shadcn/ui. Targets Keycloak 26.

The built JAR registers a theme named **`keycloakify-cqgc-app`** (login + email). The account console stays Keycloak's built-in one.

## Prerequisites

- Node 20+ and npm
- Maven 3.1.1+ and Java 17+ (used by `keycloakify build` to package the JAR)
- Docker (only for `start-keycloak`)

## Development

```bash
npm install
npm run dev          # http://localhost:5173/?page=login.ftl&lang=fr
npm run storybook    # every custom page with its scenarios
```

Dev server query parameters: `page` (any Keycloak page id), `lang` (`fr`/`en`), `client` (e.g. `clin-prescription-client`), `error=credentials`.

## Test in a real Keycloak

Start Keycloak with the theme. It stays in the foreground, and the theme is rebuilt and reloaded on each change in `src/`:

```bash
npx keycloakify start-keycloak --keycloak-version 26.3.3 --port 8080
```

The test realm `myrealm` is stored in `.keycloakify/realm-kc-26.json` (committed). It is loaded on each start, and changes you make in the admin console are saved back to that file. It is already configured with the CQGC login and email theme, en/fr as languages, and outgoing emails sent to Mailpit (`host.docker.internal:1025`).

### Optional: catch emails with Mailpit

Only needed to test flows that send emails (forgot password, email verification). Start Mailpit (UI at http://localhost:8025) before or after Keycloak:

```bash
docker run -d --name cqgc-mailpit -p 8025:8025 -p 1025:1025 axllent/mailpit
```

### URLs

| What | URL | Credentials |
|---|---|---|
| Login (via the account console) | http://localhost:8080/realms/myrealm/account | `testuser` / `password123` (email `testuser@gmail.com`) |
| Admin console | http://localhost:8080/admin | `admin` / `admin` |
| Mailpit (if started) | http://localhost:8025 | — |

To test the prescription-client variant, create a client named `clin-prescription-client` in `myrealm` and log in through it.

To stop everything, press Ctrl+C in the Keycloak terminal, then run (drop `cqgc-mailpit` if you didn't start it):

```bash
docker rm -f cqgc-mailpit keycloak-keycloakify
```

## Build

```bash
npm run build-keycloak-theme
```

Outputs in `dist_keycloak/`:

| File | Use |
|---|---|
| `cqgc-keycloak-theme.jar` | Theme packaged as a provider |
| `theme/keycloakify-cqgc-app/` | The same theme as a plain directory (`login/`, `email/`) |
| `cqgc-keycloak-theme.tar.gz` | Archive of that directory |

### Deploy as a provider (JAR)

Copy the JAR into Keycloak's `providers/` directory, run `kc.sh build`, and restart.

### Deploy as a theme directory

Extract the archive into Keycloak's `themes/` directory, so that you get `/opt/keycloak/themes/keycloakify-cqgc-app/{login,email}`, then restart Keycloak. No `kc.sh build` is needed. For example, in a Dockerfile:

```dockerfile
FROM quay.io/keycloak/keycloak:26.3.3
# ADD extracts local .tar.gz archives automatically
ADD dist_keycloak/cqgc-keycloak-theme.tar.gz /opt/keycloak/themes/
```

Or on a running server:

```bash
tar -xzf cqgc-keycloak-theme.tar.gz -C /opt/keycloak/themes/
```

Keycloak caches themes in production mode, so restart it after replacing the files.

Either way, select `keycloakify-cqgc-app` as the realm's login and email theme (Realm settings → Themes).
