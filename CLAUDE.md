# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

CQGC Keycloak **login + email** theme, built with Keycloakify 11 + Vite + Tailwind v4 + shadcn/ui, targeting Keycloak 26. The JAR registers the theme name `keycloakify-cqgc-app` (kept from the legacy theme so realm settings keep working). No account theme (`accountThemeImplementation: "none"`).

It is a rewrite of the Keycloakify 7 / antd / redux theme in `Ferlab-Ste-Justine/cqgc-keycloak` (`cqgc-theme/`). Only the theme was ported: no Java providers, and no custom registration page (it depended on those providers).

## Commands

```bash
npm run dev                    # mock pages: /?page=login.ftl&lang=fr&client=clin-prescription-client&error=credentials
npm run storybook              # stories in src/login/pages/*.stories.tsx
npm run build                  # tsc + vite build
npm run build-keycloak-theme   # → dist_keycloak/: cqgc-keycloak-theme.jar, theme/ dir, cqgc-keycloak-theme.tar.gz (needs Maven)
npx keycloakify start-keycloak --keycloak-version 26.3.3   # real KC in Docker, testuser/password123
npx eslint src && npx prettier --write .
```

There are no unit tests; verify with Storybook/dev mocks and `start-keycloak`. The `start-keycloak` test realm is persisted in `.keycloakify/realm-kc-26.json` (committed; admin-console changes are written back to it). It is preconfigured with en/fr and SMTP to Mailpit on `host.docker.internal:1025`.

## Architecture

- `src/login/KcPage.tsx` routes on `kcContext.pageId`. Custom CQGC pages live in `src/login/pages/` (login, reset password, update password, verify email, page expired, error). Every other page falls through to Keycloakify's `DefaultPage` + default `Template` with Keycloak's own CSS (`doUseDefaultCss`).
- Custom pages do **not** use Keycloakify's `Template`; they render `components/SideImageLayout.tsx` and take `PageProps<PageId>` (`pages/PageProps.ts`).
- **CSS scoping:** `src/login/index.css` (Tailwind + CQGC tokens mapped to shadcn variables) is imported only by `SideImageLayout`, so Vite code-splits it with the lazy custom pages and Tailwind's preflight never reaches the fallback pages. Don't import it from `main.tsx` or `KcPage.tsx`.
- shadcn components are in `src/components/ui/`, already restyled to the legacy antd look (2px radius, blue-8 primary, 32px controls). Palette tokens are `cqgc-blue-*` / `cqgc-gray-*` in `index.css`.
- Forms use **native POSTs** to `url.loginAction`, with client-side validation in `onSubmit` (`preventDefault` only when invalid). Never fetch/parse Keycloak HTML responses (the legacy theme did with `eval`). Server-side field errors come from `messagesPerField`; other messages are shown with `components/MessageAlert.tsx`.
- Reset password confirmation: Keycloak 26 answers a reset request with `login.ftl` + a `success` message. The reset page stores the email in `sessionStorage` (`RESET_EMAIL_STORAGE_KEY` in `utils.ts`), and `Login.tsx` shows the confirmation screen when both are present.
- `clin-prescription-client` (see `utils.ts`) switches the login title and username label and hides the language switcher.
- "Action expired" is detected by matching `message.summary` text (`isExpiryMessage`); update the list if Keycloak's wording changes.
- `KcContext.ts` extensions: `client.baseUrl` (present at runtime, used by Cancel buttons) and `error.ftl`'s optional `showWhiteListInfoPage` (only set if the legacy whitelist provider is deployed).
- `postBuild` in `vite.config.ts` also copies the generated theme to `dist_keycloak/theme/` and archives it (`cqgc-keycloak-theme.tar.gz`) for directory-based deployment.
- Languages are limited to en/fr in three places: `LOCALES` in `vite.config.ts` (a `postBuild` hook rewrites `locales=` in the generated login `theme.properties`), `src/email/theme.properties`, and `SUPPORTED_LANGUAGES` in `components/LanguageSwitcher.tsx` (hides other languages a realm might enable).
- Custom strings (en/fr) are in `src/login/i18n.ts` (`withCustomTranslations`). French strings keep a space before `:` and `?`.
- Mocks: `KcPageStory.tsx` (shared by Storybook and `devKcContext.ts`, which is only loaded by `npm run dev`).

## Email theme

`src/email/` is copied into the JAR as-is (plain FreeMarker, not React). The HTML templates are standalone table-based emails that use custom message keys (`cqgc`, `passwordResetBodyHtml1..3`, `verificationEmailSignature`, …) from `messages/messages_{en,fr}.properties`; add new keys to both files. Properties files need Java escaping (`é`, `''` for apostrophes).
