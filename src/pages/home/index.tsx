import ConnectedAccountsList from "@/components/connected-accounts-list";
import PureProxyAccountsList from "@/components/pure-proxy-accounts-list";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <ConnectedAccountsList />
      <PureProxyAccountsList />
    </div>
  );
}
