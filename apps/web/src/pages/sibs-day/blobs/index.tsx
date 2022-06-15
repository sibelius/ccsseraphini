// type Inset = 'top' | 'left' | 'right' | 'bottom';
// type Insets = Partial<Record<Inset, string>>;
import { Box } from '@chakra-ui/react';

const Blob = ({
  bg,
  borderRadius,
  height,
  width,
  inset,
}: // TODO: Resolve inset stuff with ChakraUI
// @eslint-disable-next-line @typescript-eslint/no-explicit-any
Record<string, string> & any) => (
  <Box
    position="absolute"
    top={inset?.top}
    left={inset?.left}
    right={inset?.right}
    bottom={inset?.bottom}
    bgGradient={bg}
    borderRadius={borderRadius}
    height={height}
    width={width}
  ></Box>
);

export default Blob;
