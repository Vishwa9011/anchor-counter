import { Connection, PublicKey } from "@solana/web3.js";
import { CounterProgramId, counterIdl } from "@/solana";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const getProgram = (connection: Connection, wallet: AnchorWallet): Program<Idl> => {
  const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
  return new Program(counterIdl as Idl, CounterProgramId, provider);
}

export const getCounterPDA = () => {
  return (PublicKey.findProgramAddressSync([Buffer.from("counter")], CounterProgramId))[0];
}

export const confirmTx = async (txHash: string, connection: Connection) => {
  const blockhashInfo = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: blockhashInfo.blockhash,
    lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
    signature: txHash,
  })
}