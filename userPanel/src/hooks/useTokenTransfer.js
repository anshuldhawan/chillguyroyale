import { useState, useCallback } from "react";
import {
  Connection,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

const CHILL_GUY_ADDRESS = new PublicKey(import.meta.env.VITE_CHILL_GUY_ADDRESS);
const RECEIVER_KEYPAIR = new PublicKey(import.meta.env.VITE_RECEIVER_ADDRESS);

export const useTokenTransfer = () => {
  // console.log("mintAddress", mintAddress);

  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=dfb8c139-1703-44ad-8209-de11036a4882", "confirmed");
  const { publicKey, sendTransaction } = useWallet();

  console.log("publicKey=------->", publicKey.toString());

  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signature, setSignature] = useState(null);

  const transferSOL = useCallback(
    async (amount) => {
      console.log("Amount when SOL----->>>", amount);
      setIsLoading(true);
      setError(null);
      setSignature(null);

      console.log("publicKey=------->", publicKey.toString());

      try {
        if (!publicKey) {
          throw new Error("Wallet not connected");
        }

        const transferAmount = BigInt(Math.round(amount * LAMPORTS_PER_SOL));
        console.log("transferAmount", transferAmount);
        console.log(
          `Transferring ${amount} SOL from ${publicKey?.toString()} to ${RECEIVER_KEYPAIR}...`
        );

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: RECEIVER_KEYPAIR,
            lamports: transferAmount,
          })
        );
        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction submitted with signature:", signature);

        await connection.confirmTransaction(signature, "processed");
        console.log("Transaction confirmed!");
        console.log(`SOL Transfer successful with signature: ${signature}`);

        return signature;
        // setSignature(sig);
      } catch (err) {
        const errorMessage = err?.message || err?.toString() || "Unknown error";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [connection, publicKey, sendTransaction, RECEIVER_KEYPAIR]
  );

  const transferChillGuy = useCallback(
    async (amount) => {
      console.log("Amount when ChillGuy----->>>", amount);
      setIsLoading(true);
      setError(null);
      setSignature(null);

      try {
        if (!publicKey) {
          console.log("transferChillGuy, public key not available!!");
          throw new Error("Wallet not connected");
        }

        console.log("transferChillGuy, CHILL_GUY_ADDRESS", CHILL_GUY_ADDRESS);
        console.log("transferChillGuy, publicKey", publicKey);

        let senderTokenAccount = await getAssociatedTokenAddressSync(
          CHILL_GUY_ADDRESS,
          publicKey
        );

        let receiverTokenAccount = await getAssociatedTokenAddressSync(
          CHILL_GUY_ADDRESS,
          RECEIVER_KEYPAIR
        );

        // Transfer details
        const transferAmount = amount * Math.pow(10, 6); // 1 Token has 6 decimals

        console.log("transferChillGuy, senderTokenAccount", senderTokenAccount);
        console.log(
          "transferChillGuy, receiverTokenAccount",
          receiverTokenAccount
        );

        const transferInstruction = await createTransferCheckedInstruction(
          senderTokenAccount,
          CHILL_GUY_ADDRESS,
          receiverTokenAccount,
          publicKey,
          transferAmount,
          6, // Token has 6 decimal places
          []
        );

        // Create transaction and send
        const transaction = new Transaction().add(transferInstruction);
        const signature = await sendTransaction(transaction, connection);

        console.log("Transaction submitted with signature:", signature);

        await connection.confirmTransaction(signature, "processed");
        console.log("Transaction confirmed!");

        setSignature(signature);
        return signature;
      } catch (err) {
        console.error("Error during USDC transfer:", err?.massage);
        setError(err?.massage);
      } finally {
        setIsLoading(false);
      }
    },
    [connection, publicKey, sendTransaction, CHILL_GUY_ADDRESS]
  );

  return { transferSOL, transferChillGuy, isloading, error, signature };
};
