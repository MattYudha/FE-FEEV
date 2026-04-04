"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t-[4px] border-black bg-black flex flex-col md:flex-row justify-between items-center py-16 px-12 gap-10 relative overflow-hidden text-white mt-20">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
        <h1 className="text-[15rem] font-headline font-black">VEEF</h1>
      </div>
      <div className="space-y-4 relative z-10 w-full md:w-auto text-center md:text-left">
        <span className="font-headline font-black text-4xl uppercase text-primary-container">VEEF POD</span>
        <p className="font-body font-bold text-sm tracking-wide text-zinc-400 max-w-sm mx-auto md:mx-0">
          Next-generation vaporizer technology. Experience the boldest flavors in the most stylish package.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
        <div className="flex flex-col gap-3">
          <Link className="font-body font-bold text-sm tracking-wide text-zinc-300 hover:text-primary-container hover:-translate-y-1 transition-transform inline-block" href="#">Support</Link>
          <Link className="font-body font-bold text-sm tracking-wide text-zinc-300 hover:text-primary-container hover:-translate-y-1 transition-transform inline-block" href="#">Warranty</Link>
          <Link className="font-body font-bold text-sm tracking-wide text-zinc-300 hover:text-primary-container hover:-translate-y-1 transition-transform inline-block" href="#">Retailers</Link>
        </div>
      </div>
      <div className="text-center md:text-right relative z-10 w-full md:w-auto mt-8 md:mt-0 pt-8 md:pt-0 border-t-2 md:border-t-0 border-zinc-800">
        <p className="font-body font-black text-2xl tracking-tighter text-white">MUST BE 21+</p>
        <p className="font-body font-bold text-[10px] md:text-xs tracking-wide text-zinc-500 mt-2 max-w-[200px] mx-auto md:mx-0 md:ml-auto leading-tight">
          WARNING: THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL.
        </p>
        <p className="font-body font-medium text-xs tracking-wide text-zinc-700 mt-6">© 2026 VEEF PODS.</p>
      </div>
    </footer>
  );
};
