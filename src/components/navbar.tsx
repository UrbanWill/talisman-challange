// TODO: Use react-router-dom to navigate between pages if app grows to more than one page
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <img
        src="/src/assets/hand-red-black.svg"
        alt="Logo"
        className="h-8 inline mr-2 cursor-pointer"
      />
      <div className="flex items-center">
        <div>
          <Button onClick={() => console.log("Clicked")}>Connect</Button>
        </div>
      </div>
    </nav>
  );
}
