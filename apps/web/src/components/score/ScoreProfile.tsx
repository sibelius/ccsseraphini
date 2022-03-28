/* eslint-disable @next/next/no-img-element */
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

import { Image, Text, GridItem, Grid } from '@chakra-ui/react';
import { User } from 'types/User';

type Props = {
  user?: User;
  size?: number;
};

export default function ScoreProfile({ user }: Props) {
  const { name, username, profile_image_url } = user as User;
  const avatarUrl = profile_image_url.replace('_normal', '');

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
      <GridItem>
        <Image
          w="80px"
          border={'2px solid white'}
          rounded={'full'}
          src={avatarUrl || `https://unavatar.io/twitter/${username}`}
          crossOrigin={'anonymous'}
          alt={username}
        />
      </GridItem>
      <GridItem alignSelf={'center'}>
        <Text>{name}</Text>
        <Text>{'@' + username}</Text>
      </GridItem>
    </Grid>
  );
}
