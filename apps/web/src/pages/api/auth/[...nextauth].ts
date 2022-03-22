import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { config } from '../../../config';

export default NextAuth({
  callbacks: {
    session({ session, token }) {
      session.id = token.sub;
      session.access_token = token.access_token;

      return session;
    },
    async jwt({ token, account }) {
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
      userinfo: {
        params: {
          'user.fields': ['id'],
          'tweet.fields': ['text'],
        },
      },
      profile({ data }) {
        return {
          id: data.id,
          name: data.name,
          image: data.profile_image_url,
        };
      },
    }),
  ],
});
