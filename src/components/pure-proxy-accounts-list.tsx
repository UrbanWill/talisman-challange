import { useWalletsContext } from "@/hooks/useWalletsContext";
import { Button } from "./ui/button";

export default function PureProxyAccountsList() {
  const { isConnected, api, selectedAccount, wallet } = useWalletsContext();

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
                  const [proxyAccount] = parsedData;
                  console.log({ proxyAccount });
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
      {!isConnected ? (
        <div>Connect account to create Pure Proxy accounts.</div>
      ) : (
        <div>
          <Button onClick={handleCreatePureProxy}>Create Pure Proxy</Button>
        </div>
      )}
    </div>
  );
}
