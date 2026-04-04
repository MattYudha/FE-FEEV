"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCartStore, CartItem } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

/* ─── Animation Variants ─────────────────────────── */
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

/* ─── Finish color dot map ───────────────────────── */
const FINISH_COLORS: Record<string, string> = {
  "Graphite Grey": "#888888",
  "Obsidian Black": "#000000",
  "Arctic White": "#ffffff",
  "Cyan Blue": "#22d3ee",
  "Lime Green": "#b0f25c",
  "Mustard": "#f5c842",
  "Obsidian": "#000000",
  "Neon Pink": "#ff4daa",
};

const getFinishColor = (finish: string) => FINISH_COLORS[finish] ?? "#000000";

/* ─── Cart Item Row Component ────────────────────── */
function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group relative flex flex-col md:flex-row bg-white border-4 border-black hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000000] transition-all duration-300 mb-6"
    >
      {/* Product Image Area */}
      <div className="md:w-64 h-64 bg-surface-variant border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="headline text-3xl font-bold uppercase tracking-tight">
                {item.name}
              </h3>
              <p className="font-mono text-xs text-primary font-bold mt-2 flex items-center gap-2">
                <span
                  className="w-3 h-3 border-2 border-black rounded-full"
                  style={{ backgroundColor: getFinishColor(item.finish) }}
                />
                VARIANT: {item.variant.toUpperCase().replace(" ", "_")} / {item.finish.toUpperCase().replace(" ", "_")}
              </p>
            </div>
            <p className="headline text-2xl font-black">
              Rp {item.price.toLocaleString("id-ID")}k
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="bg-secondary-container px-2 py-1 text-[10px] font-mono font-bold uppercase border-2 border-black">
              High_Capacity
            </span>
            <span className="bg-tertiary-container px-2 py-1 text-[10px] font-mono font-bold uppercase border-2 border-black">
              BUREAU_72_CERTIFIED
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-8">
          {/* Quantity Controls */}
          <div className="flex items-center border-4 border-black bg-white overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.finish, item.quantity - 1)}
              className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-all border-r-4 border-black"
            >
              <span className="material-symbols-outlined font-black">remove</span>
            </button>
            <div className="w-16 h-12 flex items-center justify-center font-mono font-black text-xl bg-surface-container-low">
              {String(item.quantity).padStart(2, "0")}
            </div>
            <button
              onClick={() => updateQuantity(item.id, item.finish, item.quantity + 1)}
              className="w-12 h-12 flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-all border-l-4 border-black"
            >
              <span className="material-symbols-outlined font-black">add</span>
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id, item.finish)}
            className="text-error font-mono text-xs font-bold uppercase hover:underline underline-offset-4 decoration-2"
          >
            Discard_Item
          </button>
        </div>
      </div>

      {/* Serial Number Tag */}
      <div className="absolute -top-3 -right-3 bg-black text-white px-2 py-1 font-mono text-[10px] transform rotate-3 border-2 border-black z-10">
        SN: {item.id.toUpperCase()}
      </div>
    </motion.div>
  );
}

/* ─── Empty State ────────────────────────────────── */
function EmptyCart() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 gap-8"
    >
      <div className="w-48 h-48 bg-error-container border-4 border-black shadow-[10px_10px_0px_0px_#000000] flex items-center justify-center">
        <span className="material-symbols-outlined text-[100px] text-black">
          production_quantity_limits
        </span>
      </div>
      <div className="text-center space-y-4">
        <h2 className="headline text-6xl font-black uppercase tracking-tighter">
          Manifest <br />
          <span className="bg-black text-white px-4">Empty_</span>
        </h2>
        <p className="font-mono text-sm uppercase tracking-widest opacity-60">
          No active deployment staging detected.
        </p>
      </div>
      <Link
        href="/"
        className="mt-8 bg-primary-container border-4 border-black px-12 py-6 headline text-2xl font-black uppercase tracking-widest hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#000000] transition-all"
      >
        Explore Archive
      </Link>
    </motion.div>
  );
}

/* ─── Secure Access View ──────────────────────────── */
function SecureAccessView() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-20 px-6 max-w-2xl mx-auto"
    >
      <div className="bg-white border-[5px] border-black p-10 md:p-14 shadow-[15px_15px_0px_0px_#000000] text-center space-y-10 relative overflow-hidden">
        {/* Decorative Industrial Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 -rotate-45 translate-x-12 -translate-y-12 border-4 border-black/5"></div>
        
        <div className="w-24 h-24 bg-error-container border-4 border-black mx-auto flex items-center justify-center shadow-[6px_6px_0px_0px_#000000]">
          <span className="material-symbols-outlined text-5xl font-black">lock</span>
        </div>
        
        <div className="space-y-4">
          <div className="inline-block bg-black text-white px-3 py-1 font-mono font-black text-[10px] tracking-[0.3em] uppercase mb-2">
            Protocol: 401_UNAUTHORIZED
          </div>
          <h2 className="headline text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Identity <br /> Required_
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 max-w-xs mx-auto leading-relaxed">
            You must establish a secure session to view or manage the manifest archive.
          </p>
        </div>

        <Link 
          href="/login"
          className="flex items-center justify-center gap-4 w-full bg-primary-container text-black border-4 border-black py-6 headline font-black text-2xl uppercase tracking-widest hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[12px_12px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all group"
        >
          Initialize Login
          <span className="material-symbols-outlined font-black group-hover:translate-x-2 transition-transform">arrow_forward</span>
        </Link>
        
        <div className="pt-4 border-t-2 border-black/10 flex justify-between items-center opacity-40">
          <span className="font-mono text-[9px] font-black uppercase tracking-widest">Bureau_72_Node</span>
          <span className="font-mono text-[9px] font-black uppercase tracking-widest">STG_GATE_01</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Cart Page ─────────────────────────────── */
export default function CartPage() {
  const router = useRouter();
  const { items, clearCart, totalItems, totalPrice } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = totalPrice();
  const grandTotal = subtotal;

  if (!mounted) return null;

  return (
    <div className="bg-[#f4f4f0] min-h-screen pt-32 pb-20">
      {!isAuthenticated ? (
        <SecureAccessView />
      ) : (
        <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header Section */}
          <div className="lg:col-span-8">
            <div className="mb-12 border-l-8 border-black pl-6">
              <h1 className="headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Current <br /> Manifest
              </h1>
              <div className="flex justify-between items-center mt-6">
                <p className="font-mono text-sm uppercase tracking-widest opacity-60">
                  Session ID: VF-{Math.random().toString(36).substring(7).toUpperCase()} | Units: {String(totalItems()).padStart(2, "0")}
                </p>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="font-mono text-xs font-bold uppercase text-error hover:underline underline-offset-4"
                  >
                    Clear_All_Units ✕
                  </button>
                )}
              </div>
            </div>

            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemRow key={`${item.id}-${item.finish}`} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Sidebar Summary */}
          {items.length > 0 && (
            <aside className="lg:col-span-4">
              <motion.div
                variants={pageVariants}
                className="sticky top-32 bg-primary-container border-4 border-black p-8 shadow-[10px_10px_0px_0px_#000000]"
              >
                <div className="mb-8 flex justify-between items-center border-b-4 border-black pb-4">
                  <h2 className="headline text-3xl font-black uppercase tracking-tighter">
                    Summary
                  </h2>
                  <span className="font-mono text-xs font-bold px-2 py-1 bg-black text-white">
                    RECAP_V.04
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center font-mono text-sm">
                    <span className="font-bold uppercase tracking-tight">Subtotal</span>
                    <span className="font-black">Rp {subtotal.toLocaleString("id-ID")}k</span>
                  </div>
                  <div className="flex justify-between items-center font-mono text-sm">
                    <span className="font-bold uppercase tracking-tight">Logistics_Fee</span>
                    <span className="font-black">
                      -
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-mono text-sm border-b-2 border-black/20 pb-6 uppercase tracking-tight">
                    <span className="font-bold uppercase tracking-tight">Duty_Tax</span>
                    <span className="font-black">-- INCLUDED --</span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="headline text-2xl font-black uppercase">
                        Grand Total
                      </span>
                      <span className="headline text-5xl font-black tracking-tighter">
                        Rp {grandTotal.toLocaleString("id-ID")}k
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-black p-4 mt-8">
                    <label className="font-mono text-[10px] font-black uppercase block mb-2">
                      Promotion_Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        className="w-full border-2 border-black px-3 py-2 font-mono text-xs bg-transparent focus:ring-0 focus:border-black outline-none placeholder:text-black/30"
                        placeholder="ENTER CODE"
                        type="text"
                      />
                      <button className="bg-black text-white px-4 py-2 font-mono text-xs font-bold hover:bg-neutral-800 transition-colors uppercase">
                        Apply
                      </button>
                    </div>
                  </div>

                  <button
                    id="checkout-btn"
                    className="w-full mt-12 bg-black text-primary-container border-4 border-black py-8 headline text-4xl font-black uppercase tracking-widest hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_#b1fe58] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200"
                  >
                    Checkout
                  </button>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t-4 border-black pt-6">
                  <span className="material-symbols-outlined text-4xl">
                    lock_open
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-black uppercase">
                      Security_Protocol
                    </p>
                    <p className="font-mono text-[10px] opacity-60 leading-none">
                      ALL TRANSACTIONS ARE ENCRYPTED VIA BUREAU_72 INDUSTRIAL NODE.
                    </p>
                  </div>
                </div>
              </motion.div>
            </aside>
          )}
        </main>
      )}
    </div>
  );
}
