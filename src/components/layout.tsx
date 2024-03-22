import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4 bg-gray-900">{children}</main>
      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">© 2024 Talisman</p>
      </footer>
    </div>
  );
}
