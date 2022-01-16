import { render, screen } from '@testing-library/react';
import ForkMeCorner from '../ForkMeCorner';

describe('ForkMeCorner', () => {
  it('should render the component properly', () => {
    const repo = 'https://github.com/sibelius/ccsseraphini';
    render(<ForkMeCorner repo={repo} />);

    expect(
      screen.getByRole('link', { name: 'View source on GitHub' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link').href).toBe(repo);
  });
});
