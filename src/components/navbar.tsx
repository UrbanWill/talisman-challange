// TODO: Use react-router-dom to navigate between pages if app grows to more than one page
import { Button } from "@/components/ui/button";
import { useWalletsContext } from "@/hooks/useWalletsContext";
import { DropdownMenuRadioMenu } from "./dropdown-radio-menu";

export default function Navbar() {
  const {
    isConnected,
    selectedAccount,
    accounts,
    setSelectedAccount,
    handleConnect,
    handleDisconnect,
  } = useWalletsContext();

  const handleAccountSelect = (value: string) => {
    const selectedAccount = accounts.find(
      (account) => account.address === value
    );
    if (selectedAccount) {
      setSelectedAccount(selectedAccount);
    } else {
      console.error("Account not found");
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <img
        src="/src/assets/hand-red-black.svg"
        alt="Logo"
        className="h-8 inline mr-2 cursor-pointer"
      />
      <div className="flex items-center">
        <div>
          {isConnected && selectedAccount ? (
            <div className="flex gap-2 items-center">
              <DropdownMenuRadioMenu
                selectedValue={selectedAccount.address}
                buttonLabel={selectedAccount?.name || selectedAccount.address}
                label="Select Account"
                options={accounts.map((account) => ({
                  value: account.address,
                  label: account.name || account.address,
                }))}
                onHandleChange={handleAccountSelect}
              />
              <Button onClick={handleDisconnect}>Disconnect</Button>
            </div>
          ) : (
            <Button onClick={handleConnect}>Connect</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
