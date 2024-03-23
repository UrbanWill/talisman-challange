import { useWalletsContext } from "@/hooks/useWalletsContext";
import { Button } from "./ui/button";

export default function PureProxyAccountsList() {
  const { isConnected, api } = useWalletsContext();

  const fetchBalance = async () => {
    const timestamp = await api?.query.timestamp.now();
    console.log({ timestamp });
  };

  const handleCreatePureProxy = () => {
    console.log("Handle create pure proxy account.");
    fetchBalance();
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
