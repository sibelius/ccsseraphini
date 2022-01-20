import { Button } from '@chakra-ui/react';

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import { ccsseraphiniAddressSolana } from './cryptoAddress';
import * as web3 from '@solana/web3.js';
import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { PhantomLogo } from './PhantomLogo';

declare const window: any;

export const donateAmount = 0.04;

export const DonateSol = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const onDonate = useCallback(async (lamports: number) => {
    try {
      setIsLoading(true);
      // Phantom provider
      await window.solana.connect();
      const buyerWallet = await window.solana;
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const sibeliusWallet = new PublicKey(ccsseraphiniAddressSolana);
      const transferSolIx = web3.SystemProgram.transfer({
        fromPubkey: buyerWallet.publicKey,
        lamports: LAMPORTS_PER_SOL * lamports,
        toPubkey: sibeliusWallet,
      });

      const transferSolTx = new Transaction();
      transferSolTx.add(transferSolIx);
      const recentBlockhash = await connection.getRecentBlockhash();
      transferSolTx.recentBlockhash = recentBlockhash.blockhash;
      transferSolTx.feePayer = buyerWallet.publicKey;
      const signedTx = await buyerWallet.signTransaction(transferSolTx);
      const idTx = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(idTx);

      toast({
        title: 'Successfull Donation',
        description: 'Thanks for the donation',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
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
  }, []);

  return (
    <Button
      backgroundColor="white"
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="lg"
      leftIcon={<PhantomLogo width={100} height={100} />}
      mt={{ base: '0', md: '10px' }}
      size="sm"
      onClick={() => onDonate(donateAmount)}
      isLoading={isLoading}
    >
      Donate Crypto 0.04 SOL (~5,00USD)
    </Button>
  );
};
