import { withSentry } from '@sentry/nextjs';
import { getTwitterUsers } from './getTwitterUsers';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRanking } from 'modules/ranking/getRanking';
import { TwitterUser, UserRanking } from 'types/Ranking';

const rankingHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const ranking: UserRanking[] = await getRanking();
    const users = await getTwitterUsers(ranking.map((user) => user._id));
    const usersMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {} as Record<string, TwitterUser>);

    const updatedRanking: UserRanking[] = ranking
      .filter((user) => usersMap[user._id])
      .map((user) => {
        const twitterUser = usersMap[user._id];
        return {
          ...user,
          profileImageUrl: twitterUser.profile_image_url,
          username: twitterUser.username,
          name: twitterUser.name,
        };
      })
      .sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score; // Higher scores come first

        return b.lastTweetRanked.getTime() - a.lastTweetRanked.getTime();
      });
    res.status(200).json(updatedRanking);
  } catch (error) {
    console.error('Error getting ranking:', error);
    return res.status(500).json({ message: 'Error getting ranking' });
  }
};

export default withSentry(rankingHandler);
