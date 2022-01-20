import { Button, Stack } from '@chakra-ui/react';
import { MetaMaskLogo } from './MetaMaskLogo';
import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import { ccsseraphiniAddressEthereum } from './cryptoAddress';
import { useToast } from '@chakra-ui/react';

declare let window: any;

export const donateAmount = '0.002';

export const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const DonateEth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const onDonate = useCallback(async (retry = false) => {
    if (window.ethereum === undefined) {
      toast({
        title: 'Error',
        description: 'Check if MetaMask is installed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const accounts = await provider.listAccounts();
    const connectedAccounts = accounts.length;

    if (connectedAccounts > 0) {
      const network = await provider.getNetwork();

      // TODO - remove this check in development
      if (network.chainId !== 1) {
        toast({
          title: 'Error',
          description: 'Only mainnet is available for donations',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      // wait 1 second to avoid race conditions
      await delay(1000);

      const tx = {
        to: ccsseraphiniAddressEthereum,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(donateAmount),
      };

      // eslint-disable-next-line
      console.log({
        tx,
      });

      setIsLoading(true);

      try {
        // Send a transaction
        const transaction = await signer.sendTransaction(tx);

        // eslint-disable-next-line
        console.log({
          transaction,
        });

        const result = await transaction.wait();

        // eslint-disable-next-line
        console.log({
          result,
        });

        toast({
          title: 'Successfull Donation',
          description: 'Thanks for the donation',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
        toast({
          title: 'Error',
          description: JSON.stringify(err),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

      setIsLoading(false);
    } else {
      if (retry) {
        // setIsLoading(false);
        return;
      }

      await provider.send('eth_requestAccounts', []);

      onDonate(true);
    }
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        direction={{ base: 'row', md: 'column' }}
        mt={{ base: '10px', md: '0' }}
        justify="center"
      >
        <Button
          backgroundColor="white"
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          leftIcon={<MetaMaskLogo width={20} height={20} />}
          mt={{ base: '0', md: '10px' }}
          size="sm"
          onClick={() => onDonate(false)}
          isLoading={isLoading}
        >
          Donate Crypto {donateAmount} ETH (~5,00USD)
        </Button>
      </Stack>
    </>
  );
};
