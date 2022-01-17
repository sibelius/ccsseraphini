import { render } from '@testing-library/react';

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
// @ts-ignore
const Providers = ({ children }) => {
  return children;
};

// @ts-ignore
const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
