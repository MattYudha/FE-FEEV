"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const showNotification = useCartStore((state) => state.showNotification);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Failed fetching collection:", err);
        setLoadingProducts(false);
      });
  }, []);

  // Framer Motion Variants for Staggered reveals
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="overflow-hidden">
      <main className="pt-[140px]">
        {/* Hero Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-6 mb-24 mt-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <motion.div variants={itemVariants} className="inline-block bg-secondary-container neo-border px-4 py-2 font-label font-bold text-sm transform -rotate-2 neo-shadow">
                #1 PREMIUM DEVICE
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-6xl md:text-[5.5rem] leading-[1.1] relative">
                <span className="relative inline-block hover:-translate-y-2 transition-transform cursor-default mr-4">Vape</span>
                <span className="relative inline-block hover:-translate-y-2 transition-transform cursor-default">The</span><br />
                <span className="text-primary bg-primary-container px-2 neo-border inline-block rotate-1 hover:-rotate-1 transition-all">Future.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl max-w-lg font-body font-bold leading-relaxed text-gray-800 border-l-[4px] border-black pl-4">
                Experience the next generation of vaping. Sleek, minimalist, and packed with bold flavors. Veef POD redefines your daily ritual.
              </motion.p>
              <motion.div variants={itemVariants}>
                <NeoButton variant="dark" className="rounded-xl px-10 py-5 text-xl">
                  GET YOUR VEEF
                  <span className="material-symbols-outlined text-primary-container">bolt</span>
                </NeoButton>
              </motion.div>
            </div>
            {/* Hero Image Area */}
            <motion.div variants={itemVariants} className="relative h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-tertiary-container neo-border rounded-3xl neo-shadow transform rotate-3 flex items-center justify-center p-8 z-0"></div>
              <div className="absolute inset-0 bg-white neo-border rounded-3xl neo-shadow overflow-hidden z-10 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [-15, 15] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                  className="w-full h-full relative"
                >
                  <Image 
                    fill
                    className="object-contain scale-125"
                    alt="Veef Pod Hero Device"
                    src="/veef_pod_hero_1775289964781.png"
                    priority
                  />
                </motion.div>
              </div>
              {/* Bubble Badge */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-6 -left-6 neo-border bg-error-container p-5 neo-shadow rounded-full w-28 h-28 flex flex-col items-center justify-center z-20"
              >
                <span className="font-headline text-3xl font-black">100%</span>
                <p className="font-label text-[10px] font-black uppercase text-center leading-tight">Authentic Flavor</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Anatomy Section */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}
          className="max-w-7xl mx-auto px-6 mb-32"
        >
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl">The Veef Anatomy</h2>
            <div className="h-[4px] bg-black flex-1 mx-8 hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NeoCard variant="secondary" className="rounded-xl p-8 flex flex-col justify-between h-72 group cursor-crosshair">
              <div className="bg-white neo-border w-16 h-16 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-4xl text-black">battery_charging_full</span>
              </div>
              <div>
                <h3 className="text-2xl mb-2">Fast Charge</h3>
                <p className="font-label text-sm uppercase opacity-80 font-bold">80% in 30 mins</p>
              </div>
            </NeoCard>

            <NeoCard variant="primary" className="rounded-xl p-8 flex flex-col justify-between h-72 group cursor-crosshair">
              <div className="bg-white neo-border w-16 h-16 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform">
                <span className="material-symbols-outlined text-4xl text-black">water_drop</span>
              </div>
              <div>
                <h3 className="text-2xl mb-2">Leak-Proof</h3>
                <p className="font-label text-sm uppercase opacity-80 font-bold">Zero Spill Engine</p>
              </div>
            </NeoCard>

            <NeoCard variant="tertiary" className="rounded-xl p-8 flex flex-col justify-between h-72 group cursor-crosshair">
              <div className="bg-white neo-border w-16 h-16 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-4xl text-black">air</span>
              </div>
              <div>
                <h3 className="text-2xl mb-2">Airflow Tech</h3>
                <p className="font-label text-sm uppercase opacity-80 font-bold">Smooth Draw</p>
              </div>
            </NeoCard>

            <NeoCard variant="error" className="rounded-xl p-8 flex flex-col justify-between h-72 group cursor-crosshair">
              <div className="bg-white neo-border w-16 h-16 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform">
                <span className="material-symbols-outlined text-4xl text-black">star</span>
              </div>
              <div>
                <h3 className="text-2xl mb-2">Premium Feel</h3>
                <p className="font-label text-sm uppercase opacity-80 font-bold">Matte Finish</p>
              </div>
            </NeoCard>
          </div>
        </motion.section>

        {/* Collection Section */}
        <section className="bg-white py-24 neo-border border-x-0 relative overflow-hidden">
          <div className="absolute top-10 right-10 opacity-10 font-headline font-black text-9xl">VEEF</div>
          <div className="absolute bottom-10 left-10 opacity-10 font-headline font-black text-9xl">POD</div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}
            className="max-w-7xl mx-auto px-6 relative z-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
              <h2 className="text-5xl bg-primary-container px-4 py-2 neo-border inline-block -rotate-1">Our Collection</h2>
              <div className="neo-border bg-surface px-4 py-2 font-label font-bold flex items-center gap-2 cursor-pointer neo-hover transition-transform">
                FILTER: ALL <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {loadingProducts ? (
                <div className="col-span-3 text-center py-20 font-headline font-black text-2xl">LOADING COLLECTION...</div>
              ) : (
                products.map((product, index) => (
                  <motion.div key={product.id} initial="hidden" animate="visible" variants={itemVariants} className="flex flex-col">
                    <NeoCard className="rounded-2xl overflow-hidden mb-6 aspect-square relative group p-6 flex items-center justify-center bg-surface w-full">
                      <motion.div 
                        animate={{ y: [-5, 5] }} 
                        transition={{ repeat: Infinity, duration: 2.5 + (index * 0.2), ease: "easeInOut", repeatType: "reverse" }}
                        className="w-full h-full relative"
                      >
                        <Image fill className="object-contain group-hover:scale-110 transition-transform duration-500" src={product.heroImage} alt={product.name} />
                      </motion.div>
                      <div className={`absolute top-4 right-4 text-white neo-border px-3 py-1 font-headline font-black text-sm neo-shadow rotate-3 group-hover:rotate-6 transition-transform z-10 ${index % 2 === 0 ? 'bg-primary-container text-black' : 'bg-secondary-container' }`}>
                        {product.variant.toUpperCase()}
                      </div>
                    </NeoCard>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-label text-xs uppercase text-zinc-500 font-black mb-1">{product.tagline}</p>
                        <h4 className="text-2xl font-headline">{product.variant}</h4>
                      </div>
                      <span className="text-2xl font-headline font-black bg-primary-container px-2 neo-border">
                        Rp {product.price}k
                      </span>
                    </div>
                    <div className="flex gap-4 w-full">
                      <NeoButton 
                        variant="light" 
                        className="flex-1 py-4 text-xl" 
                        onClick={() => {
                          if (!isAuthenticated) {
                            showNotification("ERROR: LOGIN_REQUIRED_TO_ACCESS_MANIFEST");
                            return;
                          }
                          addItem({ id: product.id, name: product.name, price: product.price, image: product.heroImage, variant: product.variant, finish: product.finishColor });
                        }}
                      >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </NeoButton>
                      <NeoButton variant="dark" className="flex-[2] py-4 text-lg" onClick={() => router.push(`/product/${product.id}`)}>
                        Buy Now <span className="material-symbols-outlined">arrow_forward</span>
                      </NeoButton>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </section>

        {/* Specimen Section */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-5 space-y-8">
              <motion.h2 variants={itemVariants} className="text-6xl leading-[0.9] bg-white inline-block px-4 py-2 neo-border neo-shadow">
                Vape With<br />Attitude.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl font-bold font-body text-gray-800 border-l-[4px] border-black pl-4">
                Veef POD is built for those who demand excellence. Outstanding flavors, perfect cloud production, and a design that turns heads.
              </motion.p>
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="neo-border p-4 bg-white neo-shadow flex items-center gap-4 hover:-translate-x-2 transition-transform cursor-default">
                  <div className="w-14 h-14 bg-primary-container neo-border rounded-full flex items-center justify-center font-black text-xl">01</div>
                  <span className="font-headline font-bold text-xl">Ceramic Coil Tech</span>
                </div>
                <div className="neo-border p-4 bg-white neo-shadow flex items-center gap-4 hover:-translate-x-2 transition-transform cursor-default">
                  <div className="w-14 h-14 bg-secondary-container neo-border rounded-full flex items-center justify-center font-black text-xl">02</div>
                  <span className="font-headline font-bold text-xl">Smart Temp Control</span>
                </div>
                <div className="neo-border p-4 bg-white neo-shadow flex items-center gap-4 hover:-translate-x-2 transition-transform cursor-default">
                  <div className="w-14 h-14 bg-tertiary-container neo-border rounded-full flex items-center justify-center font-black text-xl">03</div>
                  <span className="font-headline font-bold text-xl">Magnetic Connection</span>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="lg:col-span-7 grid grid-cols-2 gap-4 mt-12 md:mt-0">
              <div className="neo-border aspect-square bg-[#1a1a1a] p-8 flex items-center justify-center neo-shadow text-white">
                <h3 className="text-5xl text-center">400+ PUFFS</h3>
              </div>
              <div className="neo-border aspect-square bg-primary-container flex items-center justify-center neo-shadow p-6 relative">
                <motion.div animate={{ y: [-10, 10] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatType: "reverse" }} className="w-full h-full relative">
                  <Image fill className="object-contain" src="/veef_pod_black_1775289983364.png" alt="Veef Pod" />
                </motion.div>
              </div>
              <div className="neo-border aspect-square bg-error-container p-8 flex flex-col justify-center items-center neo-shadow -mt-12 text-center text-white">
                <span className="material-symbols-outlined text-6xl mb-4 text-black">local_fire_department</span>
                <p className="font-headline font-black leading-tight text-xl text-black">INTENSE <br />FLAVOR</p>
              </div>
              <div className="neo-border aspect-square bg-white neo-shadow flex items-center justify-center overflow-hidden relative">
                <Image fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" src="/assets/textures/vapor_cloud.png" alt="Vapor cloud texture" />
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
