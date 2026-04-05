"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

// Interface for Backend Product Data
interface BackendProduct {
  id: string; // The gorm numerical id, wait we used ProductID in struct
  product_id: string; // Due to JSON unmarshaling, let's use the actual struct fields
  name: string;
  variant: string;
  price: number;
  finishColor: string;
  description: string;
  tagline: string;
  heroImage: string;
  images: string[];
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Safe default finish color (will be set to product.finishColor when loaded)
  const [selectedFinish, setSelectedFinish] = useState("");
  // Active image src — swaps to the selected color variant image
  const [activeImage, setActiveImage] = useState("");
  
  const addItem = useCartStore((state) => state.addItem);
  const showNotification = useCartStore((state) => state.showNotification);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // We fetch from the local Go backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/products/${resolvedParams.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Product not found for ID: ${resolvedParams.id}. Please go back to the homepage and click the product again.`);
        return res.json();
      })
      .then((data) => {
        // Parse the images which is a JSON array in SQLite/Gorm Datatypes
        let parsedImages = [];
        try {
          if (typeof data.images === 'string') {
            parsedImages = JSON.parse(data.images);
          } else {
            parsedImages = data.images;
          }
        } catch (e) {
          parsedImages = [data.heroImage];
        }
        
        setProduct({
          ...data,
          images: parsedImages,
          product_id: data.id, // mapped gorm ID if needed, or use params.id
        });
        setSelectedFinish(data.finishColor);
        setActiveImage(data.heroImage);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  // Image-based color swap — each finish has its own pre-generated image
  // Same pod shape/background, only body color changes
  const finishes = [
    { name: "Graphite Grey",  color: "bg-[#888]",     ringClass: "ring-[#888]",     imageSrc: "/veef_pod_hero_1775289964781.png" },
    { name: "Obsidian Black", color: "bg-black",       ringClass: "ring-black",       imageSrc: "/assets/products/pod_black.png" },
    { name: "Arctic White",   color: "bg-slate-100",  ringClass: "ring-slate-300",   imageSrc: "/assets/products/pod_white.png" },
    { name: "Cyan Blue",      color: "bg-cyan-400",   ringClass: "ring-cyan-400",    imageSrc: "/assets/products/pod_blue.png" },
    { name: "Lime Green",     color: "bg-[#b0f25c]", ringClass: "ring-[#b0f25c]",  imageSrc: "/assets/products/pod_green.png" },
  ];

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      showNotification("ERROR: LOGIN_REQUIRED_TO_ACCESS_MANIFEST");
      return false;
    }
    
    addItem({
      id: resolvedParams.id,
      name: product.name,
      price: product.price,
      image: activeImage || product.heroImage,
      variant: product.variant,
      finish: selectedFinish,
    });
    return true;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-headline font-black text-4xl">LOADING MANIFEST...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-headline font-black text-4xl text-error">CRITICAL ERROR: MANIFEST NOT FOUND</div>;
  }

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen pt-24 pb-12">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants} className="neo-border neo-shadow bg-white overflow-hidden group relative h-[400px] md:h-[600px] w-full">
              <Image
                fill
                className="object-contain transition-all duration-500 group-hover:scale-105 p-4"
                alt={product.name}
                src={activeImage || product.heroImage}
              />
            </motion.div>
            {/* Mini pod preview strip — click each to swap main image */}
            <motion.div variants={itemVariants} className="grid grid-cols-5 gap-3">
              {finishes.map((f, idx) => (
                <button
                  key={idx}
                  title={f.name}
                  onClick={() => { setSelectedFinish(f.name); setActiveImage(f.imageSrc); }}
                  className={`relative aspect-square neo-border bg-white overflow-hidden transition-all ${
                    selectedFinish === f.name
                      ? `ring-2 ring-offset-2 ${f.ringClass} scale-[1.08] neo-shadow-sm`
                      : 'hover:scale-[1.04] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image fill className="object-contain p-1" alt={f.name} src={f.imageSrc} />
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Product Details */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="font-mono text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 neo-border uppercase tracking-widest font-bold">
                CATALOG_ID: {resolvedParams.id.toUpperCase()}
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl font-black font-headline uppercase leading-[0.9] mb-4 tracking-tighter text-on-surface">
              {product.name.split(' ')[0]} {product.name.split(' ')[1]}<br />
              <span className="text-primary-container bg-black px-2 mt-2 inline-block">
                {product.name.split(' ').slice(2).join(' ')}
              </span> 
            </motion.h1>

            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 mt-4">
              <span className="text-4xl font-bold font-headline">${product.price.toFixed(2)}</span>
              <div className="flex gap-1 text-primary">
                <span className="material-symbols-outlined text-black font-bold fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-black font-bold fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-black font-bold fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-black font-bold fill" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-black font-bold">star_half</span>
                <span className="font-mono text-xs opacity-60 ml-2 self-center font-bold tracking-widest">(128 REVIEWS)</span>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg mb-8 text-on-surface-variant font-body leading-relaxed font-bold border-l-4 border-black pl-4">
              {product.description}
            </motion.p>

            {/* Color Picker */}
            <motion.div variants={itemVariants} className="mb-8">
              <label className="font-mono text-xs font-black uppercase tracking-widest block mb-3">Select Finish_</label>
              <div className="flex gap-4">
                {finishes.map((finish) => (
                  <button
                    key={finish.name}
                    title={finish.name}
                    onClick={() => {
                      setSelectedFinish(finish.name);
                      setActiveImage(finish.imageSrc);
                    }}
                    className={`w-12 h-12 ${finish.color} neo-border transition-all ${
                      selectedFinish === finish.name
                        ? `ring-offset-4 ring-2 ${finish.ringClass} neo-shadow-sm scale-110`
                        : "hover:neo-shadow-sm"
                    }`}
                  />
                ))}
              </div>
              <p className="font-mono text-xs font-bold uppercase mt-3 text-on-surface-variant">Selected: {selectedFinish}</p>
            </motion.div>

            {/* Quantity & Add to Cart */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 mb-10">
              <div>
                <label className="font-mono text-xs font-black uppercase tracking-widest block mb-3">Quantity_</label>
                <div className="flex">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 neo-border neo-shadow-sm flex items-center justify-center font-black bg-white active:translate-x-1 active:translate-y-1 active:shadow-none text-xl hover:bg-black hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <div className="w-16 h-12 neo-border border-l-0 border-r-0 flex items-center justify-center font-mono font-black text-xl bg-surface-container-low">
                    {quantity < 10 ? `0${quantity}` : quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 neo-border neo-shadow-sm flex items-center justify-center font-black bg-white active:translate-x-1 active:translate-y-1 active:shadow-none text-xl hover:bg-black hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-secondary-container text-black neo-border neo-shadow py-5 font-headline font-black text-2xl uppercase tracking-widest hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-4 group"
                >
                  ADD TO CART
                  <span className="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform" data-icon="shopping_basket">
                    shopping_basket
                  </span>
                </button>
                <button
                  onClick={() => {
                    const success = handleAddToCart();
                    if (success) router.push("/cart");
                  }}
                  className="w-full bg-primary-container text-black neo-border neo-shadow py-5 font-headline font-black text-2xl uppercase tracking-widest hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#000000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-4 group"
                >
                  BUY NOW
                  <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">
                    arrow_forward
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Specifications Accordion */}
            <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3">
               <details className="neo-border group open:bg-surface-container-highest transition-colors bg-white">
                 <summary className="font-headline font-black text-xl uppercase p-5 flex justify-between items-center cursor-pointer list-none outline-none focus:ring-4 focus:ring-black/10">
                    SPECIFICATIONS_
                    <span className="material-symbols-outlined group-open:-rotate-180 transition-transform">expand_more</span>
                 </summary>
                 <div className="p-5 border-t-4 border-black font-mono text-sm space-y-4 bg-white">
                    <div className="grid grid-cols-2"><span className="opacity-60 font-bold">MATERIAL:</span><span className="font-bold">T6 ALUMINUM / PC-ABS</span></div>
                    <div className="grid grid-cols-2"><span className="opacity-60 font-bold">CAPACITY:</span><span className="font-bold">500 UNITS</span></div>
                    <div className="grid grid-cols-2"><span className="opacity-60 font-bold">DIMENSIONS:</span><span className="font-bold">112MM X 24MM</span></div>
                    <div className="grid grid-cols-2"><span className="opacity-60 font-bold">CHARGE RATE:</span><span className="font-bold">TYPE-C HYPERFLOW</span></div>
                 </div>
               </details>
               <details className="neo-border group open:bg-surface-container-highest transition-colors bg-white">
                 <summary className="font-headline font-black text-xl uppercase p-5 flex justify-between items-center cursor-pointer list-none outline-none focus:ring-4 focus:ring-black/10">
                    COMPLIANCE_
                    <span className="material-symbols-outlined group-open:-rotate-180 transition-transform">expand_more</span>
                 </summary>
                 <div className="p-5 border-t-4 border-black font-mono text-sm space-y-4 bg-white">
                    <p className="font-bold opacity-80">CE, RoHS, and FCC certified. Manufactured following ISO 9001 quality standards and secure handling.</p>
                 </div>
               </details>
               <details className="neo-border group open:bg-surface-container-highest transition-colors bg-white">
                 <summary className="font-headline font-black text-xl uppercase p-5 flex justify-between items-center cursor-pointer list-none outline-none focus:ring-4 focus:ring-black/10">
                    SHIPPING ARCHIVE_
                    <span className="material-symbols-outlined group-open:-rotate-180 transition-transform">expand_more</span>
                 </summary>
                 <div className="p-5 border-t-4 border-black font-mono text-sm space-y-4 bg-white">
                    <p className="font-bold opacity-80">Dispatch within 24 hours. Free Priority shipping for Manifest orders above Rp 500.000.</p>
                 </div>
               </details>
            </motion.div>
          </div>
        </motion.div>

        {/* Visual Documentation Section */}
        <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}
            className="mt-32 mb-16 pt-16 border-t-8 border-black border-dashed"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-headline font-black uppercase leading-[0.9] tracking-tighter">
              VISUAL<br/>DOCUMENTATION
            </motion.h2>
            <motion.div variants={itemVariants} className="font-mono text-[10px] md:text-xs text-left md:text-right opacity-60 uppercase font-black leading-relaxed">
              ARCHIVE_VISUAL_ASSET_LOG // BUREAU_72<br/>
              // CAPTURED_2024
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
               { id: "A", src: product.images[2] || product.heroImage, color: "bg-pink-200" },
               { id: "B", src: product.images[3] || product.heroImage, color: "bg-cyan-200" },
               { id: "C", src: product.images[4] || product.heroImage, color: "bg-[#b0f25c]" }
            ].map((angle, idx) => (
              <motion.div variants={itemVariants} key={idx} className="neo-border bg-[#1a1a1a] aspect-square p-2 relative group overflow-hidden neo-shadow-sm flex items-center justify-center cursor-crosshair">
                <div className="relative w-full h-[95%]">
                  <Image src={angle.src} alt={`Vis Doc ${angle.id}`} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 mix-blend-screen" />
                </div>
                <div className={`absolute bottom-6 left-6 ${angle.color} text-black font-mono font-black text-[10px] px-3 py-1 neo-border uppercase z-10 hover:scale-110 transition-transform`}>
                  ANGLE_{angle.id}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
