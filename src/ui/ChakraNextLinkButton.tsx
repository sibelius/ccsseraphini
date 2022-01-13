import Link from "next/link";
import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
} & ButtonProps;
export const ChakraNextLinkButton = ({ href, children, ...props }: Props) => {
  return (
    <Link href={href} passHref>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  );
};
