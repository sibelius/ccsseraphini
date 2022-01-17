import { useColorMode, IconButton, Container, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export function Header() {
  const { toggleColorMode } = useColorMode();
  const { color, icon } = useColorModeValue({ color: 'gray.800', icon: <MoonIcon /> }, { color: 'yellow.500', icon: <SunIcon /> })

  return (
    <Container
      maxW="160ch"
      justifyContent="end"
      alignItems="end"
      display="flex"
    >
      <IconButton
        aria-label="Switcher"
        m="8"
        isRound
        color={color}
        icon={icon}
        variant="outline"
        onClick={toggleColorMode}
      />
    </Container>
  );
}
