import styled from '@emotion/styled';
import { Button, Grid } from '@chakra-ui/react';

const MOBILE_BREAKPOINT = '768px';

/**
 * ScorePageStyled: page
 *   ScoreVisual
 *     TicketStyled: the whole area
 *       TicketBoxStyled: background wrapper
 *       ScoreProfile
 *         ScoreProfileStyled
 *       ScoreInfo
 *         ScoreInfoGridStyled
 *       SSeraphini: the man himself
 *   Button
 */

export const ScorePageStyled = styled.section`
  background: #cbc9d5;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    justify-content: flex-start;
    height: unset;
    min-height: 100vh;
  }
`;

export const ButtonStyled = styled(Button)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    position: relative;
    left: 0;
    bottom: 0;
    transform: none;
    margin: 5% auto;
  }
`;

export const TicketStyled = styled.div`
  position: relative;
  color: white;
  width: 90%;
  max-width: 625px;
  padding: 38px;

  .ticketBox {
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 0;
    left: 0;
    &::before {
      content: '';
      width: 100%;
      display: block;
      padding-bottom: ${(330 / 650) * 100}%; /* keep original proportion */
    }

    svg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: contain;
      object-position: center;
    }
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 10%;
    padding: 0;
    display: flex;
    flex-direction: column;

    max-width: 330px;

    .ticketBox {
      position: relative;
      &::before {
        padding-bottom: ${(560 / 330) * 100}%; /* keep original proportion */
      }
    }

    .content-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 38px 10%;
    }
  }
`;

export const ScoreProfileStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;

  .name {
    font-size: large;
    max-width: 60ch;

    @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
      font-size: normal;
      max-width: 20ch;
    }
  }
`;

export const ScoreInfoGridStyled = styled(Grid)`
  gap: 10px 50px;
  width: 375px;
  max-width: 100%;
  margin: 30px 20% 0 30px;
  grid-template-columns: repeat(3, 1fr);
  position: relative;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 12px 6px;
    grid-template-columns: 1fr 1fr;
    margin: 17.5% 0 0;
    width: 100%;
  }
`;

export const SSeraphiniStyled = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  height: 40px;
  top: calc(50% - 96px);
  right: -21.5%;
  width: 192px;
  transform-origin: top left;
  transform: rotate(90deg);

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}) {
    top: unset;
    right: unset;
    transform: none;
    margin: auto auto 0;
    position: relative;
  }
`;
