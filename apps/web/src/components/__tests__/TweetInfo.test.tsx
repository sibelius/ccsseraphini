import { render, screen } from '@testing-library/react';
import 'whatwg-fetch';
import TweetInfo from '../TweetInfo';

const mockTweetWithNonImageUrl = {
  author_id: '2313873457',
  id: '1488482763548332041',
  public_metrics: {
    retweet_count: 17,
    reply_count: 1,
    like_count: 38,
    quote_count: 0,
  },
  created_at: new Date('2022-02-01T12:02:00.000Z'),
  text: 'cc @sseraphini "1 month project" thread\n\nI had the idea of a simple website to make it easy to tweet tagging cc @sseraphini \n\nthis was the first commit https://t.co/DkCC6j6up3 at January 13th 2022\n\nusing @vercel nextjs to make it easy to ship to production since day one',
  attachments: {
    media_keys: ['lorem', 'ipsum', 'dolor'],
  },
  userInfo: {
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1468721117351272454/Tuv9X1zm_normal.jpg',
    id: '2313873457',
    url: 'https://t.co/NYIykSdSvA',
    name: 'Sibelius Seraphini',
    username: 'sseraphini',
  },
};

const mockTweetWithImageUrl = {
  id: '1488537875021021185',
  attachments: {
    media_keys: ['3_1488537866712006659'],
  },
  text: '@rochacbruno @sseraphini O cc @sseraphini é quase um Omegle do twitter https://pbs.twimg.com/media/FKhZTZwWQAMl8T7.png',
  public_metrics: {
    retweet_count: 0,
    reply_count: 0,
    like_count: 11,
    quote_count: 0,
  },
  author_id: '1246517146156437505',
  created_at: new Date('2022-02-01T15:40:59.000Z'),
  userInfo: {
    id: '1246517146156437505',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1476934748610170891/2iHDRKuB_normal.jpg',
    username: 'wgabrielpereira',
    name: 'Gabriel Pereira',
    url: 'https://t.co/g5SwNMGC7Q',
  },
};

const mockTweetWithoutUrl = {
  created_at: new Date('2022-02-01T19:34:09.000Z'),
  text: "What do you folks think about the @NordVPN services? Are they worth it? There's a better VPN service?\n\ncc @sseraphini",
  public_metrics: {
    retweet_count: 1,
    reply_count: 2,
    like_count: 5,
    quote_count: 0,
  },
  author_id: '1448643729338818560',
  id: '1488596551563988995',
  attachments: {
    media_keys: ['lorem', 'ipsum', 'dolor'],
  },
  userInfo: {
    url: 'https://t.co/VZD64NNV0N',
    name: 'rondow.ts',
    id: '1448643729338818560',
    username: 'rond0w',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1484234096096292864/w2j0j0Pi_normal.jpg',
  },
};

const mockTweetWithHashtag = {
  created_at: new Date('2022-02-25T14:02:41.000Z'),
  id: '1497210444875972609',
  author_id: '41742474',
  public_metrics: {
    retweet_count: 4,
    reply_count: 0,
    like_count: 5,
    quote_count: 0,
  },
  text:
    'test #react web #javascript everywhere #graphql for api #nodejs backend\n' +
    '\n' +
    'cc @sseraphini',
  userInfo: {
    id: '41742474',
    username: 'tgmarinho',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1199361273978327040/6jEpAmdL_normal.jpg',
    url: 'https://t.co/HChDjNy56x',
    name: 'Thiago Marinho',
  },
  attachments: {
    media_keys: ['lorem', 'ipsum', 'dolor'],
  },
};

// migrate to jest-fetch-mock
beforeAll(() => {
  jest.spyOn(window, 'fetch');

  // @ts-ignore
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }),
  });
});

afterEach(() => jest.resetAllMocks());

describe('TweetInfo', () => {
  it('should render link preview when there is a non-image url', async () => {
    render(<TweetInfo tweet={mockTweetWithNonImageUrl} key="foo" />);
    expect(screen.getByTestId('link-preview-wrapper')).toBeInTheDocument();
  });

  it('should not render link preview when there is an image url', async () => {
    render(<TweetInfo tweet={mockTweetWithImageUrl} key="bar" />);
    expect(screen.queryByTestId('link-preview-wrapper')).toBeNull();
  });

  it('should not render link preview when there is not an url', async () => {
    render(<TweetInfo tweet={mockTweetWithoutUrl} key="baz" />);
    expect(screen.queryByTestId('link-preview-wrapper')).toBeNull();
  });

  it('should hashtag word to be a link', async () => {
    render(
      <TweetInfo tweet={mockTweetWithHashtag} key={mockTweetWithHashtag.id} />,
    );

    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('#graphql')).toBeInTheDocument();

    expect(screen.getByText('#react').closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/hashtag/react?src=hashtag_click',
    );
    expect(screen.getByText('#graphql').closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/hashtag/graphql?src=hashtag_click',
    );
    expect(screen.getByText('#javascript').closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/hashtag/javascript?src=hashtag_click',
    );
  });

  it('should tweet interactions be a link', async () => {
    render(
      <TweetInfo tweet={mockTweetWithHashtag} key={mockTweetWithHashtag.id} />,
    );

    expect(screen.getByText('Retweets').closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/tgmarinho/status/1497210444875972609/retweets',
    );

    expect(screen.getByText('Quote Tweets').closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/tgmarinho/status/1497210444875972609/retweets/with_comments',
    );

    expect(screen.getByText('Likes').closest('a')).toHaveAttribute(
      'href',
      'https://twitter.com/tgmarinho/status/1497210444875972609/likes',
    );
  });
});
