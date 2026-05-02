import { useState } from "react";

const JASMINE_MAIN = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1d6d9784-508d-4d53-953c-07ca79dacea3.jpg";
const BEAR1 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/f2fa34c0-f7ad-4a34-bccf-29975f3120eb.jpg";
const BEAR2 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/70943a51-457a-4598-a2c9-8d0595b18f76.jpg";

const PHOTOS = [
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/cd098640-7a52-4ffd-abf8-2cda4d97ec04.jpg",
    num: "01",
    title: "YOU ARE MY REWARD FROM GOD",
    message: "You are my reward from God. I never asked for something this perfect — but here you are. You were sent to me with purpose. Every day I see you, I feel it. You are not a coincidence. You are a gift.",
    color: "#FF0090",
    sym: "★",
    rotate: "-1.5deg",
    bear: BEAR1,
    bearPos: "right",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/bf9dce8b-4f75-43c8-83df-5a5517bc720d.jpg",
    num: "02",
    title: "YOUR SMILE FILLS MY WORLD WITH COLOR",
    message: "Your bright smile added rainbow colors to my life. Before you — everything was ordinary. Then you smiled, and suddenly the whole world became vivid, loud, and alive. You are the color in my story.",
    color: "#FFEF00",
    sym: "✦",
    rotate: "1.5deg",
    bear: BEAR2,
    bearPos: "left",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/bcb77a92-94d9-4309-ba23-2ed6d5f46dd4.jpg",
    num: "03",
    title: "SO COMFORTABLE WITH YOU",
    message: "With you I feel so comfortable. No masks, no pretending — just me, just you, just this. You make everything feel easy and safe. I don't have to perform when I'm with you. That is the rarest gift.",
    color: "#00F5FF",
    sym: "◆",
    rotate: "-1deg",
    bear: BEAR1,
    bearPos: "right",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/f54f743d-691c-44f1-9684-c46cca9c1886.jpg",
    num: "04",
    title: "I TREASURE EVERY MINUTE WITH YOU",
    message: "I treasure every single minute with you. Not hours, not days — every minute. Because each one matters. Every laugh, every glance, every quiet second. I want to collect them all, forever.",
    color: "#AAFF00",
    sym: "●",
    rotate: "1deg",
    bear: BEAR2,
    bearPos: "left",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/2daa72e9-4efe-4227-8de5-d152a26275d6.jpg",
    num: "05",
    title: "WALLS OF THE LOUVRE",
    message: "Every photo of you belongs on the walls of the Louvre. Your beauty should be written by poets, studied by scientists, and published by the greatest magazines in the world. You are not just beautiful. You are art.",
    color: "#FF6B00",
    sym: "▲",
    rotate: "-1.5deg",
    bear: BEAR1,
    bearPos: "right",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/cd098640-7a52-4ffd-abf8-2cda4d97ec04.jpg",
    num: "06",
    title: "PARIS IS WAITING FOR US",
    message: "I truly hope and believe that one day we will go to Paris together — and fulfill our shared dreams. After Paris, the whole world. A million photos together. A million moments of happiness that belong only to us.",
    color: "#FF1493",
    sym: "✿",
    rotate: "1.5deg",
    bear: BEAR2,
    bearPos: "left",
  },
];

// Photos from the new batch
const NEW_PHOTOS = [
  "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/cd098640-7a52-4ffd-abf8-2cda4d97ec04.jpg",
  "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/bf9dce8b-4f75-43c8-83df-5a5517bc720d.jpg",
  "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/bcb77a92-94d9-4309-ba23-2ed6d5f46dd4.jpg",
  "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/f54f743d-691c-44f1-9684-c46cca9c1886.jpg",
  "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/2daa72e9-4efe-4227-8de5-d152a26275d6.jpg",
];

const MESSAGES = [
  "You are my reward from God.",
  "Your bright smile fills my world with colors.",
  "With you I feel so comfortable.",
  "I treasure every minute with you.",
  "Every photo of you belongs on the walls of the Louvre.",
  "Paris is waiting for us. The whole world is waiting.",
];

interface Particle {
  id: number; left: string; size: number;
  duration: number; delay: number; char: string; color: string;
}

function generateParticles(): Particle[] {
  const chars = ["★", "✦", "◆", "●", "▲", "✿", "♥"];
  const colors = ["#FF0090", "#FFEF00", "#00F5FF", "#AAFF00", "#FF6B00", "#FF1493"];
  return Array.from({ length: 22 }, (_, i) => ({
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
      { threshold: 0.07 }
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

const COLORS = ["#FF0090", "#FFEF00", "#00F5FF", "#AAFF00", "#FF6B00", "#FF1493"];
const SYMS = ["★", "✦", "◆", "●", "▲", "✿"];

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

      {/* Fixed background bear */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <img src={BEAR1} alt="" className="animate-orb-float select-none"
          style={{ width: "min(600px, 90vw)", opacity: 0.04, filter: "blur(2px) saturate(2)", animationDuration: "12s" }} />
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
              <img src={JASMINE_MAIN} alt="Princess Jasmine" className="w-full object-cover"
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
        <div className="flex flex-col gap-24">
          {NEW_PHOTOS.map((src, i) => {
            const color = COLORS[i % COLORS.length];
            const sym = SYMS[i % SYMS.length];
            const bear = i % 2 === 0 ? BEAR1 : BEAR2;
            const bearPos = i % 2 === 0 ? "right" : "left";
            const rotate = i % 2 === 0 ? "-1.5deg" : "1.5deg";
            return (
              <FadeIn key={i} delay={60}>
                <div className="relative">

                  {/* Bear beside photo */}
                  <div className={`absolute ${bearPos === "right" ? "-right-6 md:-right-14" : "-left-6 md:-left-14"} top-8 pointer-events-none`}
                    style={{ zIndex: 0 }}>
                    <img src={bear} alt="" className="animate-float-bob select-none"
                      style={{
                        width: "clamp(65px, 16vw, 105px)",
                        opacity: 0.6,
                        filter: `drop-shadow(0 0 14px ${color}90)`,
                        animationDelay: `${i * 0.7}s`,
                        transform: bearPos === "left" ? "scaleX(-1)" : "none",
                      }} />
                  </div>

                  {/* Header line */}
                  <div className="flex items-center gap-3 mb-5 relative z-10">
                    <span className="font-black text-4xl animate-star-spin"
                      style={{ color, textShadow: `0 0 15px ${color}`, display: "inline-block", fontFamily: "Bebas Neue, sans-serif", animationDelay: `${i * 0.5}s` }}>
                      {sym}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                    <span className="text-xs font-black tracking-widest"
                      style={{ color, fontFamily: "Bebas Neue, sans-serif" }}>
                      PHOTO 0{i + 1}
                    </span>
                  </div>

                  {/* Photo */}
                  <div className="rounded-2xl overflow-hidden mb-6 relative z-10"
                    style={{
                      border: `1.5px solid ${color}35`,
                      boxShadow: `0 0 30px ${color}18, 0 20px 55px rgba(0,0,0,0.55)`,
                      transform: `rotate(${rotate})`,
                    }}>
                    <img src={src} alt={`Photo ${i + 1}`} className="w-full object-cover"
                      style={{ height: "clamp(300px, 78vw, 460px)", objectPosition: "top center" }} />
                    {/* Louvre badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-black tracking-wider px-2 py-1 rounded"
                        style={{
                          fontFamily: "Bebas Neue, sans-serif",
                          background: "rgba(18,3,32,0.8)",
                          color,
                          border: `1px solid ${color}50`,
                          textShadow: `0 0 8px ${color}`,
                        }}>
                        LOUVRE · WALL 0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-black mb-3 relative z-10"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "clamp(1.6rem, 5.5vw, 2.4rem)",
                      color,
                      textShadow: `0 0 20px ${color}55`,
                      letterSpacing: "0.03em",
                    }}>
                    {["YOU ARE MY REWARD FROM GOD", "YOUR SMILE FILLS MY WORLD WITH COLOR", "SO COMFORTABLE WITH YOU", "I TREASURE EVERY MINUTE WITH YOU", "WALLS OF THE LOUVRE"][i]}
                  </h2>

                  {/* Message */}
                  <p className="text-base md:text-lg leading-relaxed text-purple-100 relative z-10"
                    style={{ fontFamily: "sans-serif" }}>
                    {MESSAGES[i]}
                  </p>

                  <div className="mt-5 h-px relative z-10"
                    style={{ background: `linear-gradient(90deg, ${color}80, transparent)` }} />
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* LOUVRE SPECIAL — Jasmine at the Louvre */}
        <FadeIn delay={80} className="mt-24">
          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-black text-4xl animate-star-spin"
                style={{ color: "#FFD700", textShadow: "0 0 20px #FFD700", display: "inline-block", fontFamily: "Bebas Neue, sans-serif" }}>★</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #FFD700, transparent)" }} />
              <span className="text-xs font-black tracking-widest"
                style={{ color: "#FFD700", fontFamily: "Bebas Neue, sans-serif" }}>THE LOUVRE · PARIS</span>
            </div>

            {/* Bear right */}
            <div className="absolute -right-6 md:-right-14 top-8 pointer-events-none z-0">
              <img src={BEAR2} alt="" className="animate-float-bob select-none"
                style={{ width: "clamp(65px, 16vw, 105px)", opacity: 0.6, filter: "drop-shadow(0 0 14px #FFD70090)" }} />
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 relative z-10"
              style={{
                border: "1.5px solid rgba(255,215,0,0.4)",
                boxShadow: "0 0 40px rgba(255,215,0,0.25), 0 20px 55px rgba(0,0,0,0.6)",
                transform: "rotate(-1deg)",
              }}>
              <img src="https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/cd098640-7a52-4ffd-abf8-2cda4d97ec04.jpg"
                alt="Jasmine at the Louvre" className="w-full object-cover"
                style={{ height: "clamp(300px, 78vw, 480px)", objectPosition: "top center" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(transparent 50%, rgba(18,3,32,0.8) 100%)" }} />
              <div className="absolute bottom-5 left-5">
                <span className="font-black"
                  style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.1rem", color: "#FFD700", textShadow: "0 0 12px #FFD700" }}>
                  SHE ALREADY BELONGS HERE ★
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-xs font-black tracking-wider px-2 py-1 rounded"
                  style={{ fontFamily: "Bebas Neue, sans-serif", background: "rgba(18,3,32,0.8)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.5)" }}>
                  LOUVRE · PARIS ★
                </span>
              </div>
            </div>

            <h2 className="font-black mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.6rem, 5.5vw, 2.4rem)", color: "#FFD700", textShadow: "0 0 20px rgba(255,215,0,0.5)", letterSpacing: "0.03em" }}>
              SHE'S ALREADY IN THE LOUVRE
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-purple-100" style={{ fontFamily: "sans-serif" }}>
              Look at her — standing in one of the greatest museums in the world,
              and somehow she is still the most breathtaking thing in the room.
              The Louvre was built for art. And she is the finest art that ever walked through its doors.
            </p>
            <div className="mt-5 h-px" style={{ background: "linear-gradient(90deg, rgba(255,215,0,0.8), transparent)" }} />
          </div>
        </FadeIn>

        {/* ===== CHAPTER TWO ===== */}
        <FadeIn className="mt-24 mb-16 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #FF0090)" }} />
            <p className="font-black text-xs tracking-[0.6em]"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", textShadow: "0 0 12px #FF0090" }}>
              ★ CHAPTER TWO ★
            </p>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #FF0090, transparent)" }} />
          </div>
          <h2 className="font-black leading-none mt-3 gradient-cyber"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 10vw, 5rem)", letterSpacing: "0.03em" }}>
            YOU ARE MY JOY
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-24">
          {[
            {
              src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c2e8795f-3375-4b15-822b-667a67f62e4f.jpg",
              title: "I LOVE WHEN YOU SMILE",
              message: "I love when you smile and feel happy. That moment — when your face lights up and your joy just radiates — it's the most beautiful thing I have ever seen. Keep smiling. Always.",
              color: "#FF0090",
              sym: "★",
              bear: BEAR1,
              bearPos: "right",
              rotate: "-1.5deg",
            },
            {
              src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/acca2934-eab5-43f7-8ea4-020d612180a7.jpg",
              title: "YOUR ENERGY INSPIRES ME",
              message: "Your energy and your laughter inspire me even more than you know. When you are around, everything feels possible. You push me to be better just by being yourself.",
              color: "#FFEF00",
              sym: "✦",
              bear: BEAR2,
              bearPos: "left",
              rotate: "1.5deg",
            },
            {
              src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/ed7e6ef0-716d-4f0d-9ab1-37a467e9932f.jpg",
              title: "YOU ARE SO BRILLIANT",
              message: "You are so cool, so smart, so hardworking. You have an incredibly high emotional intelligence — you see people, you understand them, you make them feel heard. That is a superpower.",
              color: "#00F5FF",
              sym: "◆",
              bear: BEAR1,
              bearPos: "right",
              rotate: "-1deg",
            },
            {
              src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1ffc5336-7fd2-4337-8445-eda8e38eb613.jpg",
              title: "YOU ARE MY SWEETNESS",
              message: "You are my joy. You are my sweetness. There is no better way to say it — you are the thing that makes every ordinary day feel like something worth living. You are everything.",
              color: "#AAFF00",
              sym: "●",
              bear: BEAR2,
              bearPos: "left",
              rotate: "1deg",
            },
            {
              src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c4c5455c-9ed0-417e-ae26-674ff12eb9f1.jpg",
              title: "PARIS KNEW YOUR NAME",
              message: "Even Paris recognized you. That smile in front of the Eiffel Tower — it outshone the whole city. One day we will go back there together, and this time we will create our own story.",
              color: "#FF6B00",
              sym: "▲",
              bear: BEAR1,
              bearPos: "right",
              rotate: "-1.5deg",
            },
          ].map((p, i) => (
            <FadeIn key={`ch2-${i}`} delay={60}>
              <div className="relative">
                <div className={`absolute ${p.bearPos === "right" ? "-right-6 md:-right-14" : "-left-6 md:-left-14"} top-8 pointer-events-none`}
                  style={{ zIndex: 0 }}>
                  <img src={p.bear} alt="" className="animate-float-bob select-none"
                    style={{
                      width: "clamp(65px, 16vw, 105px)",
                      opacity: 0.6,
                      filter: `drop-shadow(0 0 14px ${p.color}90)`,
                      animationDelay: `${i * 0.7}s`,
                      transform: p.bearPos === "left" ? "scaleX(-1)" : "none",
                    }} />
                </div>

                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <span className="font-black text-4xl animate-star-spin"
                    style={{ color: p.color, textShadow: `0 0 15px ${p.color}`, display: "inline-block", fontFamily: "Bebas Neue, sans-serif", animationDelay: `${i * 0.5}s` }}>
                    {p.sym}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
                  <span className="text-xs font-black tracking-widest"
                    style={{ color: p.color, fontFamily: "Bebas Neue, sans-serif" }}>
                    PHOTO 0{i + 1}
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden mb-6 relative z-10"
                  style={{
                    border: `1.5px solid ${p.color}35`,
                    boxShadow: `0 0 30px ${p.color}18, 0 20px 55px rgba(0,0,0,0.55)`,
                    transform: `rotate(${p.rotate})`,
                  }}>
                  <img src={p.src} alt={p.title} className="w-full object-cover"
                    style={{ height: "clamp(300px, 78vw, 460px)", objectPosition: "top center" }} />
                </div>

                <h2 className="font-black mb-3 relative z-10"
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "clamp(1.6rem, 5.5vw, 2.4rem)",
                    color: p.color,
                    textShadow: `0 0 20px ${p.color}55`,
                    letterSpacing: "0.03em",
                  }}>
                  {p.title}
                </h2>

                <p className="text-base md:text-lg leading-relaxed text-purple-100 relative z-10"
                  style={{ fontFamily: "sans-serif" }}>
                  {p.message}
                </p>

                <div className="mt-5 h-px relative z-10"
                  style={{ background: `linear-gradient(90deg, ${p.color}80, transparent)` }} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* PARIS DREAM */}
        <FadeIn delay={80} className="mt-20">
          <div className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: "rgba(45,10,78,0.55)",
              border: "1.5px solid rgba(255,0,144,0.3)",
            }}>
            <div className="absolute -right-3 -bottom-3 pointer-events-none">
              <img src={BEAR1} alt="" className="animate-float-bob select-none"
                style={{ width: 80, opacity: 0.25, filter: "drop-shadow(0 0 10px #FF0090)", animationDelay: "1s" }} />
            </div>
            <p className="font-black text-xs tracking-[0.5em] mb-4"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090" }}>
              ★ OUR DREAM ★
            </p>
            <h3 className="font-black gradient-magenta mb-4"
              style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem, 6vw, 2.8rem)" }}>
              PARIS · THE WORLD · US
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-purple-100 relative z-10" style={{ fontFamily: "sans-serif" }}>
              I truly believe that one day we will go to Paris together and fulfil our shared dreams.
              After Paris — the whole world. We will travel everywhere, see everything.
              A million photos together. A million moments of happiness that belong only to us.
              As long as you are near — I will protect you and take care of you with everything I have.
            </p>
          </div>
        </FadeIn>

        {/* FINAL WISH */}
        <FadeIn delay={150} className="mt-16">
          <div className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            style={{
              background: "rgba(45,10,78,0.75)",
              border: "1.5px solid rgba(255,0,144,0.45)",
              boxShadow: "0 0 70px rgba(255,0,144,0.18)",
            }}>

            <div className="absolute -bottom-4 -right-4 pointer-events-none">
              <img src={BEAR2} alt="" className="animate-float-bob select-none"
                style={{ width: 100, opacity: 0.3, filter: "drop-shadow(0 0 15px #FF0090)" }} />
            </div>
            <div className="absolute -top-4 -left-4 pointer-events-none">
              <img src={BEAR1} alt="" className="animate-float-bob select-none"
                style={{ width: 80, opacity: 0.25, filter: "drop-shadow(0 0 12px #FFEF00)", animationDelay: "1.5s", transform: "scaleX(-1)" }} />
            </div>

            <span className="absolute top-5 right-8 text-5xl font-black opacity-15 animate-star-spin"
              style={{ color: "#FFEF00", display: "inline-block" }}>★</span>

            <div className="relative z-10 space-y-6">
              <p className="font-black text-xs tracking-[0.5em]"
                style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", textShadow: "0 0 10px #FF0090" }}>
                ★ MY WISH FOR YOU ★
              </p>
              <h3 className="font-black leading-tight gradient-magenta"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 7vw, 3rem)" }}>
                MY DEAR JASMINE
              </h3>
              <div className="w-20 h-0.5 mx-auto"
                style={{ background: "linear-gradient(90deg, #FF0090, #FFEF00)" }} />
              <p className="text-base md:text-lg leading-relaxed text-purple-100 max-w-md mx-auto"
                style={{ fontFamily: "sans-serif" }}>
                Ahead of us are bright days and important events in both of our life paths.
                I just want you to know — I will be there.
                I will take care of you and pray that everything in your life
                is good, beautiful, and exactly as you deserve.
                Always.
              </p>
              <p className="font-black gradient-cyber text-xl tracking-widest pt-2"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                — ALWAYS YOURS ★
              </p>
            </div>
          </div>
        </FadeIn>

        {/* FOOTER */}
        <div className="text-center mt-14">
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