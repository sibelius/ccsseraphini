import { Button, Stack } from '@chakra-ui/react';

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import { ccsseraphiniAddressSolana } from './cryptoAddress';
declare const window: any;
const web3 = require('@solana/web3.js');

export const DonateSol = () => {
  async function onDonate(Lamports: 0.04) {
    // Phantom provider
    await window.solana.connect();
    const buyerWallet = await window.solana;
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const sibeliusWallet = new PublicKey(ccsseraphiniAddressSolana);
    const transferSolIx = web3.SystemProgram.transfer({
      fromPubkey: buyerWallet.publicKey,
      lamports: LAMPORTS_PER_SOL * Lamports,
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
  }

  return (
    <Button
      backgroundColor="white"
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="lg"
      // leftIcon={}
      mt={{ base: '0', md: '10px' }}
      size="sm"
      onClick={() => onDonate(0.04)}
    >
      Donate Crypto 0.04 SOL (~5,00USD)
    </Button>
  );
};
