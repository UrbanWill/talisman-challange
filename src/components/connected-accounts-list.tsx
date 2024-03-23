import { useWalletsContext } from "@/hooks/useWalletsContext";
import { clsx } from "clsx";

export default function ConnectedAccountsList() {
  const { accounts, selectedAccount, setSelectedAccount } = useWalletsContext();

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 md:w-1/2">
      <div className="text-lg">Connected accounts:</div>
      {selectedAccount ? (
        <div>Selected account: {selectedAccount.name}</div>
      ) : (
        <div>Connect wallet to view connected accounts.</div>
      )}
      {accounts.length > 0 && (
        <>
          <ul>
            {accounts.map((account, i) => (
              <li
                key={account.address}
                className={clsx("rounded-lg p-2", {
                  "bg-gray-600": i % 2 === 0,
                })}
              >
                <button
                  className="w-full h-max p-2 text-start pointer text-ellipsis overflow-hidden"
                  onClick={() => setSelectedAccount(account)}
                >
                  {account.address}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
