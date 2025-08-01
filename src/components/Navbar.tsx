"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { label: "HOME", href: "/" },
    { label: "WHAT'S ON", href: "/programs" },
    { label: "BOOK A ROOM", href: "/facilities" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Top bar with search */}
        <div className="hidden lg:flex justify-end py-2 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-4 pr-10 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div>
              <h1 className="text-xl font-heading font-bold text-primary-600 tracking-tight">
                WEST ACTON
              </h1>
              <p className="text-sm text-gray-600 font-medium -mt-1">
                Community Centre
              </p>
            </div>
            <span className="sr-only">West Acton Community Centre</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};