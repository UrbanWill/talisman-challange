import { useState } from "react";
import { useWalletsContext } from "@/hooks/useWalletsContext";
import { Button } from "./ui/button";
import { clsx } from "clsx";
import BN from "bignumber.js";

export default function PureProxyAccountsList() {
  const { isConnected, api, selectedAccount, wallet } = useWalletsContext();
  const [proxyAccounts, setProxyAccounts] = useState<string[]>([]);
  const [proxyAccountBalances, setProxyAccountBalances] = useState<
    Record<string, string>
  >({});

  const parseRococoBalance = (balanceInPlanck: string): string => {
    const planckPerDOT = new BN(10).pow(12);
    const balanceInDOT = new BN(balanceInPlanck).dividedBy(planckPerDOT);
    return balanceInDOT.toString();
  };

  const subscribeToProxyBalance = async (proxyAcc: string) => {
    api?.query.system.account(
      proxyAcc,
      ({ data: { free } }: { data: { free: BN } }) =>
        setProxyAccountBalances((prev) => ({
          ...prev,
          [proxyAcc]: parseRococoBalance(free.toString()),
        }))
    );
  };

  const handleCreatePureProxy = async () => {
    if (!selectedAccount) {
      console.error("No selected account");
      return;
    }

    if (!api) {
      console.error("No API");
      return;
    }

    const PURE_METHOD = "PureCreated";

    api.tx.proxy
      .createPure("Any", 0, 0)
      .signAndSend(
        selectedAccount?.address as string,
        {
          signer: wallet?.signer,
        },
        (tx) => {
          if (tx.status.isInBlock) {
            tx.events.forEach(({ event: { data, method } }) => {
              if (method === PURE_METHOD) {
                const parsedData = data.toJSON();
                // NOTE: This feels hacky. I'm not sure if this is the best way to check if the data is an array.
                if (Array.isArray(parsedData)) {
                  const [proxyAccount] = parsedData as string[];
                  setProxyAccounts((prev) => [...prev, proxyAccount]);
                  subscribeToProxyBalance(proxyAccount);
                }
              }
            });
          }
        }
      )
      .catch((error) => {
        console.log(":( transaction failed", error);
      });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 md:w-1/2">
      <div className="text-lg">Pure proxy accounts:</div>
      {isConnected && selectedAccount ? (
        <div>
          <Button onClick={handleCreatePureProxy}>Create Pure Proxy</Button>
        </div>
      ) : (
        <div>Connect account to create Pure Proxy accounts.</div>
      )}
      <ul>
        {proxyAccounts.map((account, i) => (
          <li
            key={account}
            className={clsx("rounded-lg p-4", {
              "bg-gray-600": i % 2 === 0,
            })}
          >
            <div className="flex gap-4">
              <div className="text-ellipsis overflow-hidden">{account}</div>
              <div>-</div>
              <div>Balance: {proxyAccountBalances[account]} DOT</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
