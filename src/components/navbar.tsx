// TODO: Use react-router-dom to navigate between pages if app grows to more than one page

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <img
        src="/src/assets/hand-red-black.svg"
        alt="Logo"
        className="h-8 inline mr-2 cursor-pointer"
      />
      <div className="flex items-center">
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
          Button
        </button>
      </div>
    </nav>
  );
}
