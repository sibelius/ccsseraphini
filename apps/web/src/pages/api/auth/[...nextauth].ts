import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { config } from '../../../config';
import { AccountProfile } from 'types/Score';
import { userScore } from '../userScore';

export default NextAuth({
  callbacks: {
    async signIn({ account, profile }: AccountProfile) {
      if (account.provider === 'twitter') {
        const score = await userScore({ account, profile });
        console.log(score);
      }

      return true;
    },
    session({ session, token }) {
      session.id = token.sub;
      return session;
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
      profile(props) {
        const { data } = props;
        return {
          id: data.id,
          name: data.name,
          image: data.profile_image_url,
        };
      },
    }),
  ],
});
