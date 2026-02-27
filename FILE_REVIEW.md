# File Review Notes

This review summarizes key files and highlights maintainability or correctness concerns observed during a quick audit.

## High-level structure

- `src/main.js`: Boots Vue app and registers Pinia + Router.
- `src/router/index.js`: Defines routes and auth-based navigation guard.
- `src/store/useBudgetStore.js`: Core budget state (transactions, categories, totals, recurring items, theme/currency).
- `src/store/useAuthStore.js`: LocalStorage-based signup/login session state.
- `package.json`: Build/lint scripts and dependency manifest.

## Findings

1. **Router auth guard subscribes on every navigation** (`src/router/index.js`):
   - `beforeEach` currently calls `onAuthStateChanged` each time a guarded route is entered.
   - This can accumulate listeners over time and is heavier than needed for route checks.
   - Suggested improvement: initialize auth state once at app bootstrap and check a cached user/auth flag in `beforeEach`.

2. **Inconsistent persistence in budget store** (`src/store/useBudgetStore.js`):
   - `addTransaction` and `deleteTransaction` write to `localStorage`, but `addIncome`, `addExpense`, `addTransfer`, and `addCategory` do not.
   - This may cause user-visible data loss after reload when these alternate actions are used.
   - Suggested improvement: centralize transaction/category mutations and persist consistently.

3. **Security weakness in local auth store** (`src/store/useAuthStore.js`):
   - Passwords are saved in plain text in `localStorage`.
   - Acceptable for demos, but unsafe for production.
   - Suggested improvement: remove local credential storage and use Firebase Auth flows end-to-end.

4. **Dependency manifest includes mixed ecosystem packages** (`package.json`):
   - Multiple React-specific dependencies are present in a Vue app (`@radix-ui/react-*`, `framer-motion`, `lucide-react`).
   - This increases install size and maintenance overhead if unused.
   - Suggested improvement: prune unused dependencies and run a usage audit.

5. **Project contains committed build artifacts and dependencies**:
   - The repository includes `dist/` and `node_modules/` files.
   - Suggested improvement: rely on lockfiles + CI builds and avoid committing generated/vendor directories.

## Overall

The app structure is understandable and lint currently passes. The most impactful next step is to fix state persistence consistency in `useBudgetStore` and simplify the router auth guard logic.
