import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function DiglitLanding() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Simple ripple simulation
    let damping = 0.985;
    let prev = new Float32Array(w * h);
    let curr = new Float32Array(w * h);

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      prev = new Float32Array(w * h);
      curr = new Float32Array(w * h);
    }

    window.addEventListener('resize', resize);

    function disturb(x, y, radius = 8, strength = 150) {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      for (let j = -radius; j < radius; j++) {
        for (let i = -radius; i < radius; i++) {
          const dx = i;
          const dy = j;
          if (dx * dx + dy * dy > radius * radius) continue;
          const sx = ix + i;
          const sy = iy + j;
          if (sx < 0 || sy < 0 || sx >= w || sy >= h) continue;
          curr[sy * w + sx] += strength * (1 - (dx * dx + dy * dy) / (radius * radius));
        }
      }
    }

    function step() {
      // Propagate waves
      for (let y = 1; y < h - 1; y++) {
        let idx = y * w + 1;
        for (let x = 1; x < w - 1; x++) {
          const i = idx;
          const val = (curr[i - 1] + curr[i + 1] + curr[i - w] + curr[i + w]) / 2 - prev[i];
          prev[i] = val * damping;
          idx++;
        }
      }

      // Swap buffers
      [prev, curr] = [curr, prev];

      // Render
      const stepSize = 4;
      ctx.clearRect(0, 0, w, h);
      
      for (let y = 0; y < h; y += stepSize) {
        for (let x = 0; x < w; x += stepSize) {
          const i = y * w + x;
          const height = prev[i] || 0;
          const dx = Math.floor(x + height * 0.02);
          const dy = Math.floor(y + height * 0.02);
          const sx = Math.max(0, Math.min(w - 1, dx));
          const sy = Math.max(0, Math.min(h - 1, dy));
          
          ctx.fillStyle = `rgba(11, 16, 32, 0.06)`;
          ctx.fillRect(x, y, stepSize, stepSize);
        }
      }

      requestAnimationFrame(step);
    }

    // Initial setup
    ctx.fillStyle = '#0b1020';
    ctx.fillRect(0, 0, w, h);

    // Event handlers
    function onPointer(e) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
      const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
      disturb(x, y, 16, 220);
    }

    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('pointermove', (e) => {
      if (e.buttons === 1) onPointer(e);
    });

    requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-black"></div>
        <div className="absolute inset-0 mix-blend-screen animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      {/* Water canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10 pointer-events-auto" 
      />

      <header className="relative z-30 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 flex items-center justify-center shadow-2xl transform hover:scale-105 transition">
            <span className="text-xl font-bold">🪶</span>
          </div>
          <div>
            <div className="text-sm tracking-widest text-slate-200">DIG|LIT</div>
            <div className="text-xs text-slate-400">Dream · Define · Design · Deploy · Delegate</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-slate-200/90">
          <a className="hover:underline cursor-pointer">Home</a>
          <a className="hover:underline cursor-pointer">Solutions</a>
          <a className="hover:underline cursor-pointer">Services</a>
          <a className="hover:underline cursor-pointer">Shop</a>
          <a className="hover:underline cursor-pointer">Partner</a>
          <button onClick={() => setFormOpen(true)} className="ml-4 px-4 py-2 bg-gradient-to-r from-green-400 to-teal-400 text-black rounded-full font-semibold shadow">Launch a Project 🚀</button>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-30 px-6 py-10 flex items-center justify-center">
        <div className="max-w-5xl w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
                We Dream. Define. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-200">Design</span>.
                <br /> Deploy. Delegate.
              </motion.h1>

              <p className="mt-6 text-slate-300 max-w-xl">AI-driven enterprise & automation studio. Virtual Assistance · Expert Teams · Digital Transformation — powered by adaptive intelligence and human craft.</p>

              <div className="mt-8 flex items-center gap-4">
                <button onClick={() => setFormOpen(true)} className="px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 font-semibold shadow-lg">Request a Project</button>
                <button className="px-4 py-3 rounded-full border border-slate-600 text-slate-200">Explore Solutions</button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-slate-300 opacity-90">
                <div className="p-4 bg-white/3 rounded-lg">Virtual Assistance</div>
                <div className="p-4 bg-white/3 rounded-lg">Expert Teams</div>
                <div className="p-4 bg-white/3 rounded-lg">Digital Transformation</div>
              </div>
            </div>

            {/* Right column */}
            <div className="relative">
              <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-black/40 to-white/2 p-6 backdrop-blur-md border border-white/6 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase text-slate-400">Live Quantum Console</div>
                    <div className="mt-3 text-lg font-mono text-slate-100">Octopus Prime · Neural Bridge</div>
                    <div className="mt-4 text-slate-300 text-sm">Tap the surface — feel the waves. The interface adapts and learns.</div>
                  </div>
                  <div className="text-sm text-slate-400">Status: <span className="text-emerald-400">Online</span></div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/3 rounded">Projects · 12 active</div>
                  <div className="p-3 bg-white/3 rounded">Partners · 24</div>
                </div>

                <div className="mt-6">
                  <div className="h-24 rounded bg-gradient-to-r from-indigo-700 to-cyan-600/40 flex items-center justify-center">Quantum Flow Visual</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Request form modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFormOpen(false)} />
          <motion.form initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-50 max-w-2xl w-full bg-gradient-to-b from-slate-900/80 to-slate-800/80 p-6 rounded-2xl border border-white/6 shadow-2xl" onSubmit={(e) => { e.preventDefault(); setFormOpen(false); alert('Request received — AI will draft a proposal.'); }}>
            <h3 className="text-xl font-semibold">Launch a Project</h3>
            <p className="text-sm text-slate-400 mt-1">Fill this to request a quote or start a conversation.</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input required name="name" placeholder="Name" className="p-3 rounded bg-white/3" />
              <input required name="email" type="email" placeholder="Email" className="p-3 rounded bg-white/3" />
              <select name="type" className="p-3 rounded bg-white/3">
                <option>Individual</option>
                <option>Organization</option>
              </select>
              <select name="interest" className="p-3 rounded bg-white/3">
                <option>Virtual Assistance</option>
                <option>Expert Teams</option>
                <option>Digital Transformation</option>
                <option>AI Enterprise</option>
              </select>
            </div>

            <textarea required name="message" placeholder="Tell us about your project (brief)" className="mt-3 p-3 rounded bg-white/3 w-full min-h-[120px]" />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded border border-white/6">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded bg-gradient-to-r from-green-400 to-teal-400 text-black font-semibold">Send Request</button>
            </div>
          </motion.form>
        </div>
      )}

      <footer className="relative z-30 p-6 text-xs text-slate-400">© {new Date().getFullYear()} Dig|lit · AI-driven Enterprise</footer>

      <style jsx>{`
        @keyframes quantumShift {
          0% { opacity: 0.08; transform: scale(1) translateY(0); filter: hue-rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.03) translateY(-6px); filter: hue-rotate(40deg); }
          100% { opacity: 0.7; transform: scale(1.06) translateY(0); filter: hue-rotate(80deg); }
        }
        .animate-quantumShift { 
          animation: quantumShift 8s ease-in-out infinite; 
        }
      `}</style>
    </div>
  );
}
