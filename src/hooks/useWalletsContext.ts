import { useContext } from "react";
import { AccountsContext } from "@/providers/accountsContextProvider";

export const useWalletsContext = () => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error(
      "useWalletsContext must be used within a walletsContextProvider"
    );
  }
  return context;
};
