"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const specs = [
  { label: "DIMENSIONS", value: "103mm × 22mm × 13mm", note: "SLIM FORM FACTOR" },
  { label: "SHELL MATERIAL", value: "Medical-grade Polycarbonate", note: "IMPACT RESISTANT" },
  { label: "COIL TECHNOLOGY", value: "Ceramic Mesh 1.0Ω", note: "ZERO BURN GUARANTEE" },
  { label: "BATTERY CAPACITY", value: "400mAh Li-Polymer", note: "80% IN 30MIN" },
  { label: "CHARGING PORT", value: "USB-C 5V/1A", note: "UNIVERSAL STANDARD" },
  { label: "E-LIQUID CAPACITY", value: "2.0mL Closed Pod", note: "SPILL-PROOF DESIGN" },
  { label: "PUFF COUNT", value: "400+ Per Pod", note: "CONSISTENT DELIVERY" },
  { label: "AIRFLOW", value: "Adjustable Dual-Path", note: "MTL OPTIMIZED" },
  { label: "NICOTINE CONTENT", value: "30mg/mL Salts", note: "SMOOTH THROAT HIT" },
  { label: "CERTIFICATIONS", value: "ISO 9001 / RoHS", note: "VEEF ARCHIVE STD." },
];

const annotations = [
  { id: "01", label: "ZERO-LEAK CORE", desc: "Triple-seal silicone gasket prevents any lateral liquid migration under pressure.", color: "#b1fe58", textColor: "black" },
  { id: "02", label: "CERAMIC HEATING COIL", desc: "1.0Ω mesh coil for consistent vapor density and true-to-flavor delivery.", color: "#8fdcff", textColor: "black" },
  { id: "03", label: "AIRFLOW ENGINE", desc: "Dual air-path system with precision-drilled intake ports for smooth MTL draw.", color: "#fdd34d", textColor: "black" },
  { id: "04", label: "TYPE-C FAST CHARGE", desc: "5V/1A USB-C achieves 80% battery in under 30 minutes.", color: "#ff7c8e", textColor: "black" },
];

export default function DesignPage() {
  const specsRef = useRef(null);
  const specsInView = useInView(specsRef, { once: true, amount: 0.2 });

  return (
    <main
      className="min-h-screen pt-[140px]"
      style={{
        background: "linear-gradient(160deg, #f4f4f0 0%, #e8f7ff 30%, #f0ffe0 60%, #fff3e0 100%)",
      }}
    >
      {/* === PAGE HEADER === */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <span className="font-mono text-xs font-black uppercase tracking-[0.3em] bg-black text-[#b1fe58] px-4 py-2 inline-block mb-6 border-b-4 border-[#b1fe58]">
            DOCUMENT: VF-DESIGN-001 // ENGINEERING ARCHIVE
          </span>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <h1 className="font-headline font-black text-7xl md:text-[9rem] uppercase leading-[0.82] tracking-tighter">
              ANATOMY<br />
              <span className="bg-[#b1fe58] px-4 border-[5px] border-black inline-block rotate-[-1.5deg] shadow-[8px_8px_0_0_#000]">
                OF VEEF
              </span>
            </h1>
            <div className="max-w-xs flex flex-col gap-3">
              <p className="font-mono text-sm font-bold text-zinc-600 border-l-[5px] border-black pl-4 leading-relaxed">
                COMPLETE TECHNICAL SPECIFICATION & DESIGN RATIONALE FOR THE VEEF POD PLATFORM. REVISION B.
              </p>
              <div className="flex gap-2">
                <span className="bg-[#8fdcff] border-[3px] border-black px-3 py-1 font-mono text-xs font-black">ISO 9001</span>
                <span className="bg-[#fdd34d] border-[3px] border-black px-3 py-1 font-mono text-xs font-black">REV. B</span>
                <span className="bg-[#ff7c8e] border-[3px] border-black px-3 py-1 font-mono text-xs font-black text-white">2026</span>
              </div>
            </div>
          </div>
          <div className="mt-8 h-[5px] bg-black w-full"></div>
        </motion.div>
      </section>

      {/* === MAIN DIAGRAM === */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        {/* Fixed-height canvas — only visible on lg+ */}
        <div className="relative w-full hidden lg:flex items-center justify-center" style={{ height: "700px" }}>

          {/* ── SVG CONNECTOR LINES (Diagonal, color-coded) ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
          >
            {/* Card 03 (Airflow, yellow — top-left) → pod top-left INSIDE */}
            <line x1="300" y1="140" x2="455" y2="195" stroke="#fdd34d" strokeWidth="3" strokeDasharray="10,6" />
            <circle cx="455" cy="195" r="7" fill="#fdd34d" stroke="black" strokeWidth="3" />

            {/* Card 04 (Charge, pink — bottom-left) → pod bottom-left INSIDE */}
            <line x1="300" y1="555" x2="360" y2="555" stroke="#ff7c8e" strokeWidth="3" strokeDasharray="10,6" />
            <line x1="360" y1="555" x2="455" y2="610" stroke="#ff7c8e" strokeWidth="3" strokeDasharray="10,6" />
            <circle cx="455" cy="610" r="7" fill="#ff7c8e" stroke="black" strokeWidth="3" />

            {/* Card 01 (Zero-Leak, lime — top-right) → pod top-right INSIDE */}
            <line x1="900" y1="140" x2="745" y2="195" stroke="#b1fe58" strokeWidth="3" strokeDasharray="10,6" />
            <circle cx="745" cy="195" r="7" fill="#b1fe58" stroke="black" strokeWidth="3" />

            {/* Card 02 (Ceramic, blue — bottom-right) → pod mid-right INSIDE */}
            <line x1="900" y1="510" x2="745" y2="440" stroke="#8fdcff" strokeWidth="3" strokeDasharray="10,6" />
            <circle cx="745" cy="440" r="7" fill="#8fdcff" stroke="black" strokeWidth="3" />
          </svg>

          {/* ── CENTER POD CARD (truly centered via flex parent) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-center z-20 relative"
            style={{ width: "340px" }}
          >
            <div className="mb-3 font-mono text-xs font-black border-[3px] border-black bg-white px-4 py-1.5 text-center shadow-[3px_3px_0_0_#000]">
              SPECIMEN: OBSIDIAN EDITION // SCALE 1:1
            </div>
            <div className="relative w-full bg-white border-[5px] border-black shadow-[10px_10px_0_0_#000] flex items-center justify-center overflow-hidden" style={{ height: "600px" }}>
              {/* Corner colorful accents */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-[#b1fe58] border-r-[4px] border-b-[4px] border-black z-10"></div>
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#8fdcff] border-l-[4px] border-b-[4px] border-black z-10"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#fdd34d] border-r-[4px] border-t-[4px] border-black z-10"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#ff7c8e] border-l-[4px] border-t-[4px] border-black z-10"></div>
              {/* Header stripe */}
              <div className="absolute top-0 left-12 right-12 h-10 border-b-[4px] border-black flex items-center justify-center z-10">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest">FIG. 01</span>
              </div>
              {/* Pod image */}
              <motion.div
                animate={{ y: [-10, 10] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
                className="relative z-20 mt-6"
                style={{ width: "65%", height: "78%" }}
              >
                <Image
                  fill
                  src="/veef_pod_design_hero_1775295887963.png"
                  alt="Veef Pod Obsidian — Technical Diagram"
                  className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)]"
                  priority
                />
              </motion.div>
              {/* Footer stripe */}
              <div className="absolute bottom-0 left-12 right-12 h-10 border-t-[4px] border-black flex items-center justify-center z-10">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-zinc-500">103mm × 22mm × 13mm</span>
              </div>
            </div>
          </motion.div>

          {/* ── ANNOTATION CARDS (absolute positioned, no grid) ── */}

          {/* TOP-LEFT: 03 Airflow */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute z-20"
            style={{ left: 0, top: 40, width: "300px" }}
          >
            <div className="p-5 border-[4px] border-black shadow-[6px_6px_0_0_#000] cursor-default hover:-translate-y-1 transition-transform" style={{ backgroundColor: "#fdd34d" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-black text-lg leading-none">03</span>
                <div className="h-[3px] flex-1 bg-black"></div>
              </div>
              <h4 className="font-headline font-black uppercase text-base tracking-tight mb-2">AIRFLOW ENGINE</h4>
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">Dual air-path system with precision-drilled intake ports for smooth MTL draw.</p>
            </div>
          </motion.div>

          {/* BOTTOM-LEFT: 04 Type-C */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="absolute z-20"
            style={{ left: 0, bottom: 60, width: "300px" }}
          >
            <div className="p-5 border-[4px] border-black shadow-[6px_6px_0_0_#000] cursor-default hover:-translate-y-1 transition-transform" style={{ backgroundColor: "#ff7c8e" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-black text-lg leading-none">04</span>
                <div className="h-[3px] flex-1 bg-black"></div>
              </div>
              <h4 className="font-headline font-black uppercase text-base tracking-tight mb-2">TYPE-C FAST CHARGE</h4>
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">5V/1A USB-C achieves 80% battery in under 30 minutes.</p>
            </div>
          </motion.div>

          {/* TOP-RIGHT: 01 Zero-Leak */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute z-20"
            style={{ right: 0, top: 40, width: "300px" }}
          >
            <div className="p-5 border-[4px] border-black shadow-[6px_6px_0_0_#000] cursor-default hover:-translate-y-1 transition-transform" style={{ backgroundColor: "#b1fe58" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-black text-lg leading-none">01</span>
                <div className="h-[3px] flex-1 bg-black"></div>
              </div>
              <h4 className="font-headline font-black uppercase text-base tracking-tight mb-2">ZERO-LEAK CORE</h4>
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">Triple-seal silicone gasket prevents any lateral liquid migration under pressure.</p>
            </div>
          </motion.div>

          {/* BOTTOM-RIGHT: 02 Ceramic Coil */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="absolute z-20"
            style={{ right: 0, bottom: 100, width: "300px" }}
          >
            <div className="p-5 border-[4px] border-black shadow-[6px_6px_0_0_#000] cursor-default hover:-translate-y-1 transition-transform" style={{ backgroundColor: "#8fdcff" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-black text-lg leading-none">02</span>
                <div className="h-[3px] flex-1 bg-black"></div>
              </div>
              <h4 className="font-headline font-black uppercase text-base tracking-tight mb-2">CERAMIC HEATING COIL</h4>
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">1.0Ω mesh coil for consistent vapor density and true-to-flavor delivery.</p>
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE FALLBACK (stacked) ── */}
        <div className="flex flex-col gap-5 lg:hidden">
          {annotations.map((ann) => (
            <div key={ann.id} className="p-5 border-[4px] border-black shadow-[6px_6px_0_0_#000]" style={{ backgroundColor: ann.color }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-black text-lg">{ann.id}</span>
                <div className="h-[3px] flex-1 bg-black"></div>
              </div>
              <h4 className="font-headline font-black uppercase text-base mb-2">{ann.label}</h4>
              <p className="font-mono text-xs text-zinc-700 leading-relaxed">{ann.desc}</p>
            </div>
          ))}
          {/* Pod image for mobile */}
          <div className="relative h-64 bg-white border-[4px] border-black shadow-[6px_6px_0_0_#000] flex items-center justify-center">
            <Image fill src="/veef_pod_design_hero_1775295887963.png" alt="Veef Pod" className="object-contain p-4" />
          </div>
        </div>
      </section>


      {/* === MATERIAL CALLOUT STRIP === */}
      <section className="border-y-[6px] border-black bg-black py-12 mb-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "shield", label: "POLYCARBONATE SHELL", sub: "Impact & Heat Resistant", color: "#b1fe58" },
            { icon: "grain", label: "CERAMIC MESH COIL", sub: "Zero-Char, True Flavor", color: "#8fdcff" },
            { icon: "battery_charging_full", label: "LI-POLYMER CELL", sub: "400mAh High-Density", color: "#fdd34d" },
            { icon: "air", label: "DUAL AIRPATH SYSTEM", sub: "MTL-Optimized Flow", color: "#ff7c8e" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-start gap-3 group cursor-default">
              <div
                className="w-14 h-14 border-[4px] border-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-[3px_3px_0_0_rgba(255,255,255,0.3)]"
                style={{ backgroundColor: item.color }}
              >
                <span className="material-symbols-outlined text-3xl text-black">{item.icon}</span>
              </div>
              <div>
                <h5 className="font-headline font-black text-sm uppercase tracking-wider text-white leading-tight">{item.label}</h5>
                <p className="font-mono text-xs mt-1" style={{ color: item.color }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SPECS TABLE === */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-6 mb-28">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-10">
          <div className="flex items-end justify-between border-b-[5px] border-black pb-6">
            <h2 className="font-headline font-black text-5xl md:text-6xl uppercase leading-[0.9]">PARAMETER<br />SPECIFICATIONS</h2>
            <span className="font-mono text-xs text-zinc-400 font-bold hidden md:block">TABLE 01 // VEEF POD STD.</span>
          </div>
        </motion.div>

        <div className="border-[5px] border-black bg-white shadow-[10px_10px_0_0_#000] overflow-hidden">
          <div className="grid grid-cols-3 bg-black text-white font-mono text-xs font-black uppercase tracking-widest">
            <div className="p-4 border-r-[3px] border-zinc-700">PARAMETER</div>
            <div className="p-4 border-r-[3px] border-zinc-700">VALUE</div>
            <div className="p-4">NOTATION</div>
          </div>
          {specs.map((s, i) => {
            const accent = ["#b1fe58", "#8fdcff", "#fdd34d", "#ff7c8e"][i % 4];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                animate={specsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="grid grid-cols-3 font-mono text-sm border-b-[2px] border-black last:border-b-0 hover:bg-[#f4f4f0] transition-colors group"
              >
                <div className="p-4 border-r-[2px] border-black font-black text-xs uppercase tracking-wide flex items-center gap-3">
                  <div className="w-2 h-8 flex-shrink-0 border-[2px] border-black" style={{ backgroundColor: accent }}></div>
                  {s.label}
                </div>
                <div className="p-4 border-r-[2px] border-black font-bold text-zinc-700">{s.value}</div>
                <div className="p-4 font-bold text-xs uppercase tracking-wide text-zinc-400 group-hover:text-black transition-colors">{s.note}</div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-end">
          <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-widest">All specs subject to change — Veef Archive Rev. B // 2026</span>
        </div>
      </section>

      {/* === WARNING BLOCK === */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 border-[5px] border-black overflow-hidden shadow-[10px_10px_0_0_#000]">
          <div className="md:col-span-2 bg-black text-white p-10 flex flex-col gap-6">
            <h3 className="font-headline font-black text-4xl uppercase text-[#b1fe58]">WARNING: ADULT USE ONLY</h3>
            <p className="font-mono text-sm text-zinc-400 leading-loose">
              THIS PRODUCT CONTAINS NICOTINE. NICOTINE IS AN ADDICTIVE CHEMICAL. INTENDED FOR USE BY EXISTING SMOKERS AND ADULT VAPERS ONLY. NOT FOR USE BY NON-SMOKERS, MINORS, PREGNANT/NURSING WOMEN, OR PERSONS WITH CARDIOVASCULAR CONDITIONS.
            </p>
          </div>
          <div className="bg-[#ff7c8e] border-l-[5px] border-black p-10 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs font-black uppercase mb-1 text-black/60">Minimum Age</p>
              <p className="font-headline font-black text-8xl text-black leading-none">21+</p>
            </div>
            <div className="border-t-[3px] border-black pt-4 mt-4">
              <p className="font-mono text-xs font-black uppercase mb-1 text-black/60">Certified By</p>
              <p className="font-headline font-black text-lg uppercase">ISO 9001 / VEEF STD.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
