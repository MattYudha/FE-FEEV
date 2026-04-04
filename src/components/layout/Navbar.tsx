"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeoButton } from "@/components/ui/NeoButton";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div className="flex items-center gap-8">
              <Link href="/" className="text-3xl font-black text-black tracking-tighter uppercase font-headline">
                VEEF{" "}
                <span className="bg-primary-container px-2 border-2 border-black rotate-3 inline-block">
                  POD
                </span>
              </Link>
              <div className="hidden md:flex gap-6 items-center">
                <Link className="font-headline font-bold uppercase tracking-tight text-primary hover:-translate-y-1 transition-transform bg-transparent px-3 py-1 neo-hover" href="/">
                  Products
                </Link>
                <Link className="font-headline font-bold uppercase tracking-tight text-black hover:-translate-y-1 transition-transform" href="/flavors">
                  Flavors
                </Link>
                <Link className="font-headline font-bold uppercase tracking-tight text-black hover:-translate-y-1 transition-transform" href="/design">
                  Design
                </Link>
                <Link className="font-headline font-bold uppercase tracking-tight text-black hover:-translate-y-1 transition-transform bg-primary-container px-3 py-1 neo-border" href="/cart">
                  Cart
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/cart" id="navbar-cart-btn" className="relative p-2 text-black hover:-translate-y-1 transition-transform text-3xl">
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-container border-2 border-black text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] font-black uppercase hidden md:block opacity-60">
                    OP: {user?.name.split(" ")[0]}
                  </span>
                  <NeoButton 
                    variant="error" 
                    className="rounded-full px-6 py-2 text-sm group"
                    onClick={() => logout()}
                  >
                    <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">logout</span>
                    EXIT_
                  </NeoButton>
                </div>
              ) : (
                <Link href="/login">
                  <NeoButton variant="secondary" className="rounded-full px-6 py-2 text-sm group">
                    <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">person</span>
                    LOGIN
                  </NeoButton>
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
