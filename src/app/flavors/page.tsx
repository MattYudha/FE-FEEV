"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function FlavorsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12 pt-[140px]">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div 
          initial="hidden" animate="visible" variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-[6px] border-black pb-8"
        >
          <div>
            <span className="font-mono text-sm font-black uppercase tracking-widest text-[#006684] mb-2 block neo-border bg-white inline-block px-2 py-1">
              Archive Access // Phase 02
            </span>
            <h1 className="font-headline font-black text-6xl md:text-[7rem] uppercase leading-[0.85] tracking-tighter">
              A BOLD NEW <br /> TASTE DIMENSION.
            </h1>
          </div>
          <div className="max-w-md text-right">
            <p className="font-body text-lg font-black leading-tight border-r-4 border-black pr-4">
              ENGINEERED FOR THE DISCERNING PALATE. OUR FLAVOR ARCHIVE REPRESENTS THE PINNACLE OF AROMATIC RECONSTRUCTION.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Flavors Large Grid System */}
      <motion.div 
        initial="hidden" animate="visible" variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
      >
        {/* Flavor Card: Watermelon */}
        <motion.div variants={itemVariants} className="lg:col-span-8 bg-[#ff7c8e] border-[6px] border-black shadow-[8px_8px_0px_0px_#000000] p-10 flex flex-col justify-between min-h-[550px] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#000000] transition-all cursor-pointer group relative overflow-hidden">
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <span className="font-mono text-xs font-black border-[3px] border-black px-3 py-1 bg-white mb-6 inline-block">SKU: WF-082</span>
              <h2 className="font-headline font-black text-8xl md:text-9xl uppercase leading-[0.8] text-black">WTR<br />MLN</h2>
            </div>
          </div>
          <div className="flex justify-between items-end z-10 relative mt-12">
            <div className="max-w-sm">
              <p className="font-mono text-sm font-black uppercase mb-6 bg-white border-[3px] border-black p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                Profile: Hyper-saturated summer extraction with pressurized sugar crystals.
              </p>
              <button className="bg-black text-[#b1fe58] font-headline font-black px-8 py-4 uppercase tracking-tighter text-2xl flex items-center gap-3 hover:-translate-y-2 hover:shadow-[6px_6px_0_0_#ffffff] transition-all border-4 border-black">
                ARCHIVE UNIT <span className="material-symbols-outlined text-3xl">arrow_forward</span>
              </button>
            </div>
            
            {/* Redesigned Product Image Box */}
            <div className="w-56 h-64 md:w-64 md:h-72 bg-white border-[5px] border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex items-center justify-center relative group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500 transform rotate-2 z-20">
              <div className="absolute top-2 left-2 font-mono text-[10px] font-black tracking-tighter bg-black text-white px-1">FIG 1.</div>
              <Image 
                fill 
                className="object-cover p-2 border-2 border-dashed border-gray-200 m-2" 
                src="/veef_pod_colorful_1775290004999.png" 
                alt="Colorful neon pod watermelon"
              />
            </div>
          </div>
        </motion.div>

        {/* Flavor Card: Mint */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-[#b1fe58] border-[6px] border-black shadow-[8px_8px_0px_0px_#000000] p-10 flex flex-col justify-between min-h-[550px] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#000000] transition-all cursor-pointer group">
          <div>
            <span className="font-mono text-xs font-black border-[3px] border-black px-3 py-1 bg-white mb-6 inline-block">SKU: MN-119</span>
            <h2 className="font-headline font-black text-6xl xl:text-7xl uppercase leading-[0.85] text-black">GLACIER<br />MINT</h2>
          </div>
          <div className="flex flex-col gap-6 mt-8 relative">
            <div className="w-full h-56 bg-white border-[5px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] p-2 relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500 z-10 flex items-center justify-center">
              <div className="absolute top-2 right-2 font-mono text-[10px] font-black tracking-tighter bg-black text-white px-1 z-10">FIG 2.</div>
              <Image 
                fill 
                className="object-cover p-2 border-2 border-dashed border-gray-200 m-2" 
                src="/veef_pod_glacier_mint_1775294953087.png" 
                alt="Glacier Mint Pod"
              />
            </div>
            <p className="font-mono text-sm font-black uppercase bg-black text-white p-3 border-l-[6px] border-[#ff7c8e]">Profile: Sub-zero menthol infusion with crisp botanical finish.</p>
            <button className="bg-white text-black font-headline font-black px-8 py-4 uppercase tracking-tighter text-2xl border-[5px] border-black hover:bg-black hover:text-[#b1fe58] transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none translate-y-[-4px] hover:translate-y-0">
                SELECT
            </button>
          </div>
        </motion.div>

        {/* Flavor Card: Blue Raz */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-[#5bc2e7] border-[6px] border-black shadow-[8px_8px_0px_0px_#000000] p-10 flex flex-col justify-between min-h-[550px] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#000000] transition-all cursor-pointer group relative overflow-hidden">
          <span className="font-mono text-xs font-black border-[3px] border-black px-3 py-1 bg-white mb-6 self-start z-10 relative">SKU: BR-442</span>
          <div className="relative z-10 flex-1">
            <h2 className="font-headline font-black text-6xl xl:text-7xl uppercase leading-[0.85] text-black mb-6">ELECTRIC<br />BLUE</h2>
            
            <div className="w-48 h-48 bg-white border-[5px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative ml-auto transform rotate-6 group-hover:rotate-12 transition-transform duration-500 z-10 flex items-center justify-center">
               <Image 
                fill 
                className="object-cover p-2 border-2 border-dashed border-gray-200 m-2" 
                src="/veef_pod_electric_blue_1775294935406.png" 
                alt="Electric Blue Pod"
               />
               <div className="absolute -bottom-4 -left-4 bg-[#b1fe58] text-black border-[4px] border-black px-3 py-1 font-headline font-black text-sm rotate-[-15deg] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">VOLTAGE X</div>
            </div>

          </div>
          <div className="mt-8 z-10 relative">
            <p className="font-mono text-xs font-black uppercase mb-4 border-b-[4px] border-black pb-2">Profile: Synthetic berry complex with high-voltage acidity.</p>
            <div className="flex border-[4px] border-black bg-white font-mono text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <div className="flex-1 p-3 text-center font-black">INTENSITY 09</div>
              <div className="flex-1 p-3 text-center bg-black text-[#5bc2e7] font-black hover:bg-[#5bc2e7] hover:text-black transition-colors cursor-pointer border-l-[4px] border-black">ORDER</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-[15rem] absolute -bottom-10 -right-10 opacity-20 text-white z-0 pointer-events-none">bolt</span>
        </motion.div>

        {/* Flavor Card: Mango */}
        <motion.div variants={itemVariants} className="lg:col-span-8 bg-[#a5374b] border-[6px] border-black shadow-[8px_8px_0px_0px_#000000] p-0 flex flex-col md:flex-row min-h-[550px] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_#000000] transition-all cursor-pointer group text-white overflow-hidden relative">
          <div className="flex-1 flex flex-col justify-between p-10 z-10 border-b-[6px] md:border-b-0 md:border-r-[6px] border-black bg-[#a5374b]">
            <div>
              <span className="font-mono text-xs font-black border-[3px] border-white px-3 py-1 mb-6 inline-block bg-black">SKU: MG-005</span>
              <h2 className="font-headline font-black text-8xl md:text-9xl uppercase leading-[0.8] mb-8 text-[#ffdadc]">PULP<br />FICTION</h2>
              <div className="font-mono text-sm font-black uppercase max-w-sm bg-white text-black p-4 border-[4px] border-black shadow-[6px_6px_0_0_#ffdadc]">
                Profile: Over-ripe tropical density. Viscous and heavy with golden nectar notes.
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#ffae42] relative overflow-hidden group-hover:scale-[1.02] transition-transform flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-80"></div>
            
            <div className="w-56 h-72 md:w-64 md:h-80 bg-white border-[5px] border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)] relative z-20 group-hover:rotate-3 transition-transform duration-500">
                <Image 
                  fill 
                  className="object-cover p-2 border-2 border-dashed border-gray-200 m-2 transition-all duration-700" 
                  src="/veef_pod_mango_x_1775294971821.png" 
                  alt="Mango X Pod" 
                />
                <div className="absolute -bottom-6 -right-8 pointer-events-none z-30">
                  <div className="bg-black text-[#ffae42] font-headline font-black p-3 text-3xl md:text-4xl -rotate-12 border-[4px] border-black shadow-[6px_6px_0_0_#ffffff]">MANGO X</div>
                </div>
            </div>

          </div>
        </motion.div>

        {/* Spec Sheet Block */}
        <motion.div variants={itemVariants} className="lg:col-span-12 border-[6px] border-black p-10 bg-white shadow-[8px_8px_0_0_#000] grid grid-cols-1 md:grid-cols-4 gap-10 font-mono text-sm relative">
          <div className="absolute top-0 left-0 bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-widest border-r-[4px] border-b-[4px] border-black">Technical Specs</div>
          
          <div className="border-b-[4px] md:border-b-0 md:border-r-[4px] border-black pb-6 md:pb-0 pr-0 md:pr-6 mt-8">
            <h4 className="font-black mb-3 uppercase text-primary text-lg">System Compliance</h4>
            <p className="font-bold leading-relaxed">ALL POD UNITS MANUFACTURED UNDER INDUSTRIAL ARCHIVE STANDARDS. ISO-9001/VEEF CERTIFIED.</p>
          </div>
          <div className="border-b-[4px] md:border-b-0 md:border-r-[4px] border-black pb-6 md:pb-0 pr-0 md:pr-6 mt-8">
            <h4 className="font-black mb-3 uppercase text-[#006684] text-lg">Aromatic Density</h4>
            <p className="font-bold leading-relaxed">VARIABLE INTENSITY LEVELS MEASURED IN ARCHIVAL UNITS (AU). AVERAGE DENSITY 8.4 AU/ML.</p>
          </div>
          <div className="border-b-[4px] md:border-b-0 md:border-r-[4px] border-black pb-6 md:pb-0 pr-0 md:pr-6 mt-8">
            <h4 className="font-black mb-3 uppercase text-[#a5374b] text-lg">Unit Composition</h4>
            <p className="font-bold leading-relaxed">REINFORCED POLYCARBONATE SHELL. HEAT-RESISTANT CERAMIC CORE TECHNOLOGY.</p>
          </div>
          <div className="mt-8">
            <h4 className="font-black mb-3 uppercase text-lg">Batch Status</h4>
            <div className="flex items-center gap-3 mt-4 inline-flex bg-[#b1fe58] px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_0_#000]">
              <div className="w-4 h-4 bg-error-container border-[3px] border-black animate-pulse inline-block rounded-full shadow-inner"></div>
              <span className="font-black text-xs uppercase tracking-wider text-black">Active // Ships Worldwide</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
