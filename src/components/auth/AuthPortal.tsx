"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

/* ─── Animation Variants ─────────────────────────── */
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 }
    }
  })
};

/* ─── Login Form Component ────────────────────────── */
const LoginForm = ({ toggle, onLoginSuccess }: { toggle: () => void; onLoginSuccess?: () => void }) => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const showNotification = useCartStore((state) => state.showNotification);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Login failed");
      
      setAuth(data.user, data.token);
      showNotification("ACCESS_GRANTED: SESSION_INITIALIZED");
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push("/");
      }
    } catch (err: any) {
      showNotification(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="login"
      custom={-1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md"
    >
      <div className="bg-white border-[5px] border-black p-6 md:p-10 shadow-[15px_15px_0px_0px_#000000] relative">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm font-bold">lock</span>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Authentication Required</span>
          </div>
          <h2 className="text-4xl md:text-5xl headline font-black text-black uppercase tracking-tighter leading-none">Secure Access</h2>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="font-mono font-black text-[10px] text-black uppercase tracking-[0.1em]">Email Address</label>
              <span className="text-[9px] font-mono opacity-20 uppercase tracking-tighter">Ref: User_ID</span>
            </div>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-[#faf9f5] border-4 border-black font-body text-lg focus:bg-white transition-all outline-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              placeholder="ENTER ARCHIVE IDENTIFIER"
              type="email"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="font-mono font-black text-[10px] text-black uppercase tracking-[0.1em]">Password</label>
              <span className="text-[9px] font-mono opacity-20 uppercase tracking-tighter">Ref: Auth_Key</span>
            </div>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 bg-[#faf9f5] border-4 border-black font-body text-lg focus:bg-white transition-all outline-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              placeholder="••••••••••••"
              type="password"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input className="peer sr-only" type="checkbox" />
              <div className="w-5 h-5 border-2 border-black bg-white peer-checked:bg-primary-container transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-xs hidden peer-checked:block font-black">check</span>
              </div>
              <span className="font-mono text-[9px] font-black uppercase opacity-40 group-hover:opacity-100 tracking-wider">Maintain Session</span>
            </label>
            <button type="button" className="font-mono text-[9px] font-black uppercase text-error hover:underline underline-offset-4 tracking-wider">Reset Key</button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-primary-container text-black border-4 border-black py-6 px-4 shadow-[10px_10px_0px_0px_#000000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-wait"
          >
            <span className="text-2xl headline font-black uppercase tracking-tighter">
              {loading ? "Initializing..." : "Enter the Archive"}
            </span>
            <span className="material-symbols-outlined font-black text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </button>
        </form>

        <div className="mt-12 pt-8 border-t-2 border-black/5">
          <button
            onClick={toggle}
            className="w-full border-4 border-black bg-secondary-container text-black py-4 px-4 headline font-bold uppercase tracking-tight hover:bg-white transition-colors text-sm shadow-[8px_8px_0px_0px_#000000]"
          >
            Register New Identity
          </button>
        </div>

        {/* Footer Icons */}
        <div className="mt-10 flex justify-center gap-4">
          <div className="w-10 h-10 border-2 border-black bg-error-container shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-black">database</span>
          </div>
          <div className="w-10 h-10 border-2 border-black bg-tertiary-container shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-black">hub</span>
          </div>
          <div className="w-10 h-10 border-2 border-black bg-secondary-container shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-black">terminal</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Register Form Component ─────────────────────── */
const RegisterForm = ({ toggle }: { toggle: () => void }) => {
  const showNotification = useCartStore((state) => state.showNotification);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification("ERROR: ACCESS_KEY_MISMATCH");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Registration failed");
      
      showNotification("PROTOCOL_INITIALIZED: IDENTITY_CREATED");
      toggle(); // Switch back to login
    } catch (err: any) {
      showNotification(`ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="register"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md"
    >
      <div className="bg-white border-[5px] border-black p-6 md:p-10 shadow-[15px_15px_0px_0px_#000000] relative">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm font-bold">person_add</span>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Identity Creation</span>
          </div>
          <h2 className="text-4xl md:text-5xl headline font-black text-black uppercase tracking-tighter leading-none">New Identity</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono font-black text-[10px] text-black uppercase block tracking-widest">Full Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-4 bg-[#faf9f5] border-4 border-black font-body text-lg outline-none focus:bg-white transition-all shadow-[8px_8px_0px_0px_#000000]"
                placeholder="OPERATOR NAME"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono font-black text-[10px] text-black uppercase block tracking-widest">Email Address</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-[#faf9f5] border-4 border-black font-body text-lg outline-none focus:bg-white transition-all shadow-[8px_8px_0px_0px_#000000]"
                placeholder="USER@VEEF.COM"
                type="email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono font-black text-[10px] text-black uppercase block tracking-widest">Password</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-[#faf9f5] border-4 border-black font-body text-lg outline-none focus:bg-white transition-all shadow-[8px_8px_0px_0px_#000000]"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono font-black text-[10px] text-black uppercase block tracking-widest">Confirm Key</label>
                <input
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-[#faf9f5] border-4 border-black font-body text-lg outline-none focus:bg-white transition-all shadow-[8px_8px_0px_0px_#000000]"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full mt-4 bg-black text-primary-container border-4 border-black py-6 px-4 shadow-[10px_10px_0px_0px_rgba(177,254,88,0.5)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0px_0px_#b1fe58] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
          >
            <span className="text-2xl headline font-black uppercase tracking-tighter">
              {loading ? "Processing..." : "Join the Archive"}
            </span>
            <span className="material-symbols-outlined font-black text-3xl group-hover:rotate-12 transition-transform">person_add</span>
          </button>
        </form>

        <div className="mt-10 pt-8 border-t-2 border-black/5">
          <button
            onClick={toggle}
            className="w-full border-4 border-black bg-[#faf9f5] text-black py-4 px-4 headline font-bold uppercase tracking-tight hover:bg-primary-container transition-colors text-sm shadow-[8px_8px_0px_0px_#000000]"
          >
            Already Registered? Login
          </button>
        </div>

        {/* Footer Icons */}
        <div className="mt-10 flex justify-center gap-4">
          <div className="w-10 h-10 border-2 border-black bg-error-container shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-black">database</span>
          </div>
          <div className="w-10 h-10 border-2 border-black bg-tertiary-container shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-black">hub</span>
          </div>
          <div className="w-10 h-10 border-2 border-black bg-secondary-container shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center">
            <span className="material-symbols-outlined text-sm font-black">terminal</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AuthPortal = ({ onLoginSuccess }: { onLoginSuccess?: () => void }) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [direction, setDirection] = useState(0);

  const toggleMode = () => {
    setDirection(mode === "login" ? 1 : -1);
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <AnimatePresence mode="wait" custom={direction} initial={false}>
      {mode === "login" ? (
        <LoginForm key="login-view" toggle={toggleMode} onLoginSuccess={onLoginSuccess} />
      ) : (
        <RegisterForm key="register-view" toggle={toggleMode} />
      )}
    </AnimatePresence>
  );
};
