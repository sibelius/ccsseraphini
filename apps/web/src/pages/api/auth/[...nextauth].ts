import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { config } from 'config';
import { JWTToken, JWTParams } from '../../../types/Auth';

async function refreshAccessToken(token: JWTToken) {
  const { refresh_token } = token;

  if (!refresh_token) {
    return token;
  }

  try {
    const url = 'https://api.twitter.com/2/oauth2/token';

    const confidentialClientAuthHeader = Buffer.from(
      `${config.TWITTER_CLIENT_ID}:${config.TWITTER_CLIENT_SECRET}`,
    ).toString('base64');
    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: config.TWITTER_CLIENT_ID,
        client_secret: config.TWITTER_CLIENT_SECRET,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${confidentialClientAuthHeader}`,
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error({ error });

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  callbacks: {
    session({ session, token }) {
      session = { ...session, ...token };

      return session;
    },
    async jwt({ token, account, profile, user }: JWTParams) {
      if (account && user) {
        const { username } = profile?.data as { username?: string };
        const { refresh_token, access_token } = account as {
          refresh_token?: string;
          access_token?: string;
        };
        const accessTokenExpires =
          Date.now() + (account.expires_at as number) / 10;

        return {
          accessTokenExpires,
          access_token,
          refresh_token,
          user,
          username,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
  providers: [
    TwitterProvider({
      clientId: config.TWITTER_CLIENT_ID,
      clientSecret: config.TWITTER_CLIENT_SECRET,
      version: '2.0',
      authorization: {
        url: 'https://twitter.com/i/oauth2/authorize',
        params: {
          // scope: "users.read tweet.read offline.access like.read list.read",
          scope: 'users.read tweet.read offline.access tweet.write',
        },
      },
    }),
  ],
});
