import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

type ProvidersOptions = {
  children: ReactElement;
};

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: ProvidersOptions) => {
  return children;
};

const customRender = (ui: ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
