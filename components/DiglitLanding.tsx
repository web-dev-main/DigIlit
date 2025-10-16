"use client";

import React, { useEffect, useRef, useState } from "react";

export default function DiglitLanding() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [_mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Individual",
    interest: "Virtual Assistants",
    message: "",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
      life: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.hue = Math.random() * 60 + 200;
        this.life = Math.random() * 100;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life += 0.3;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        const alpha = 0.3 + Math.sin(this.life * 0.05) * 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${alpha})`;
        ctx.fill();

        const glow = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 4
        );
        glow.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${alpha * 0.4})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Connection {
      p1: Particle;
      p2: Particle;
      pulse: number;

      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        this.pulse = Math.random() * Math.PI * 2;
      }

      draw() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          this.pulse += 0.05;
          const alpha = (1 - dist / 150) * 0.3 * (0.5 + Math.sin(this.pulse) * 0.5);

          const gradient = (ctx as CanvasRenderingContext2D).createLinearGradient(
            this.p1.x,
            this.p1.y,
            this.p2.x,
            this.p2.y
          );
          gradient.addColorStop(0, `hsla(${this.p1.hue}, 100%, 60%, ${alpha})`);
          gradient.addColorStop(1, `hsla(${this.p2.hue}, 100%, 60%, ${alpha})`);

          (ctx as CanvasRenderingContext2D).beginPath();
          (ctx as CanvasRenderingContext2D).moveTo(this.p1.x, this.p1.y);
          (ctx as CanvasRenderingContext2D).lineTo(this.p2.x, this.p2.y);
          (ctx as CanvasRenderingContext2D).strokeStyle = gradient;
          (ctx as CanvasRenderingContext2D).lineWidth = 2;
          (ctx as CanvasRenderingContext2D).stroke();
        }
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());
    let connections: Connection[] = [];

    function updateConnections() {
      connections = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          connections.push(new Connection(particles[i], particles[j]));
        }
      }
    }

    updateConnections();

    let time = 0;
    function animate() {
      if (!ctx) return;
      time += 0.01;

      const bgGradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        w
      );
      bgGradient.addColorStop(0, "rgba(10, 10, 30, 0.05)");
      bgGradient.addColorStop(1, "rgba(20, 10, 40, 0.05)");
      ctx.fillStyle = bgGradient as unknown as string;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(150, 100, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 5) {
          const y =
            h / 2 +
            Math.sin(x * 0.01 + time + i * 0.5) * 50 +
            Math.cos(x * 0.02 + time * 0.5) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      connections.forEach((c) => c.draw());
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas || !ctx) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      updateConnections();
    }

    function handleMouseMove(e: MouseEvent) {
      if (!ctx) return;
      setMousePos({ x: e.clientX, y: e.clientY });
      particles.forEach((p) => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }
      });
    }

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setFormOpen(false);
      alert(
        "🚀 Thank you! Our team will connect with you within 24 hours with a custom proposal."
      );
      setFormData({
        name: "",
        email: "",
        type: "Individual",
        interest: "Virtual Assistants",
        message: "",
      });
    }
  };

  const stats = [
    { label: "Virtual Assistants Deployed", value: "247", trend: "+23%" },
    { label: "Expert Hours Delivered", value: "1.2M", trend: "+156%" },
    { label: "Global Partners", value: "89", trend: "+45%" },
    { label: "Projects Completed", value: "12K", trend: "+289%" },
  ];

  const services = [
    {
      icon: "👤",
      title: "Virtual Assistants",
      desc: "Live human professionals dedicated to your success. Executive support, admin tasks, customer service—your remote team, always ready.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "👥",
      title: "Expert Teams",
      desc: "Skilled human collectives hand-picked for your project. Developers, designers, marketers, strategists—assembled on demand.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "🌐",
      title: "Digital Genesis",
      desc: "Full-stack digital transformation. We build your vision from the ground up—websites, apps, systems, brands.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "🤖",
      title: "AI Quantum Solutions",
      desc: "Cutting-edge AI automation and quantum-inspired intelligence. Self-optimizing workflows, predictive analytics, autonomous systems.",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const menuItems = ["Home", "Solutions", "Services", "Shop", "Partners"];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }} />

      <div
        className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 px-8 py-4 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            {/* Top Row - Atoms and Branding */}
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center gap-3">
                {/* 9 Shining Atoms */}
                <div className="flex gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="relative w-3 h-3 group cursor-pointer"
                      style={{
                        animation: `atomShine ${2 + i * 0.3}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 rounded-full" />
                      <div className="absolute inset-0 bg-yellow-200 rounded-full blur-sm opacity-70" />
                      <div className="absolute -inset-1 bg-yellow-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="ml-4 text-center">
                  <div className="text-3xl font-black tracking-wider">
                    DIG
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                      |
                    </span>
                    LIT
                  </div>
                  <div className="text-xs tracking-widest text-gray-400 mt-0.5">
                    Dream · Define · Design · Deploy · Delegate
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Menu */}
            <div className="flex items-center justify-between">
              {/* Search and Menu */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="group relative p-2 hover:bg-white/5 rounded-full transition-all"
                  title="Search"
                >
                  <svg
                    className="w-5 h-5 text-violet-300 group-hover:text-violet-200 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                  </svg>
                  {searchOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-black/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-violet-500 focus:outline-none"
                        autoFocus
                      />
                    </div>
                  )}
                </button>

                <nav className="flex items-center gap-6 text-sm">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveSection(item.toLowerCase())}
                      className={`relative px-3 py-2 transition-all hover:scale-105 ${
                        activeSection === item.toLowerCase()
                          ? "text-violet-300 font-semibold"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item}
                      {activeSection === item.toLowerCase() && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* CTA */}
              <button
                onClick={() => setFormOpen(true)}
                className="group relative px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Let's Connect <span className="text-lg group-hover:rotate-12 transition-transform">✨</span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-8 pt-32">
          <div className="max-w-7xl w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-sm text-violet-300 backdrop-blur-sm animate-pulse">
                  <span className="w-2 h-2 bg-violet-400 rounded-full animate-ping" />
                  Live Human Experts + AI Intelligence
                </div>

                <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                  Your Vision.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                    Our Expertise.
                  </span>
                  <br />
                  Infinite Possibilities.
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  From dedicated virtual assistants to full digital transformation—we blend human excellence with quantum-inspired AI to bring your dreams to life.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setFormOpen(true)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-bold text-lg overflow-hidden hover:scale-105 transition-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Get Started →</span>
                  </button>

                  <button
                    onClick={() => setActiveSection("services")}
                    className="px-8 py-4 border-2 border-white/10 rounded-full font-semibold backdrop-blur-sm hover:bg-white/5 hover:border-violet-500/50 transition-all"
                  >
                    Explore Services
                  </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-8">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="group p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all cursor-pointer hover:scale-105"
                    >
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                        <span>↗</span> {stat.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Console */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                <div className="relative p-8 bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl hover:border-violet-500/30 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Operations Center</div>
                      <div className="text-2xl font-bold mt-1">Live & Active</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-sm text-emerald-400 font-semibold">Online</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="text-xs text-gray-400 mb-2">Team Availability</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Ready to Assist</span>
                        <span className="text-violet-400 font-mono text-lg">24/7</span>
                      </div>
                      <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full animate-pulse" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer hover:scale-105">
                        <div className="text-2xl mb-1">💼</div>
                        <div className="text-xs text-gray-400">VAs Online</div>
                        <div className="text-xl font-bold mt-1">127</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer hover:scale-105">
                        <div className="text-2xl mb-1">👥</div>
                        <div className="text-xs text-gray-400">Experts Ready</div>
                        <div className="text-xl font-bold mt-1">384</div>
                      </div>
                    </div>

                    <div className="relative p-6 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl border border-white/10 overflow-hidden group/card hover:border-violet-500/40 transition-all cursor-pointer">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"
                        style={{ animation: "shimmer 2s ease-in-out infinite" }}
                      />
                      <div className="relative text-center">
                        <div className="text-4xl mb-2">🌟</div>
                        <div className="text-sm text-gray-300 font-semibold">Human Touch + AI Power</div>
                        <div className="text-xs text-gray-500 mt-1">The perfect combination</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                  Our Services
                </span>
              </h2>
              <p className="text-xl text-gray-400">Real humans. Real expertise. Real results.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all hover:scale-105 cursor-pointer overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}
                  />

                  <div className="relative">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{service.desc}</p>
                    <div
                      className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
                    >
                      Learn more <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-white/5 backdrop-blur-xl bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full"
                        style={{
                          animation: `atomShine ${2 + i * 0.3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-2xl font-black">
                    DIG<span className="text-violet-400">|</span>LIT
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Dream · Define · Design · Deploy · Delegate
                </p>
                <p className="text-gray-500 text-sm max-w-md">
                  Transforming visions into reality through human expertise and intelligent automation.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveSection(item.toLowerCase())}
                      className="block text-gray-400 hover:text-violet-400 transition-colors text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Connect</h4>
                <button
                  onClick={() => setFormOpen(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg font-semibold text-sm hover:scale-105 transition-transform"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Dig|lit. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Contact Modal */}
      {formOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 50 }}>
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setFormOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-gradient-to-br from-black/90 to-purple-900/30 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 animate-in">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl font-light leading-none hover:rotate-90 transition-transform"
            >
              ×
            </button>

            <h3 className="text-3xl font-bold mb-2">Let's Connect</h3>
            <p className="text-gray-400 mb-8">
              Tell us about your needs and we'll craft the perfect solution for you.
            </p>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-violet-500 focus:outline-none transition-all hover:bg-white/10"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-violet-500 focus:outline-none transition-all hover:bg-white/10"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-violet-500 focus:outline-none hover:bg-white/10 transition-all"
                >
                  <option>Individual</option>
                  <option>Startup</option>
                  <option>Small Business</option>
                  <option>Enterprise</option>
                  <option>Organization</option>
                </select>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-violet-500 focus:outline-none hover:bg-white/10 transition-all"
                >
                  <option>Virtual Assistants</option>
                  <option>Expert Teams</option>
                  <option>Digital Genesis</option>
                  <option>AI Quantum Solutions</option>
                  <option>Custom Package</option>
                </select>
              </div>

              <textarea
                placeholder="Tell us about your project or needs... *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-violet-500 focus:outline-none transition-all hover:bg-white/10 min-h-[120px]"
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setFormOpen(false)}
                  className="flex-1 px-6 py-3 border border-white/10 rounded-xl font-semibold hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-bold hover:from-violet-500 hover:to-purple-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
                >
                  Send Message ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes atomShine {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
            box-shadow: 0 0 5px rgba(255, 200, 0, 0.5);
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
            box-shadow: 0 0 20px rgba(255, 200, 0, 0.8), 0 0 40px rgba(255, 150, 0, 0.4);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes animate-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-in { animation: animate-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
