# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start            # Dev server (Vite)
npm run build            # Type-check + Vite build (tsc -b && vite build)
npm run lint             # ESLint (flat config)
npm run prettier         # Check formatting
npm run prettier:fix     # Auto-fix formatting
npm run test             # Vitest (no coverage)
npm run test:ci          # Vitest with coverage report
npm run update           # ncu interactive dependency update (runs prettier, lint, build, test as doctor)
```

To run a single test file:
```bash
npx vitest run src/components/pages/LoginForm/index.test.tsx
```

## Environment

- `.env` at root holds `VITE_APOLLO_URL`, `VITE_CRYPT_METH`, and `VITE_CRYPT_SECRET`. Accessed via `import.meta.env`.
- ESLint ignores `src/functions/methods.ts`.

## Path Aliases

Defined in both `vite.config.ts` and `tsconfig.app.json`. Always use aliases for cross-module imports:

| Alias | Maps to |
|---|---|
| `@molecules/*` | `src/components/molecules/*` |
| `@organisms/*` | `src/components/organisms/*` |
| `@templates/*` | `src/components/templates/*` |
| `@pages/*` | `src/components/pages/*` |
| `@constants/*` | `src/constants/*` |
| `@context/*` | `src/context/*` |
| `@functions/*` | `src/functions/*` |
| `@graphql/*` | `src/graphql/*` |
| `@interfaces/*` | `src/interfaces/*` |
| `@hooks/*` | `src/hooks/*` |

## Architecture

**Stack:** React 19 + Vite + TypeScript + Apollo Client (GraphQL) + Formik + reactive-bulma (UI component library) + Luxon (dates).

**Entry point:** `src/main.tsx` renders `<AppWrapper />` inside `StrictMode`.

**Provider tree (`AppWrapper`):** Sets up Apollo Client (with auth link that reads the JWT from localStorage) and provides `UserContext` (holds logged-in user state). This is the single place where both providers live.

**Routing (`App/index.tsx`):** All routes are declared here using `react-router-dom` `<Routes>`. Every page is lazy-loaded via `React.lazy` with a shared `<Suspense>` fallback (ProgressBar). Route paths are sourced from the `APP_ROUTES` enum in `src/constants/routes.ts`.

**Auth flow:** On login, the JWT + user info is persisted to localStorage via `src/functions/local-storage.ts`. Apollo's `SetContextLink` reads it on every request. On logout, localStorage is cleared and `UserContext` is set to null.

**GraphQL layer:** Queries live in `src/graphql/queries.ts`, mutations in `src/graphql/mutations.ts`. All typed with interfaces from `src/interfaces/graphql.ts`. Components consume them directly with Apollo's `useQuery` / `useMutation` hooks.

**Page structure:** Each page lives in `src/components/pages/<PageName>/` and follows this pattern:
- `index.tsx` — main page component. Owns Apollo hooks, orchestrates data flow, renders layout.
- `form.tsx` — custom Formik hook (returns the formik instance + the `FormFieldProps` config objects that drive reactive-bulma's `<FormField>`). Only exists on form pages.
- `parsers.ts` — transforms form data before sending to the API (date formatting, ID lookups, etc.). Only on pages that need it.
- `index.test.tsx` — unit tests.
- `mocks.json` — test mock data. Always imported from this file in tests; never hardcode mock payloads inline.

**Constants convention:** All hardcoded UI strings must live in `src/constants/` as enums (preferred) or exported `const`. Each constants file groups by domain: `forms.ts` has per-form label + test-ID enums, `lists.ts` has list-page labels, `layout.ts` has the nav header labels, `routes.ts` has route paths, `common.ts` has shared labels, `formats.ts` has date format strings.

**Interfaces:** All TypeScript interfaces are centralized in `src/interfaces/`. Files: `graphql.ts` (API payloads/responses), `forms.ts` (Formik form data shapes + formik prop types), `components.ts` (shared UI prop types), `context.ts` (context shape).

**Utility functions (`src/functions/`):**
- `local-storage.ts` — generic get/set/clear wrappers + logged-user helpers.
- `encrypt.ts` — password encryption via crypto-js (method chosen by env var).
- `parsers.ts` — date formatting (Luxon), array-to-string, boolean-to-string, and other display helpers.
- `methods.ts` — generic utilities (e.g. debouncer).

**Shared template components (`src/components/templates/`):** Reusable page-level fragments. Currently only `ErrorMessage` — renders a reactive-bulma `<Message>` when an Apollo error is present, null otherwise.

## Testing Patterns

- Framework: Vitest with `globals: true`, jsdom environment, `@testing-library/react`.
- `tests/setup.ts` mocks `localStorage` before each test and runs cleanup after.
- Apollo mutations/queries are mocked via `<MockedProvider>` from `@apollo/client/testing/react`.
- `react-router-dom`'s `useNavigate` is mocked with `vi.mock` at file scope.
- Mock data is always imported from the co-located `mocks.json`. Never duplicate mock payloads inline.
- Coverage config (`vitest.config.ts`) only covers `src/**/*.tsx` and `src/functions/**/*.ts`.
- Function-level tests live in `src/functions/tests/` and pull mocks from `src/functions/mocks/*.json`.
