import { useWalletsContext } from "@/hooks/useWalletsContext";

export default function PureProxyAccountsList() {
  const { isConnected } = useWalletsContext();

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-4 md:w-1/2">
      <div className="text-lg">Pure proxy accounts:</div>
      {isConnected ? (
        <div>Connect account to create Pure Proxy accounts.</div>
      ) : null}
    </div>
  );
}
