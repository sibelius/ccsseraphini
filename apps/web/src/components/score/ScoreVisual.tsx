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
    <Flex justifyContent="center">
      <Box position="absolute" w="80%" h="80%" maxW="625px">
        {ticketElement}
      </Box>
      <Flex
        style={{ ['--size' as string]: size }}
        position="absolute"
        flexDirection="column"
        w="100%"
        h="80%"
        maxW="625px"
        justifyContent={cssProps.profile.containerJustifyContent}
        sx={{ transform: 'translateZ(0)' }}
      >
        <Box>
          <ScoreProfile user={user} isDesktop={isLargerThan768} />
        </Box>
        <Flex
          width={'100%'}
          justifyContent={cssProps.info.justifyContent}
          margin={cssProps.info.margin}
        >
          <ScoreInfo userScore={userScore} isDesktop={isLargerThan768} />
        </Flex>
        <Box
          width="100%"
          height={cssProps.wrapper.containerHeight}
          position="relative"
        >
          <Box
            position="absolute"
            bottom={cssProps.wrapper.bottom}
            right="0"
            fontWeight={'bold'}
            width={cssProps.wrapper.width}
            textAlign={'center'}
            transform={cssProps.number.transform}
            transformOrigin={cssProps.number.transformOrigin}
          >
            <Flex alignItems="center" justifyContent="center">
              <Image
                h={'40px'}
                border={'2px solid gray'}
                rounded={'full'}
                src={`https://pbs.twimg.com/profile_images/1494329046678659072/RprvW5s4.jpg`}
                alt={'sseraphini'}
              />
              <Text fontSize="xl" ml="3">
                cc @sseraphini
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
