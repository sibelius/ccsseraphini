import { render, screen } from '@testing-library/react';
import { ForkMe } from 'fork-me-corner';

describe('ForkMeCorner', () => {
  it('should render the component properly', () => {
    const repo = 'https://github.com/sibelius/ccsseraphini';
    render(<ForkMe repo={repo} />);

    expect(
      screen.getByRole('link', { name: 'View source on GitHub' }),
    ).toBeInTheDocument();
    expect(screen.getByRole<HTMLAnchorElement>('link').href).toBe(repo);
  });
});
