"use client";

import React from "react";
import Image from "next/image";
import { AuthPortal } from "@/components/auth/AuthPortal";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f4f4f0] pt-[120px] pb-12">
      {/* Left Column: Industrial Visual */}
      <div className="hidden md:flex md:w-1/2 bg-black relative overflow-hidden flex-col justify-between p-12">
        <div className="z-10 animate-in fade-in slide-in-from-left duration-700">
          <div className="text-primary-container headline font-black text-7xl tracking-tighter mb-4">VEEF</div>
          <div className="bg-primary-container text-black inline-block px-4 py-1 font-mono font-bold text-xs border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            POD_ARCHIVE_v.02
          </div>
        </div>

        {/* Main BG Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkl0rA-1wrXlKhePjC3R_mWW3SDu0y-4INpsnBdcCEqPzZn7aL8gIagMLzmDpuehRV_CSeQCxJPvuQa7-gzXNO_eBr9WwAX7L97dhGU4OhIxnsSpNQqr_nJKCsgwFBxDfHhwomCvc5Hpg_K5rZxN3SEC6QInvQKZmQ11MP4hqHyojNe_GYLRSC821xcBBtFRD-_uGtg0hxBe9qfcX8KjjHcyegGzso3O533Q-tbaKfi5846Ex5_LQxrS5xb3QrdJcTKNLNZoF05_EY"
            fill
            className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Industrial Archive"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-primary-container/20"></div>
        </div>

        {/* Technical Metadata */}
        <div className="z-10 font-mono text-primary-container/80 text-[10px] flex justify-between items-end uppercase tracking-widest">
          <div className="space-y-1">
            <p>System: Industrial_Recovery</p>
            <p>Loc: Bureau_72_Sector_G</p>
            <p>Archive_ID: 992-PX-001</p>
          </div>
          <div className="text-right">
            <p>Status: Online</p>
            <p>Encryption: 256-Bit_Pulse</p>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Form Slider */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Mobile Branding */}
        <div className="md:hidden absolute top-8 text-center w-full px-6">
          <h1 className="text-5xl headline font-black tracking-tighter text-black uppercase">VEEF</h1>
        </div>

        {/* Global Status Bar */}
        <div className="absolute top-0 right-12 hidden md:flex items-center gap-2 bg-[#fdd34d] border-4 border-black px-4 py-1 shadow-[6px_6px_0px_0px_#000000] z-10 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
          <span className="animate-pulse w-2 h-2 bg-black rounded-full"></span>
          <span className="font-mono text-[10px] font-black uppercase tracking-tighter">System Health: Nominal</span>
        </div>

        <AuthPortal />

        {/* Floating Decals */}
        <div className="fixed bottom-4 right-4 pointer-events-none opacity-10 hidden lg:block select-none">
          <div className="font-mono text-[10rem] font-black leading-none text-black">VEEF</div>
        </div>
      </div>
    </div>
  );
}
