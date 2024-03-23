import WalletsContextProvider from "@/providers/walletsContextProvider";
import { AccountsProvider } from "./providers/accountsContextProvider";
import Layout from "@/components/layout";

function App() {
  return (
    <WalletsContextProvider>
      <AccountsProvider>
        <Layout>
          <div className="bg-red-500">
            <h1 className="text-3xl font-bold underline">Challenge!</h1>
          </div>
        </Layout>
      </AccountsProvider>
    </WalletsContextProvider>
  );
}

export default App;
