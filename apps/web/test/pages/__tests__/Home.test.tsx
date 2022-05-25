import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../../src/pages';
import { ChakraProvider } from '@chakra-ui/react';

beforeAll(() => {
  fetchMock.doMock();
});

afterEach(() => fetchMock.resetMocks());

beforeEach(() => {
  render(
    <ChakraProvider>
      <Home />
    </ChakraProvider>,
  );
});

it('should render the page properly', () => {
  // not valid anymore
  // const image = screen.getByAltText('Sibelius Seraphini');
  // expect(image).toBeInstanceOf(HTMLImageElement);
  // expect(image).toBeInTheDocument();

  const ForkMeCornerComponent = screen.getByRole('link', {
    name: 'View source on GitHub',
  });
  expect(ForkMeCornerComponent).toBeInTheDocument();
});

it('should have a link with the correct value', () => {
  const user = `\ncc @sseraphini`;
  const encode = (str: string) => encodeURIComponent(str);

  const textarea = screen.getByRole('textbox');

  expect(screen.getByText('Tweet').closest('a')).toHaveAttribute(
    'href',
    `https://twitter.com/intent/tweet?text=${encode(user)}`,
  );

  const newText = 'Which do you prefer X or Y';

  // trigger onChange event and check if the tweet text is updated
  fireEvent.change(textarea, { target: { value: newText } });

  const tweet = `${newText}${user}`;

  expect(screen.getByText('Tweet').closest('a')).toHaveAttribute(
    'href',
    `https://twitter.com/intent/tweet?text=${encode(tweet)}`,
  );
});

it('should display a correct counter when the value changes', () => {
  const user = `\ncc @sseraphini`;

  const textarea = screen.getByRole('textbox');

  let count = 279 - user.length;
  const badge = screen.getByText(`${count}`);

  expect(badge).toHaveTextContent(count.toString());

  const newText = 'Which do you prefer X or Y';

  // trigger onChange event and check if the tweet text is updated
  fireEvent.change(textarea, { target: { value: newText } });

  count = count - newText.length;
  expect(badge).toHaveTextContent(count.toString());
});

it('should have a link with the twitter follow url', () => {
  const user = `sseraphini`;

  expect(screen.getByText('Follow').closest('a')).toHaveAttribute(
    'href',
    `https://twitter.com/intent/user?screen_name=${user}`,
  );
});

it('should have a link with the patreon url', () => {
  const user = `sibelius`;

  expect(screen.getByText('Sponsor').closest('a')).toHaveAttribute(
    'href',
    `https://www.patreon.com/${user}`,
  );
});

it('should have a link with the articles url', () => {
  const user = `sibelius`;

  expect(screen.getByText('Articles').closest('a')).toHaveAttribute(
    'href',
    `https://${user}.substack.com/`,
  );
});
