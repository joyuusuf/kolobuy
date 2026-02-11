"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* -------- Click Outside + ESC Close -------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-300 bg-white text-gray-700">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3">
          {/* Logo */}
          {assets.logo && (
            <Image
              className="cursor-pointer w-28 md:w-32"
              onClick={() => router.push("/")}
              src={assets.logo}
              alt="logo"
              priority
            />
          )}

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/">Home</Link>
            <Link href="/all-products">Shop</Link>
            <Link href="/">About Us</Link>
            <Link href="/">Contact</Link>

            {isSeller && (
              <button
                onClick={() => router.push("/seller")}
                className="text-xs border px-4 py-1.5 rounded-full"
              >
                Seller Dashboard
              </button>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <Image className="w-4 h-4" src={assets.search_icon} alt="search" />
            <button className="flex items-center gap-2">
              <Image src={assets.user_icon} alt="user" />
              Account
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Slide Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <svg width="22" height="22" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M6 6l10 10M6 16L16 6" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-6">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/all-products" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>Contact</Link>

          {isSeller && (
            <button
              onClick={() => {
                router.push("/seller");
                setMenuOpen(false);
              }}
              className="text-xs border px-4 py-2 rounded-md text-left"
            >
              Seller Dashboard
            </button>
          )}

          <button className="flex items-center gap-2 pt-2">
            <Image src={assets.user_icon} alt="user" />
            Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;