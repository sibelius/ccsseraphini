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

import { Text, GridItem, Flex } from '@chakra-ui/react';
import { UserScore } from 'types/Score';
import { ScoreInfoGridStyled } from './ScoreStyle';

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
    <ScoreInfoGridStyled
      templateColumns={'repeat(auto-fit, minmax(150px, 1fr))'}
      alignItems="center"
    >
      {Object.entries(userScore).map((val, i) => {
        if (val[0] === 'total') return;
        return (
          <GridItem key={val[0] + i}>
            <Text fontWeight={'bold'} fontSize="xl" textAlign="center">
              {metricName.get(val[0])}
            </Text>
            <Text
              fontSize="xl"
              textAlign="center"
              color="gray"
              fontWeight="bold"
            >
              {val[1].toLocaleString()}
            </Text>
          </GridItem>
        );
      })}
      <GridItem>
        <Flex
          flexDirection="column"
          position="relative"
          textAlign="center"
          backgroundColor="#6741D9"
          borderRadius="20px"
          padding="9px 17px"
        >
          <Text fontWeight="bold">TOTAL</Text>
          <Text
            display="inline"
            fontWeight="bold"
            position="relative"
            fontSize="xl"
          >
            {userScore.total.toLocaleString()}
          </Text>
        </Flex>
      </GridItem>
    </ScoreInfoGridStyled>
  );
}
