"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

export const Toast = () => {
  const toast = useCartStore((state) => state.toast);
  const clearNotification = useCartStore((state) => state.clearNotification);

  return (
    <AnimatePresence>
      {toast && toast.show && (
        <motion.div
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          className="fixed top-8 left-1/2 z-[100] min-w-[320px]"
        >
          <div className="bg-primary-container border-4 border-black p-4 neo-shadow flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="animate-pulse w-2.5 h-2.5 bg-black rounded-full"></span>
              <p className="font-headline font-black text-sm uppercase tracking-tight">
                {toast.message}
              </p>
            </div>
            <button 
              onClick={clearNotification}
              className="text-black hover:rotate-90 transition-transform font-black"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
