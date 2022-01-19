import { Button, Stack } from '@chakra-ui/react';
import { MetaMaskLogo } from './MetaMaskLogo';
import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import { ccsseraphiniAddressEthereum } from './cryptoAddress';
import { useToast } from '@chakra-ui/react';

declare let window: any;
const web3 = require('@solana/web3.js');

export const donateAmount = '0.002';

export const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const DonateCrypto = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const onDonate = useCallback(async (retry = false) => {
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
  async function donateSol(Lamports: 0.04) {
    // Phantom provider
    await window.solana.connect();
    const buyerWallet = await window.solana;
    console.log(buyerWallet);
    let connection = new Connection('https://api.mainnet-beta.solana.com');
    let sibeliusWallet = new PublicKey(
      '24gVn4dinDmqHeCmXHhySet3swxMc3Jup7iYSFTbgztm',
    );
    let transferSolIx = web3.SystemProgram.transfer({
      fromPubkey: buyerWallet.publicKey,
      lamports: LAMPORTS_PER_SOL * Lamports,
      toPubkey: sibeliusWallet,
    });

    let transferSolTx = new Transaction();
    transferSolTx.add(transferSolIx);

    let recentBlockhash = await connection.getRecentBlockhash();
    transferSolTx.recentBlockhash = recentBlockhash.blockhash;

    transferSolTx.feePayer = buyerWallet.publicKey;

    let signedTx = await buyerWallet.signTransaction(transferSolTx);
    console.log('signedTx: ', signedTx);
    let idTx = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(idTx);
  }
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
        <Button
          backgroundColor="white"
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          /* leftIcon={} */
          mt={{ base: '0', md: '10px' }}
          size="sm"
          onClick={() => donateSol(0.04)}
          isLoading={isLoading}
        >
          Donate Crypto {'0.04'} SOL (~5,00USD)
        </Button>
      </Stack>
    </>
  );
};
