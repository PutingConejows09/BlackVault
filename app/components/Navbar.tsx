"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/cases", label: "Cases" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/cases" className="flex items-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">BLACK VAULT</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-red-900/50 text-white border border-red-700"
                    : "text-gray-300 hover:bg-red-900/30 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop User Info & Logout */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-sm text-gray-300">
              <span className="text-red-500">Investigator:</span> {user?.username || "Guest"}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-900/50 border border-red-700 text-white rounded-lg hover:bg-red-800 transition-all text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-red-900/30 rounded-lg transition-all"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-red-900/50 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-red-900/50 text-white border border-red-700"
                      : "text-gray-300 hover:bg-red-900/30 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="px-4 py-3 text-sm text-gray-300 border-t border-red-900/30 mt-2">
                <span className="text-red-500">Investigator:</span> {user?.username || "Guest"}
              </div>
              
              <button
                onClick={handleLogout}
                className="mx-4 py-3 bg-red-900/50 border border-red-700 text-white rounded-lg hover:bg-red-800 transition-all text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}