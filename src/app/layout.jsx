import { Footer } from "@/components/Footer";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

export const metadata = {
  title: "AI Integration Cookbook",
  description:
    "Interactive, copy-paste code recipes for common AI/LLM use cases.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col justify-between">
        <header className="border-b px-6">
                 <NavBar/>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
