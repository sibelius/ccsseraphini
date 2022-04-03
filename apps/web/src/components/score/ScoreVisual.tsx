import ScoreProfile from './ScoreProfile';
import ScoreInfo from './ScoreInfo';
import { UserScore } from 'types/Score';
import { User } from 'types/User';
import { Text, Image, useMediaQuery, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ScoreColored from './ScoreColored';
import ScoreColoredMobile from './ScoreColoredMobile';
import { SSeraphiniStyled, TicketStyled } from './ScoreStyle';

type Props = {
  size?: number;
  user?: User;
  userScore: UserScore;
};

export default function ScoreVisual({ user, userScore }: Props) {
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
    <TicketStyled>
      <Box className="ticketBox">{ticketElement}</Box>
      <div className="content-wrapper">
        <ScoreProfile user={user} />
        <ScoreInfo userScore={userScore} />
        <SSeraphiniStyled>
          <Image
            h={'40px'}
            border={'2px solid gray'}
            rounded={'full'}
            src={`https://pbs.twimg.com/profile_images/1494329046678659072/RprvW5s4.jpg`}
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
