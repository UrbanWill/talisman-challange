import WalletsContextProvider from "@/providers/walletsContextProvider";
import Layout from "@/components/layout";

function App() {
  return (
    <WalletsContextProvider>
      <Layout>
        <div className="bg-red-500">
          <h1 className="text-3xl font-bold underline">Challenge!</h1>
        </div>
      </Layout>
    </WalletsContextProvider>
  );
}

export default App;
