import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SolanaProvider from "@/solana/providers/solana-provider";
import CounterProvider from "@/context/CounterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Counter",
  description: "Author: Vishwa9011",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SolanaProvider>
          <CounterProvider>
            {children}
          </CounterProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}
