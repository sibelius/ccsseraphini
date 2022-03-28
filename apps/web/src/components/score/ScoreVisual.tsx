import ScoreProfile from './ScoreProfile';
import ScoreInfo from './ScoreInfo';
import { UserScore } from 'types/Score';
import { User } from 'types/User';
import {
  Text,
  Image,
  HStack,
  Box,
  useMediaQuery,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { mobileData, defaultData } from './ScoreConfig';
import ScoreColored from './ScoreColored';
import ScoreColoredMobile from './ScoreColoredMobile';

type Props = {
  size?: number;
  user?: User;
  userScore: UserScore;
};

export default function ScoreVisual({ size = 1, user, userScore }: Props) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cssProps, setCssProps] = useState<Record<string, any>>(defaultData);
  const [ticketElement, setTicketElement] = useState(<ScoreColored />);

  useEffect(() => {
    if (isLargerThan768) {
      setCssProps(defaultData);
      setTicketElement(<ScoreColored />);
    } else {
      setCssProps(mobileData);
      setTicketElement(<ScoreColoredMobile />);
    }
  }, [isLargerThan768]);

  return (
    <Flex
      style={{ ['--size' as string]: size }}
      pos={'relative'}
      sx={{ transform: 'translateZ(0)' }}
    >
      <Box display={'flex'}>{ticketElement}</Box>
      <Box
        zIndex={1}
        position={'absolute'}
        top={0}
        height={'100%'}
        p={'46px 29px'}
      >
        <ScoreProfile user={user} size={size} />
      </Box>
      <Box
        zIndex={1}
        position={'absolute'}
        top={cssProps.info.top}
        width={'100%'}
        height={'100%'}
        padding={cssProps.profile.padding}
      >
        <ScoreInfo userScore={userScore} />
      </Box>
      <Box
        pos={'absolute'}
        bottom={cssProps.wrapper.bottom}
        right={cssProps.wrapper.right}
      >
        <Box
          fontWeight={'bold'}
          fontSize={'2xl'}
          lineHeight={'1'}
          width={`calc(330px * var(--size))`}
          textAlign={'center'}
          transform={cssProps.number.transform}
          transformOrigin={cssProps.number.transformOrigin}
        >
          <HStack h={'10px'} pl={'5%'}>
            <Image
              h={'50px'}
              border={'2px solid gray'}
              rounded={'full'}
              src={`https://pbs.twimg.com/profile_images/1494329046678659072/RprvW5s4.jpg`}
              alt={'sseraphini'}
            />
          </HStack>
          <Text>cc @sseraphini</Text>
        </Box>
      </Box>
    </Flex>
  );
}
