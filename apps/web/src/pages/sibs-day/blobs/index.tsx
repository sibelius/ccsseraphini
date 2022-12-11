import { Box } from '@chakra-ui/react';
import type { LayoutProps } from '@chakra-ui/react';

type InsetDirections = 'top' | 'right' | 'bottom' | 'left';
type SizeResponsiveValue = LayoutProps['height'];

type BlobProps = {
  bg?: string;
  size: SizeResponsiveValue;
  inset: Partial<Record<InsetDirections, string>>;
  borderRadius: string | number;
};

const Blob = ({ bg, size, inset, borderRadius }: BlobProps) => (
  <Box
    position="absolute"
    top={inset?.top}
    left={inset?.left}
    right={inset?.right}
    bottom={inset?.bottom}
    bgGradient={bg}
    borderRadius={borderRadius}
    height={size}
    width={size}
  />
);

export default Blob;
