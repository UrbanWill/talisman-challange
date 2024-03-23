import WalletsContextProvider from "@/providers/walletsContextProvider";
import { AccountsProvider } from "./providers/accountsContextProvider";
import Layout from "@/components/layout";
import Home from "@/pages/home";

function App() {
  return (
    <WalletsContextProvider>
      <AccountsProvider>
        <Layout>
          <Home />
        </Layout>
      </AccountsProvider>
    </WalletsContextProvider>
  );
}

export default App;
