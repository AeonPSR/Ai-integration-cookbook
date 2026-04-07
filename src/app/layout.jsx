import "./globals.css";

export const metadata = {
  title: "AI Integration Cookbook",
  description:
    "Interactive, copy-paste code recipes for common AI/LLM use cases.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b px-6 py-4">
          <nav className="mx-auto flex max-w-6xl items-center gap-6">
            <a href="/" className="text-xl font-bold hover:text-gray-700">
              AI Integration Cookbook
            </a>
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
              Home
            </a>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
