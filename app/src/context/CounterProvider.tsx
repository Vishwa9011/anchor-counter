"use client"

import { SystemProgram } from "@solana/web3.js";
import { confirmTx, getCounterPDA, getProgram } from "@/lib/utils";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CounterContextProps = {
  count: number;
  isInitialized: boolean;
  initCounter: () => void;
  increment: () => void;
  decrement: () => void;
}

const CounterContext = createContext<CounterContextProps | null>(null);

const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const program = useMemo(() => {
    if (!connection || !wallet) return;
    return getProgram(connection, wallet);
  }, [connection, wallet]);
  console.log('program: ', program);

  const getCount = useCallback(async () => {
    if (!program || !wallet) return 0;
    try {
      const count = await program.account.counter.fetch(getCounterPDA());
      setCount(Number(count?.count) || 0);
      setIsInitialized(true);
    } catch (error) {
      console.log('error: ', error);
      setIsInitialized(false);
      return 0;
    }
  }, [program, wallet]);

  const initCounter = async () => {
    if (!program || !wallet) return;
    try {
      const counterPDA = getCounterPDA();
      const tx = await program.methods
        .initialize()
        .accounts({ counter: counterPDA, user: wallet.publicKey, systemProgram: SystemProgram.programId })
        .rpc();
      await confirmTx(tx, connection);
      await getCount();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const increment = async () => {
    if (!program || !wallet) return;
    try {
      const tx = await program.methods
        .increment()
        .accounts({ counter: getCounterPDA() })
        .rpc();

      await confirmTx(tx, connection);
      await getCount();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const decrement = async () => {
    if (!program || !wallet) return;
    try {
      const tx = await program.methods
        .decrement()
        .accounts({ counter: getCounterPDA() })
        .rpc();
      await confirmTx(tx, connection);
      await getCount();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {
    getCount()
  }, [getCount])

  return (
    <CounterContext.Provider value={{ count, isInitialized, initCounter, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterProvider;

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
