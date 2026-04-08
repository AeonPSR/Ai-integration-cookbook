"use client"; // Obligatoire pour l'interactivité (clic)

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 md:px-12 lg:px-24">
        
        <Link href="/" className="shrink-0">
          <img src="/images/logo.png" alt="Logo" className="w-32 md:w-44" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li><Link href="/" className="link-gray">Accueil</Link></li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <Link href={`/categories/${cat.id}`} className="link-gray">
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>

        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-600 transition-opacity ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen border-t" : "max-h-0"}`}>
        <ul className="flex flex-col gap-4 p-6 bg-gray-50">
          <li>
            <Link href="/" className="link-gray block text-lg" onClick={() => setIsOpen(false)}>
                Accueil
            </Link>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <Link 
                href={`/categories/${cat.id}`} 
                className="link-gray block text-lg"
                onClick={() => setIsOpen(false)} 
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}