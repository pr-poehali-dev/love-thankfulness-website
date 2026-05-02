import { useState } from "react";

const JASMINE_MAIN = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1d6d9784-508d-4d53-953c-07ca79dacea3.jpg";

const PHOTOS = [
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/cfbf9037-33d9-4c56-8732-b5a67649018d.jpg",
    num: "01",
    title: "YOU ARE MY REWARD FROM GOD",
    message: "You are my reward from God. I never deserved something this beautiful, this real — but here you are. Every time I see you, I think: this is not a coincidence. You were sent to me on purpose.",
    color: "#FF0090",
    sym: "★",
    rotate: "-1.5deg",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/7424bdd2-1c30-437f-948c-df106e4da4a7.jpg",
    num: "02",
    title: "YOUR BRIGHT SMILE",
    message: "Your bright smile added so many colors to my life. Before you — everything felt grey. Then you smiled, and suddenly the whole world became vivid, loud, and alive. You are the color in my story.",
    color: "#FFEF00",
    sym: "✦",
    rotate: "1.5deg",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1eb740fd-cf7f-44bf-9c91-0bb470dda0cd.jpg",
    num: "03",
    title: "SO COMFORTABLE WITH YOU",
    message: "With you I feel so comfortable. No masks, no performance — just me, just you, just this. You make everything feel easy and safe. I don't have to pretend when I'm with you. That is the rarest gift.",
    color: "#00F5FF",
    sym: "◆",
    rotate: "-1deg",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/83763e6e-7ff7-4fb7-b511-8821e2dfe5e7.jpg",
    num: "04",
    title: "PARIS — OF COURSE IT'S YOU",
    message: "Even Paris looked at you. The whole city, the whole sky — all of it became a backdrop for you. You belong in every beautiful place on earth. And I am grateful just to exist in the same world as you.",
    color: "#AAFF00",
    sym: "●",
    rotate: "1deg",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c451f1eb-15d1-4961-a4a8-cdd364656e8f.jpg",
    num: "05",
    title: "I TREASURE EVERY MINUTE",
    message: "I treasure every single minute with you. Not hours, not days — minutes. Because every single one matters. Every laugh, every glance, every moment of silence. I want to collect them all, forever.",
    color: "#FF6B00",
    sym: "▲",
    rotate: "-1.5deg",
  },
];

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

        {/* CHAPTER LABEL */}
        <FadeIn className="text-center mb-6">
          <p className="text-xs font-black tracking-[0.6em]"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", textShadow: "0 0 12px #FF0090" }}>
            ★ CHAPTER ONE ★
          </p>
        </FadeIn>

        {/* TITLE */}
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

        {/* HERO PHOTO */}
        <FadeIn delay={200} className="mb-16">
          <div className="relative mx-auto" style={{ maxWidth: 400 }}>
            <div className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "0 0 0 2px #FF0090, 0 0 50px rgba(255,0,144,0.45), 0 0 100px rgba(107,33,168,0.4)",
                transform: "rotate(1.5deg)",
              }} />
            <div className="rounded-2xl overflow-hidden relative" style={{ transform: "rotate(-1.5deg)" }}>
              <img src={JASMINE_MAIN} alt="Princess Jasmine"
                className="w-full object-cover"
                style={{ height: "clamp(340px, 85vw, 520px)", objectPosition: "top" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(transparent 55%, rgba(18,3,32,0.75) 100%)" }} />
              <div className="absolute bottom-5 left-0 right-0 text-center">
                <span className="font-black tracking-widest"
                  style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.5rem", color: "#FFEF00", textShadow: "0 0 15px #FFEF00" }}>
                  JASMINE ★
                </span>
              </div>
            </div>
            <span className="absolute -top-5 -right-5 text-4xl font-black animate-star-spin"
              style={{ color: "#FFEF00", textShadow: "0 0 15px #FFEF00", display: "inline-block" }}>★</span>
            <span className="absolute -bottom-4 -left-5 text-3xl font-black animate-rotate-slow"
              style={{ color: "#00F5FF", textShadow: "0 0 12px #00F5FF", display: "inline-block" }}>✦</span>
          </div>
        </FadeIn>

        {/* PHOTO CARDS */}
        <div className="flex flex-col gap-20">
          {PHOTOS.map((p, i) => (
            <FadeIn key={i} delay={60}>
              <div>
                {/* Header line */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-black text-4xl animate-star-spin"
                    style={{ color: p.color, textShadow: `0 0 15px ${p.color}`, display: "inline-block", fontFamily: "Bebas Neue, sans-serif", animationDelay: `${i * 0.5}s` }}>
                    {p.sym}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                  <span className="text-xs font-black tracking-widest"
                    style={{ color: p.color, fontFamily: "Bebas Neue, sans-serif" }}>
                    PHOTO {p.num}
                  </span>
                </div>

                {/* Photo */}
                <div className="rounded-2xl overflow-hidden mb-6"
                  style={{
                    border: `1.5px solid ${p.color}35`,
                    boxShadow: `0 0 30px ${p.color}18, 0 20px 55px rgba(0,0,0,0.55)`,
                    transform: `rotate(${p.rotate})`,
                  }}>
                  <img src={p.src} alt={p.title}
                    className="w-full object-cover"
                    style={{ height: "clamp(280px, 75vw, 460px)", objectPosition: "top center" }} />
                </div>

                {/* Title */}
                <h2 className="font-black mb-4"
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "clamp(1.7rem, 6vw, 2.6rem)",
                    color: p.color,
                    textShadow: `0 0 20px ${p.color}60`,
                    letterSpacing: "0.03em",
                  }}>
                  {p.title}
                </h2>

                {/* Message */}
                <p className="text-base md:text-lg leading-relaxed text-purple-100"
                  style={{ fontFamily: "sans-serif" }}>
                  {p.message}
                </p>

                {/* Bottom accent */}
                <div className="mt-5 h-px" style={{ background: `linear-gradient(90deg, ${p.color}80, transparent)` }} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* FINAL WISH */}
        <FadeIn delay={150} className="mt-24">
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

        {/* FOOTER */}
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
