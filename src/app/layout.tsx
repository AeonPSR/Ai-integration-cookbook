import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Integration Cookbook",
  description:
    "Interactive, copy-paste code recipes for common AI/LLM use cases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b px-6 py-4">
          <h1 className="text-xl font-bold">AI Integration Cookbook</h1>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
