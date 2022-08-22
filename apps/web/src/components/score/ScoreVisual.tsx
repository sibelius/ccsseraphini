import ScoreProfile from './ScoreProfile';
import ScoreInfo from './ScoreInfo';
import { UserScore } from 'types/Score';
import { User } from 'types/User';
import { Text, Image, useMediaQuery, Box } from '@chakra-ui/react';
import { MutableRefObject, useEffect, useState } from 'react';
import ScoreColored from './ScoreColored';
import ScoreColoredMobile from './ScoreColoredMobile';
import { SSeraphiniStyled, TicketStyled } from './ScoreStyle';

type Props = {
  user?: User;
  userScore: UserScore;
  scoreRef: MutableRefObject<HTMLDivElement | null>;
};

export default function ScoreVisual({ user, userScore, scoreRef }: Props) {
  const [isDesktop] = useMediaQuery('(min-width: 769px)');
  const [ticketElement, setTicketElement] = useState(<ScoreColored />);

  useEffect(() => {
    if (isDesktop) {
      setTicketElement(<ScoreColored />);
    } else {
      setTicketElement(<ScoreColoredMobile />);
    }
  }, [isDesktop]);

  return (
    <TicketStyled ref={scoreRef}>
      <Box className="ticketBox">{ticketElement}</Box>
      <div className="content-wrapper">
        <ScoreProfile user={user} />
        <ScoreInfo userScore={userScore} />
        <SSeraphiniStyled>
          <Image
            h={'40px'}
            border={'2px solid gray'}
            rounded={'full'}
            src={`https://pbs.twimg.com/profile_images/1559456023278125059/zC_h0-c8_400x400.jpg`}
            alt={'sseraphini'}
          />
          <Text fontSize="xl" ml="3" fontWeight="bold">
            cc @sseraphini
          </Text>
        </SSeraphiniStyled>
      </div>
    </TicketStyled>
  );
}
