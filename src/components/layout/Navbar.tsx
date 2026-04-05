"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeoButton } from "@/components/ui/NeoButton";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/" },
    { name: "Flavors", href: "/flavors" },
    { name: "Design", href: "/design" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <>
      {/* Marquee Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-primary-container text-black neo-border border-t-0 border-x-0 py-2 font-label font-black text-sm tracking-widest overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex space-x-12 shrink-0 min-w-full"
        >
          <span>NEW VEEF POD NEON EDITION AVAILABLE NOW! ⚡</span>
          <span>FREE SHIPPING ON ORDERS OVER RP 500.000 🚀</span>
          <span>VAPE THE FUTURE WITH VEEF POD 🔥</span>
        </motion.div>
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex space-x-12 shrink-0 min-w-full"
        >
          <span>NEW VEEF POD NEON EDITION AVAILABLE NOW! ⚡</span>
          <span>FREE SHIPPING ON ORDERS OVER RP 500.000 🚀</span>
          <span>VAPE THE FUTURE WITH VEEF POD 🔥</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {!isScrolled && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -150 }}
            className="fixed top-9 w-full z-50 neo-border border-x-0 bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center h-20 px-4 md:px-8 bg-opacity-90 backdrop-blur-md"
          >
            <div className="flex items-center gap-4 md:gap-8">
              <Link href="/" className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase font-headline shrink-0">
                VEEF{" "}
                <span className="bg-primary-container px-2 border-2 border-black rotate-3 inline-block">
                  POD
                </span>
              </Link>
              <div className="hidden md:flex gap-6 items-center">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    className={`font-headline font-bold uppercase tracking-tight hover:-translate-y-1 transition-transform ${
                      link.name === 'Cart' ? 'bg-primary-container px-3 py-1 neo-border' : 'text-black'
                    }`} 
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/cart" id="navbar-cart-btn" className="relative p-2 text-black hover:-translate-y-1 transition-transform text-2xl md:text-3xl">
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-container border-2 border-black text-black text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="hidden sm:flex items-center gap-2 md:gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 md:gap-4">
                    <span className="font-mono text-[10px] font-black uppercase hidden lg:block opacity-60">
                      OP: {user?.name.split(" ")[0]}
                    </span>
                    <NeoButton 
                      variant="error" 
                      className="rounded-full px-4 md:px-6 py-2 text-xs md:text-sm group"
                      onClick={() => logout()}
                    >
                      <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">logout</span>
                      <span className="hidden xs:inline">EXIT_</span>
                    </NeoButton>
                  </div>
                ) : (
                  <Link href="/login">
                    <NeoButton variant="secondary" className="rounded-full px-4 md:px-6 py-2 text-xs md:text-sm group">
                      <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">person</span>
                      LOGIN
                    </NeoButton>
                  </Link>
                )}
              </div>

              {/* Hamburger Button */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-primary-container transition-colors"
                aria-label="Toggle Menu"
              >
                <span className="material-symbols-outlined">
                  {isOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-surface flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-3xl font-black text-black tracking-tighter uppercase font-headline">
                VEEF <span className="bg-primary-container px-2 border-2 border-black rotate-3 inline-block">POD</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 neo-border bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#000]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-black font-headline uppercase tracking-tighter hover:text-primary transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t-4 border-black border-dashed">
              {isAuthenticated ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-black bg-primary-container flex items-center justify-center font-black text-xl">
                      {user?.name[0]}
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase opacity-60 font-black tracking-widest">Active Operator_</p>
                      <p className="text-xl font-headline font-black uppercase">{user?.name}</p>
                    </div>
                  </div>
                  <NeoButton 
                    variant="error" 
                    className="w-full py-6 rounded-none text-xl"
                    onClick={() => { logout(); setIsOpen(false); }}
                  >
                    TERMINATE SESSION_
                  </NeoButton>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <NeoButton variant="secondary" className="w-full py-6 rounded-none text-xl">
                    OPERATOR_LOGIN
                  </NeoButton>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
