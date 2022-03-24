import { render, screen } from '@testing-library/react';
import { TwitterLogin } from '../home/TwitterLogin';
import { SessionProvider } from 'next-auth/react';

describe('TwitterLogin', () => {
  it('should render the component properly', () => {
    render(
      <SessionProvider>
        <TwitterLogin />
      </SessionProvider>,
    );

    expect(
      screen.getByRole('button', { name: 'Login with Twitter' }),
    ).toBeInTheDocument();
  });
});
