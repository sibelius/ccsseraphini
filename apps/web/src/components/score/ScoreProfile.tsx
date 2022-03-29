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

import { User } from 'types/User';
import { Text, Image, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { mobileData, defaultData } from './ScoreConfig';

type Props = {
  user?: User;
  isDesktop: boolean;
};

export default function ScoreProfile({ user, isDesktop }: Props) {
  const { name, username, profile_image_url } = user as User;
  const avatarUrl = profile_image_url.replace('_normal', '');
  const [cssProps, setCssProps] = useState<Record<string, any>>(defaultData);

  useEffect(() => {
    if (isDesktop) {
      setCssProps(defaultData);
    } else {
      setCssProps(mobileData);
    }
  }, [isDesktop]);

  return (
    <Flex
      alignItems="center"
      justifyContent={cssProps.profile.justifyContent}
      margin={cssProps.profile.margin}
    >
      <Image
        w="70px"
        boxShadow="0 0 0 3px black, 0 0 0 5px white"
        rounded={'full'}
        src={avatarUrl || `https://unavatar.io/twitter/${username}`}
        crossOrigin={'anonymous'}
        alt={username}
        ml="10px"
      />
      <Box
        textAlign={cssProps.profile.textAlign}
        fontSize={cssProps.profile.fontSize}
        ml={cssProps.profile.textMarginLeft}
      >
        <Text
          maxW={cssProps.profile.maxWidth}
          fontWeight={cssProps.profile.fontWeight}
        >
          {name}
        </Text>
        <Text color="gray">{'@' + username}</Text>
      </Box>
    </Flex>
  );
}
