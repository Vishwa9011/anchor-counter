import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { expect } from "chai";

const getCounterAddress = (programId: PublicKey) => {
  return PublicKey.findProgramAddressSync([Buffer.from("counter")], programId)[0];
};

describe("anchor-counter", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.AnchorCounter;

  it("Is initialized!", async () => {
    const counterPda = getCounterAddress(program.programId);

    await program.methods.initialize().accounts({
      counter: counterPda,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    const account = await program.account.counter.fetch(counterPda);
    console.log('Account:', account);
    expect(account.count.toNumber()).to.equal(0);
  });

  it("Incremented the count", async () => {
    const counterPda = getCounterAddress(program.programId);

    await program.methods.increment().accounts({
      counter: counterPda,
      user: provider.wallet.publicKey,
    }).rpc();

    const account = await program.account.counter.fetch(counterPda);
    console.log('Account:', account);
    expect(account.count.toNumber()).to.equal(1);
  });
});
