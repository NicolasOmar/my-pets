# AI Coding Agent Instructions for MyPets Frontend

Welcome to the MyPets frontend codebase! This document provides essential guidelines for AI coding agents to be productive and aligned with the project's architecture, workflows, and conventions.

## Project Overview
- **Frameworks and Tools**: This project uses React, TypeScript, and Vite for development. Testing is done with Vitest.
- **Architecture**: The codebase is organized into `components`, `pages`, `templates`, and `functions`. Each directory has a clear purpose:
  - `components`: Reusable UI components.
  - `pages`: Page-level components that define routes.
  - `templates`: Common UI patterns.
  - `functions`: Utility functions and business logic.
- **Data Flow**: The app uses GraphQL for data fetching. Queries and mutations are defined in `src/graphql`.
- **State Management**: Context API is used for managing global state (e.g., `userContext.ts`).

## Developer Workflows
### Building and Running
- Use `npm start` to start the development server.
- Use `npm run build` to create a production build.
- Use `npm run start:prod` to serve the production build locally.

### Testing
- Tests are written using Vitest. To run all tests:
  ```bash
  
  ```
- To run specific tests for `App` and `AppWrapper` components, use the predefined task:
  ```bash
  npm test run src/components/App/index.test.tsx src/components/AppWrapper/index.test.tsx
  ```

### Debugging
- Use browser developer tools for debugging React components.
- For GraphQL queries, use tools like Apollo Client DevTools.

## Project-Specific Conventions
- **File Structure**: Each component/page has its own directory with `index.tsx` for the main logic and `index.test.tsx` for tests.
- **Styling**: Styles are written in SCSS and located in the `sass/` directory.
- **Mocks**: JSON files in `mocks/` directories are used for testing and development.
- **Testing Setup**: Shared test setup is in `tests/setup.ts`.

## Integration Points
- **GraphQL**: Queries and mutations are defined in `src/graphql`. Ensure proper typing using `src/interfaces/graphql.ts`.
- **Routing**: Routes are defined in `src/constants/routes.ts`.
- **Local Storage**: Utility functions for local storage are in `src/functions/local-storage.ts`.

## Examples
### Adding a New Component
1. Create a new directory under `src/components/`.
2. Add `index.tsx` for the component logic.
3. Add `index.test.tsx` for tests.
3. Add `mocks.json` for test mocks.

### Writing a Test
- Use Vitest for unit tests. Example:
  ```typescript
  import { render, screen } from '@testing-library/react';
  import MyComponent from './index';

  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
  ```

## Notes for AI Agents
- Follow the existing patterns in the codebase for consistency.
- Always write tests for new functionality.
- Ensure TypeScript types are correctly defined and used.
- When modifying GraphQL queries/mutations, update the corresponding types in `src/interfaces/graphql.ts`.

For any questions or unclear areas, consult the `README.md` or ask for clarification.