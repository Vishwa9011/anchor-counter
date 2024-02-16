"use client";

import { WalletButton } from "@/solana";
import { useCounter } from "@/context/CounterProvider";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

export default function Home() {
  const wallet = useAnchorWallet()
  const { count, isInitialized, initCounter, increment, decrement } = useCounter();
  return (
    <main className="flex flex-col items-center gap-5 text-xl">
      <h1 className="p-4 text-2xl font-semibold text-center">Counter Application</h1>
      <h1>Counter: {count}</h1>
      <WalletButton />
      {!wallet ?
        <>
          <h1 className="text-xl font-semibold">Please Connect Your Wallet</h1>
        </>
        :
        <div className="flex gap-5">
          {isInitialized ?
            <>
              <button className="p-2 px-4 border border-white rounded-md active:scale-95" onClick={increment}>Increment</button>
              <button className="p-2 px-4 border border-white rounded-md active:scale-95 disabled:cursor-not-allowed" onClick={decrement} disabled={count == 0}>Decrement</button>
            </>
            :
            <button className="p-2 px-4 border border-white rounded-md active:scale-95" onClick={initCounter}>Initialize</button>
          }
        </div>
      }
    </main>
  );
}
