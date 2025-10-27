"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Briefcase, Phone, Info, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const protectedNavigation = [
    { href: "/about", label: "ABOUT US", icon: Info },
    { href: "/cases", label: "CASES", icon: Briefcase },
    { href: "/contact", label: "CONTACT", icon: Phone },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-lg fixed w-full top-0 z-50 border-b border-yellow-400/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="group">
            <h1 className="text-white font-bold text-xs sm:text-sm tracking-widest flex items-center gap-2">
              <span className="text-yellow-400 text-lg">🔍</span>
              <span className="group-hover:text-yellow-400 transition">
                WELCOME, INVESTIGATORS!
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && protectedNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 transition text-sm font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition text-sm font-medium"
                suppressHydrationWarning
              >
                <LogOut size={18} />
                <span>LOGOUT</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-yellow-400 transition text-sm font-medium border border-white/30 px-4 py-2 rounded hover:border-yellow-400"
              >
                LOG IN
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 hover:text-yellow-400 transition"
            suppressHydrationWarning
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-yellow-400/20">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {isAuthenticated && protectedNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition py-3 border-b border-gray-800/30"
                onClick={() => setMenuOpen(false)}
              >
                <item.icon size={20} />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition py-3 w-full"
                suppressHydrationWarning
              >
                <LogOut size={20} />
                <span className="tracking-wide">LOGOUT</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition py-3"
                onClick={() => setMenuOpen(false)}
              >
                <span className="tracking-wide">LOG IN</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}