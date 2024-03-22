// TODO: Use react-router-dom to navigate between pages if app grows to more than one page
import { Button } from "@/components/ui/button";
import { useWallets } from "@polkadot-onboard/react";
import { useCallback, useEffect, useState } from "react";
import { Account } from "@polkadot-onboard/core";

export default function Navbar() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { wallets } = useWallets();

  const talismanWallet = wallets?.find(
    (wallet) => wallet.metadata.id === "talisman"
  );

  console.log(talismanWallet);

  useEffect(() => {
    if (!connected) {
      setAccounts([]);
      return () => {};
    }

    const promUnsubscribe = talismanWallet?.subscribeAccounts(setAccounts);

    // unsubscribe to prevent memory leak
    return () => {
      promUnsubscribe?.then((unsub) => unsub());
    };
  }, [connected, talismanWallet]);

  const handleConnect = useCallback(async () => {
    if (!isBusy) {
      setIsBusy(true);
      try {
        await talismanWallet?.connect();
        setConnected(true);
      } catch (err) {
        console.error("Failed to connect", err);
      }
      setIsBusy(false);
    }
  }, [talismanWallet]);

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <img
        src="/src/assets/hand-red-black.svg"
        alt="Logo"
        className="h-8 inline mr-2 cursor-pointer"
      />
      <div className="flex items-center">
        <div>
          <Button onClick={handleConnect}>Connect</Button>
          {accounts.length > 0 &&
            accounts.map(({ name = "" }) => (
              <div>
                <div>
                  <label>Account name: {name}</label>
                </div>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
}
