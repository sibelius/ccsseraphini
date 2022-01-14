import { useColorMode, IconButton, Container } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW="160ch"
      justifyContent={'end'}
      alignItems={'end'}
      display={'flex'}
    >
      {/* IconButton */}
      {colorMode === 'light' ? (
        <IconButton
          aria-label="Switcher"
          justifyItems={'end'}
          my="20px"
          m="8"
          isRound
          color="gray.800"
          icon={<MoonIcon />}
          variant="outline"
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          aria-label="Switcher"
          my="20px"
          m="8"
          isRound
          color="yellow.500"
          icon={<SunIcon />}
          variant="outline"
          onClick={toggleColorMode}
        />
      )}
    </Container>
  );
}
