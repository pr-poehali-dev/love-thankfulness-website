import { useState } from "react";

const JASMINE_PHOTO = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1d6d9784-508d-4d53-953c-07ca79dacea3.jpg";
const COVER = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c3a349a9-3793-4de9-9bc0-e0f8b8469078.jpg";

interface Particle {
  id: number; left: string; size: number;
  duration: number; delay: number; char: string; color: string;
}

function generateParticles(): Particle[] {
  const chars = ["★", "✦", "◆", "●", "▲", "✿", "♥"];
  const colors = ["#FF0090", "#FFEF00", "#00F5FF", "#AAFF00", "#FF6B00", "#FF1493"];
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 10 + Math.random() * 16,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 14,
    char: chars[Math.floor(Math.random() * chars.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [vis, setVis] = useState(false);
  const ref = (el: HTMLDivElement | null) => {
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
  };
  return (
    <div ref={ref} className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(55px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

export default function Index() {
  const [particles] = useState<Particle[]>(generateParticles);

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 140% 70% at 50% 0%, #7C3AED 0%, #4C1D95 35%, #2D0A4E 65%, #120320 100%)" }}>

      {/* BG orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="animate-orb-float absolute top-10 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #FF0090, transparent)", filter: "blur(100px)", opacity: 0.18 }} />
        <div className="animate-orb-float absolute top-1/2 -right-20 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, #FFEF00, transparent)", filter: "blur(90px)", opacity: 0.1, animationDelay: "4s" }} />
        <div className="animate-orb-float absolute bottom-20 left-1/3 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, #00F5FF, transparent)", filter: "blur(90px)", opacity: 0.08, animationDelay: "7s" }} />
      </div>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => (
          <span key={p.id} className="floating-particle select-none font-black absolute bottom-0"
            style={{
              left: p.left, fontSize: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              color: p.color,
              textShadow: `0 0 10px ${p.color}`,
            }}>
            {p.char}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-5 pt-16 pb-20">

        {/* ── CHAPTER LABEL ── */}
        <FadeIn className="text-center mb-6">
          <p className="text-xs font-black tracking-[0.6em]"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", textShadow: "0 0 12px #FF0090" }}>
            ★ CHAPTER ONE ★
          </p>
        </FadeIn>

        {/* ── TITLE ── */}
        <FadeIn delay={100} className="text-center mb-10">
          <h1 className="font-black leading-none gradient-magenta"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 13vw, 6.5rem)", letterSpacing: "0.03em" }}>
            FOR THE MOST<br />BEAUTIFUL<br />PRINCESS
          </h1>
          <p className="mt-3 font-black tracking-[0.35em] gradient-cyber"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.1rem, 4vw, 1.6rem)" }}>
            PRINCESS JASMINE
          </p>
        </FadeIn>

        {/* ── HER PHOTO ── */}
        <FadeIn delay={200} className="mb-14">
          <div className="relative mx-auto" style={{ maxWidth: 380 }}>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "0 0 0 2px #FF0090, 0 0 50px rgba(255,0,144,0.45), 0 0 100px rgba(107,33,168,0.4)",
                transform: "rotate(1.5deg)",
              }} />
            <div className="rounded-2xl overflow-hidden relative" style={{ transform: "rotate(-1.5deg)" }}>
              <img src={JASMINE_PHOTO} alt="Princess Jasmine"
                className="w-full object-cover"
                style={{ height: "clamp(320px, 80vw, 500px)", objectPosition: "top" }} />
              {/* subtle gradient overlay bottom */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(transparent 60%, rgba(18,3,32,0.7) 100%)" }} />
              <div className="absolute bottom-5 left-0 right-0 text-center">
                <span className="font-black tracking-widest"
                  style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.4rem", color: "#FFEF00", textShadow: "0 0 15px #FFEF00" }}>
                  JASMINE ★
                </span>
              </div>
            </div>

            {/* Corner stars */}
            <span className="absolute -top-5 -right-5 text-4xl font-black animate-star-spin"
              style={{ color: "#FFEF00", textShadow: "0 0 15px #FFEF00", display: "inline-block" }}>★</span>
            <span className="absolute -bottom-4 -left-5 text-3xl font-black animate-rotate-slow"
              style={{ color: "#00F5FF", textShadow: "0 0 12px #00F5FF", display: "inline-block" }}>✦</span>
          </div>
        </FadeIn>

        {/* ── OPENING MESSAGE ── */}
        <FadeIn delay={100} className="mb-16">
          <div className="rounded-2xl p-7 md:p-10"
            style={{
              background: "rgba(45,10,78,0.6)",
              border: "1.5px solid rgba(255,0,144,0.3)",
              boxShadow: "0 0 40px rgba(255,0,144,0.08)",
            }}>
            <p className="text-xs font-black tracking-[0.5em] mb-5"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090" }}>
              ★ A MESSAGE FOR YOU ★
            </p>
            <h2 className="font-black gradient-cyan mb-5"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem, 6vw, 2.8rem)", letterSpacing: "0.03em" }}>
              YOU ARE MY UNIVERSE
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-purple-100" style={{ fontFamily: "sans-serif" }}>
              Jasmine, from the very first moment I saw you — I knew.
              The way you look at the world, the way your eyes light up,
              the way you exist in a room and make it brighter just by being there —
              it's something I've never seen before and will never stop being amazed by.
            </p>
          </div>
        </FadeIn>

        {/* ── PHOTO + CAPTION BLOCKS ── */}

        {/* Block 1 */}
        <FadeIn delay={80} className="mb-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-black text-4xl animate-star-spin"
              style={{ color: "#FF0090", textShadow: "0 0 15px #FF0090", display: "inline-block", fontFamily: "Bebas Neue, sans-serif" }}>★</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #FF0090, transparent)" }} />
            <span className="text-xs font-black tracking-widest"
              style={{ color: "#FF0090", fontFamily: "Bebas Neue, sans-serif" }}>PHOTO 01</span>
          </div>
          <div className="rounded-xl overflow-hidden mb-5"
            style={{
              border: "1.5px solid rgba(255,0,144,0.25)",
              boxShadow: "0 0 30px rgba(255,0,144,0.15), 0 20px 50px rgba(0,0,0,0.5)",
              transform: "rotate(-1deg)",
            }}>
            <img src={JASMINE_PHOTO} alt="" className="w-full object-cover"
              style={{ height: "clamp(200px, 55vw, 320px)", objectPosition: "center 20%" }} />
          </div>
          <h3 className="font-black gradient-magenta mb-3"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}>
            THE FIRST LOOK
          </h3>
          <p className="text-base leading-relaxed text-purple-200" style={{ fontFamily: "sans-serif" }}>
            I remember looking at you and thinking —
            how is someone this real? This photo captures exactly
            what I see every time I look at you: quiet confidence,
            effortless beauty, and something that pulls me in
            like gravity. You don't even try. You just are.
          </p>
        </FadeIn>

        {/* Block 2 */}
        <FadeIn delay={80} className="mb-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-black text-4xl animate-star-spin"
              style={{ color: "#FFEF00", textShadow: "0 0 15px #FFEF00", display: "inline-block", fontFamily: "Bebas Neue, sans-serif", animationDelay: "0.5s" }}>✦</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #FFEF00, transparent)" }} />
            <span className="text-xs font-black tracking-widest"
              style={{ color: "#FFEF00", fontFamily: "Bebas Neue, sans-serif" }}>PHOTO 02</span>
          </div>
          <div className="rounded-xl overflow-hidden mb-5"
            style={{
              border: "1.5px solid rgba(255,239,0,0.25)",
              boxShadow: "0 0 30px rgba(255,239,0,0.12), 0 20px 50px rgba(0,0,0,0.5)",
              transform: "rotate(1deg)",
            }}>
            <img src={COVER} alt="" className="w-full object-cover"
              style={{ height: "clamp(200px, 55vw, 320px)", objectPosition: "center" }} />
          </div>
          <h3 className="font-black gradient-cyber mb-3"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}>
            OUR WORLD
          </h3>
          <p className="text-base leading-relaxed text-purple-200" style={{ fontFamily: "sans-serif" }}>
            This is where we are — somewhere between a dream
            and something real. A world that only exists
            when we're together. Loud and colorful and wild,
            just like you make everything feel.
            You turned my ordinary days into something extraordinary.
          </p>
        </FadeIn>

        {/* ── FINAL WISH ── */}
        <FadeIn delay={150}>
          <div className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            style={{
              background: "rgba(45,10,78,0.7)",
              border: "1.5px solid rgba(255,0,144,0.4)",
              boxShadow: "0 0 60px rgba(255,0,144,0.15)",
            }}>
            <span className="absolute top-4 right-5 text-5xl font-black opacity-15 animate-star-spin"
              style={{ color: "#FFEF00", display: "inline-block" }}>★</span>
            <span className="absolute bottom-4 left-5 text-4xl font-black opacity-10 animate-rotate-slow"
              style={{ color: "#00F5FF", display: "inline-block" }}>✦</span>

            <div className="relative z-10 space-y-6">
              <p className="font-black text-xs tracking-[0.5em]"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", textShadow: "0 0 10px #FF0090" }}>
                ★ MY WISH FOR YOU ★
              </p>
              <h3 className="font-black leading-tight gradient-magenta"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 7vw, 3.2rem)" }}>
                I WISH YOU KNEW<br />HOW RARE YOU ARE
              </h3>
              <div className="w-20 h-0.5 mx-auto"
                style={{ background: "linear-gradient(90deg, #FF0090, #FFEF00)" }} />
              <p className="text-base md:text-lg leading-relaxed text-purple-100 max-w-sm mx-auto"
                style={{ fontFamily: "sans-serif" }}>
                I wish you saw yourself the way I see you —
                the most beautiful, the most captivating,
                the most real person in any room.
                This is only Chapter One.
                There are infinite chapters left to write — with you.
              </p>
              <p className="font-black gradient-cyber text-lg tracking-widest pt-2"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                — ALWAYS YOURS ★
              </p>
            </div>
          </div>
        </FadeIn>

        {/* footer */}
        <div className="text-center mt-12">
          <p className="font-black gradient-magenta text-xl tracking-widest"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            FOR PRINCESS JASMINE ★
          </p>
          <p className="text-purple-600 text-xs mt-1 tracking-widest"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            CHAPTER ONE · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
