"use client";

import { WalletButton } from "@/solana";
import { useCounter } from "@/context/CounterProvider";

export default function Home() {
  const { count, isInitialized, initCounter, increment, decrement } = useCounter();
  return (
    <main className="flex flex-col items-center gap-5 text-xl">
      <h1 className="text-center p-4 font-semibold text-2xl">Counter Application</h1>
      <h1>Counter: {count}</h1>
      <WalletButton />
      <div className="flex gap-5">
        {
          isInitialized ?
            <>
              <button className="border border-white rounded-md p-2 px-4 active:scale-95" onClick={increment}>Increment</button>
              <button className="border border-white rounded-md p-2 px-4 active:scale-95" onClick={decrement}>Decrement</button>
            </>
            :
            <button className="border border-white rounded-md p-2 px-4 active:scale-95" onClick={initCounter}>Initialize</button>
        }
      </div>
    </main>
  );
}
