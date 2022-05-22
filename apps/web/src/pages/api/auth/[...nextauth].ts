import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { config } from '../../../config';

export default NextAuth({
  callbacks: {
    session({ session, token }) {
      session.id = token.sub;
      session.access_token = token.access_token;
      session.username = token.username;

      return session;
    },
    async jwt({ token, account, profile }) {
      if (profile != undefined) {
        const { data }: any = profile;
        const { username } = data;
        token.username = username as string;
      }
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
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
