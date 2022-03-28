/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Text, Grid, GridItem } from '@chakra-ui/react';
import { UserScore } from 'types/Score';

type Props = {
  userScore: UserScore;
};

export default function ScoreInfo({ userScore }: Props) {
  const metricName: Map<string, string> = new Map([
    ['tweet_count', 'Tweets'],
    ['retweet_count', 'Retweets'],
    ['reply_count', 'Replies'],
    ['like_count', 'Likes'],
    ['quote_count', 'Quotes'],
    ['total', 'Total'],
  ]);

  return (
    <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={2}>
      {Object.entries(userScore).map((val, i) => {
        return (
          <GridItem key={val[0] + i} pl={2}>
            <Text fontWeight={'bold'} fontSize={['2xl', 'xl']}>
              {metricName.get(val[0])}
            </Text>
            <Text fontSize={['xl', 'md']}>{val[1]}</Text>
          </GridItem>
        );
      })}
    </Grid>
  );
}
