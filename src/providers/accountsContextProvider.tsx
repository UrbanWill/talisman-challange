import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useWallets } from "@polkadot-onboard/react";
import { Account } from "@polkadot-onboard/core";

interface AccountsContextType {
  isConnected: boolean;
  accounts: Account[];
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account) => void;
  handleConnect: () => Promise<void>;
  handleDisconnect: () => Promise<void>;
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
);

interface AccountsProviderProps {
  children: ReactNode;
}

export const AccountsProvider = ({ children }: AccountsProviderProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { wallets } = useWallets();

  const talismanWallet = wallets?.find(
    (wallet) => wallet.metadata.id === "talisman"
  );

  useEffect(() => {
    if (!isConnected) {
      setAccounts([]);
      setSelectedAccount(null);
      return () => {};
    }
    const promUnsubscribe = talismanWallet?.subscribeAccounts((accounts) => {
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccounts(accounts);
        setSelectedAccount(accounts[0]);
      }
    });

    // unsubscribe to prevent memory leak
    return () => {
      promUnsubscribe?.then((unsub) => unsub());
    };
  }, [isConnected, talismanWallet]);

  const handleConnect = useCallback(async () => {
    if (!isBusy) {
      setIsBusy(true);
      try {
        await talismanWallet?.connect();
        setIsConnected(true);
      } catch (err) {
        console.error("Failed to connect", err);
      }
      setIsBusy(false);
    }
  }, [isBusy, talismanWallet]);

  const handleDisconnect = useCallback(async () => {
    if (!isBusy) {
      setIsBusy(true);
      try {
        await talismanWallet?.disconnect();
        setIsConnected(false);
      } catch (err) {
        console.error("Failed to disconnect", err);
      }
      setIsBusy(false);
    }
  }, [isBusy, talismanWallet]);

  const value = {
    isConnected,
    accounts,
    selectedAccount,
    setSelectedAccount,
    handleConnect,
    handleDisconnect,
  };

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};
