import { PolkadotWalletsContextProvider } from "@polkadot-onboard/react";
import { WalletAggregator } from "@polkadot-onboard/core";
import { InjectedWalletProvider } from "@polkadot-onboard/injected-wallets";
import { extensionConfig } from "@/utils/extensionConfig";

const APP_NAME = "Talisman Challenge";

export default function WalletsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const injectedWalletProvider = new InjectedWalletProvider(
    extensionConfig,
    APP_NAME
  );
  const walletAggregator = new WalletAggregator([injectedWalletProvider]);

  return (
    <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
      {children}
    </PolkadotWalletsContextProvider>
  );
}
