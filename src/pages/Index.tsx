import { useState } from "react";

const JASMINE_MAIN = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1d6d9784-508d-4d53-953c-07ca79dacea3.jpg";
const BEAR1 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/f2fa34c0-f7ad-4a34-bccf-29975f3120eb.jpg";
const BEAR2 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/70943a51-457a-4598-a2c9-8d0595b18f76.jpg";

const PHOTOS = [
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/cfbf9037-33d9-4c56-8732-b5a67649018d.jpg",
    num: "01",
    title: "WALLS OF THE LOUVRE",
    message: "Every photo of you belongs on the walls of the Louvre. Not as decoration — as the main exhibit. Your beauty should be written by poets, studied by scientists, and published by the greatest magazines in the world. You are not just beautiful. You are art.",
    color: "#FF0090",
    sym: "★",
    rotate: "-1.5deg",
    bear: BEAR1,
    bearPos: "right",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/7424bdd2-1c30-437f-948c-df106e4da4a7.jpg",
    num: "02",
    title: "PARIS IS WAITING FOR US",
    message: "I truly hope and believe that one day we will go to Paris together and fulfill our shared dreams. Walking the same streets, seeing the same sky — but this time, together. That day will come. I'm certain.",
    color: "#FFEF00",
    sym: "✦",
    rotate: "1.5deg",
    bear: BEAR2,
    bearPos: "left",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/1eb740fd-cf7f-44bf-9c91-0bb470dda0cd.jpg",
    num: "03",
    title: "THE WHOLE WORLD TOGETHER",
    message: "After Paris — the whole world. We will travel everywhere, discover everything. A million photos together. A million moments of happiness that belong only to us. Our own story, written by us.",
    color: "#00F5FF",
    sym: "◆",
    rotate: "-1deg",
    bear: BEAR1,
    bearPos: "right",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/83763e6e-7ff7-4fb7-b511-8821e2dfe5e7.jpg",
    num: "04",
    title: "I WILL PROTECT YOU",
    message: "As long as you are near — I will protect you and take care of you with everything I have. You will never have to face anything alone. I will be your shield, your warmth, your safe place.",
    color: "#AAFF00",
    sym: "●",
    rotate: "1deg",
    bear: BEAR2,
    bearPos: "left",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c451f1eb-15d1-4961-a4a8-cdd364656e8f.jpg",
    num: "05",
    title: "A MILLION MOMENTS OF HAPPINESS",
    message: "We will create a million moments of happiness together. Each one ours. Each one real. I treasure every single minute with you — and I intend to keep collecting them, forever.",
    color: "#FF6B00",
    sym: "▲",
    rotate: "-1.5deg",
    bear: BEAR1,
    bearPos: "right",
  },
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

      {/* Fixed background bear — subtle, large, centered */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <img src={BEAR1} alt=""
          className="animate-orb-float select-none"
          style={{
            width: "min(600px, 90vw)",
            opacity: 0.04,
            filter: "blur(2px) saturate(2)",
            animationDuration: "12s",
          }} />
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
        <div className="flex flex-col gap-24">
          {PHOTOS.map((p, i) => (
            <FadeIn key={i} delay={60}>
              <div className="relative">

                {/* Bear decoration beside photo */}
                <div className={`absolute ${p.bearPos === "right" ? "-right-8 md:-right-16" : "-left-8 md:-left-16"} top-0 pointer-events-none`}
                  style={{ zIndex: 0 }}>
                  <img src={p.bear} alt=""
                    className="animate-float-bob select-none"
                    style={{
                      width: "clamp(70px, 18vw, 110px)",
                      opacity: 0.55,
                      filter: `drop-shadow(0 0 12px ${p.color}80)`,
                      animationDelay: `${i * 0.7}s`,
                      transform: p.bearPos === "left" ? "scaleX(-1)" : "none",
                    }} />
                </div>

                {/* Header line */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
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
                <div className="rounded-2xl overflow-hidden mb-6 relative z-10"
                  style={{
                    border: `1.5px solid ${p.color}35`,
                    boxShadow: `0 0 30px ${p.color}18, 0 20px 55px rgba(0,0,0,0.55)`,
                    transform: `rotate(${p.rotate})`,
                  }}>
                  <img src={p.src} alt={p.title}
                    className="w-full object-cover"
                    style={{ height: "clamp(300px, 78vw, 480px)", objectPosition: "top center" }} />
                  {/* Louvre label */}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-black tracking-widest px-2 py-1 rounded"
                      style={{
                        fontFamily: "Bebas Neue, sans-serif",
                        background: "rgba(18,3,32,0.75)",
                        color: p.color,
                        border: `1px solid ${p.color}50`,
                        textShadow: `0 0 8px ${p.color}`,
                      }}>
                      LOUVRE · WALL {p.num}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-black mb-4 relative z-10"
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
                <p className="text-base md:text-lg leading-relaxed text-purple-100 relative z-10"
                  style={{ fontFamily: "sans-serif" }}>
                  {p.message}
                </p>

                <div className="mt-5 h-px relative z-10" style={{ background: `linear-gradient(90deg, ${p.color}80, transparent)` }} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* FINAL WISH */}
        <FadeIn delay={150} className="mt-24">
          <div className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            style={{
              background: "rgba(45,10,78,0.75)",
              border: "1.5px solid rgba(255,0,144,0.45)",
              boxShadow: "0 0 70px rgba(255,0,144,0.18)",
            }}>

            {/* Bear inside final card */}
            <div className="absolute -bottom-4 -right-4 pointer-events-none">
              <img src={BEAR2} alt=""
                className="animate-float-bob select-none"
                style={{ width: 100, opacity: 0.3, filter: "drop-shadow(0 0 15px #FF0090)" }} />
            </div>
            <div className="absolute -top-4 -left-4 pointer-events-none">
              <img src={BEAR1} alt=""
                className="animate-float-bob select-none"
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
                I will take care of you and pray that everything in your life is good and beautiful.
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
