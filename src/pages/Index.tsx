import { useRef, useState } from "react";

const COVER = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c3a349a9-3793-4de9-9bc0-e0f8b8469078.jpg";

const PHOTOS = [
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/1b89b0e9-90b9-4bff-bc4a-0785bf53d302.jpg",
    date: "14 февраля 2024",
    title: "Наш первый вечер",
    desc: "Помню каждую секунду этого вечера. Ты была в том платье, а я не мог отвести глаз. Это был момент, когда я понял — ты особенная.",
    color: "#FF0090",
    sym: "★",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/bbb8fd95-d5bb-4c00-ae8d-86881ba2fe45.jpg",
    date: "Весна 2024",
    title: "Прогулка в парке",
    desc: "Мы шли и смеялись над какой-то глупостью. Деревья цвели, и ты говорила что-то важное, а я просто смотрел на тебя и думал — вот оно, счастье.",
    color: "#FFEF00",
    sym: "✦",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/c48d8aff-5c53-452b-a740-e34bdc5c273e.jpg",
    date: "Лето 2024",
    title: "Под звёздами",
    desc: "Мы лежали и считали звёзды. Ты уснула на полуслове. Я не спал ещё час — просто смотрел на тебя и не хотел, чтобы этот момент заканчивался.",
    color: "#00F5FF",
    sym: "◆",
  },
  {
    src: "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/be43fad9-51b0-4d71-aa26-37b06c875789.jpg",
    date: "Осень 2024",
    title: "Просто вместе",
    desc: "Эта фотка ничем не примечательна внешне. Но я помню — мы только что поспорили, потом помирились, и ты засмеялась. Именно такими я хочу помнить нас.",
    color: "#AAFF00",
    sym: "●",
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
    size: 10 + Math.random() * 18,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 14,
    char: chars[Math.floor(Math.random() * chars.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  const observed = useRef(false);
  if (typeof window !== "undefined" && ref.current && !observed.current) {
    observed.current = true;
  }
  useState(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  });
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useState(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    const el = ref.current;
    obs.observe(el);
    return () => obs.disconnect();
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
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
        <div className="animate-orb-float absolute top-10 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #FF0090, transparent)", filter: "blur(100px)", opacity: 0.15 }} />
        <div className="animate-orb-float absolute top-1/3 right-0 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, #FFEF00, transparent)", filter: "blur(90px)", opacity: 0.1, animationDelay: "4s" }} />
        <div className="animate-orb-float absolute bottom-20 left-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, #00F5FF, transparent)", filter: "blur(90px)", opacity: 0.08, animationDelay: "7s" }} />
      </div>

      {/* Floating particles */}
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

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-16">

        {/* HERO */}
        <FadeIn className="text-center mb-20">
          <div className="relative inline-block mb-8 animate-float-bob">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden mx-auto"
              style={{
                boxShadow: "0 0 0 3px #FF0090, 0 0 40px rgba(255,0,144,0.45), 0 0 80px rgba(107,33,168,0.5)",
                transform: "rotate(-2deg)",
              }}>
              <img src={COVER} alt="cover" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-5 -right-5 text-4xl font-black animate-star-spin"
              style={{ color: "#FFEF00", textShadow: "0 0 15px #FFEF00", display: "inline-block" }}>★</span>
            <span className="absolute -bottom-4 -left-5 text-3xl font-black animate-rotate-slow"
              style={{ color: "#00F5FF", textShadow: "0 0 12px #00F5FF", display: "inline-block" }}>✦</span>
          </div>

          <p className="text-xs font-black tracking-[0.5em] mb-2"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", textShadow: "0 0 12px #FF0090" }}>
            ★ ДЛЯ ТЕБЯ ★
          </p>
          <h1 className="font-black leading-none mb-4 gradient-magenta"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3.5rem, 14vw, 7rem)", letterSpacing: "0.04em" }}>
            НАША ИСТОРИЯ
          </h1>
          <p className="text-purple-300 tracking-widest text-sm"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            КАЖДЫЙ СНИМОК — ЭТО МЫ
          </p>
        </FadeIn>

        {/* PHOTO CARDS */}
        <div className="flex flex-col gap-20">
          {PHOTOS.map((photo, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="relative">

                {/* Number */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-black text-5xl animate-star-spin"
                    style={{ color: photo.color, textShadow: `0 0 18px ${photo.color}`, display: "inline-block", fontFamily: "Bebas Neue, sans-serif" }}>
                    {photo.sym}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${photo.color}, transparent)` }} />
                  <span className="text-xs font-black tracking-widest"
                    style={{ color: photo.color, fontFamily: "Bebas Neue, sans-serif" }}>
                    {photo.date}
                  </span>
                </div>

                {/* Photo */}
                <div className="rounded-2xl overflow-hidden mb-6"
                  style={{
                    border: `1.5px solid ${photo.color}40`,
                    boxShadow: `0 0 30px ${photo.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
                    transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                  }}>
                  <img src={photo.src} alt={photo.title} className="w-full object-cover"
                    style={{ height: "clamp(220px, 60vw, 380px)" }} />
                </div>

                {/* Text */}
                <div className="px-1">
                  <h2 className="font-black mb-3 gradient-magenta"
                    style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 7vw, 3rem)", letterSpacing: "0.04em" }}>
                    {photo.title}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-purple-200"
                    style={{ fontFamily: "sans-serif" }}>
                    {photo.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ФИНАЛЬНОЕ ПОЖЕЛАНИЕ */}
        <FadeIn delay={200} className="mt-24">
          <div className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            style={{
              background: "rgba(45,10,78,0.65)",
              border: "1.5px solid rgba(255,0,144,0.35)",
              boxShadow: "0 0 60px rgba(255,0,144,0.12)",
            }}>

            <span className="absolute top-4 right-6 text-5xl font-black opacity-15 animate-star-spin"
              style={{ color: "#FFEF00", display: "inline-block" }}>★</span>
            <span className="absolute bottom-4 left-6 text-4xl font-black opacity-10 animate-rotate-slow"
              style={{ color: "#00F5FF", display: "inline-block" }}>✦</span>

            <div className="relative z-10 space-y-6">
              <p className="font-black" style={{ fontFamily: "Bebas Neue, sans-serif", color: "#FF0090", fontSize: "1rem", letterSpacing: "0.4em", textShadow: "0 0 12px #FF0090" }}>
                ★ МОЁ ПОЖЕЛАНИЕ ★
              </p>

              <h3 className="font-black gradient-cyber leading-tight"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2rem, 7vw, 3.5rem)" }}>
                СПАСИБО ЗА ТО, ЧТО ТЫ ЕСТЬ
              </h3>

              <div className="w-20 h-0.5 mx-auto" style={{ background: "linear-gradient(90deg, #FF0090, #FFEF00)" }} />

              <p className="text-base md:text-lg leading-relaxed text-purple-200 max-w-lg mx-auto"
                style={{ fontFamily: "sans-serif" }}>
                Я хочу, чтобы каждый день ты просыпалась и знала —
                рядом есть человек, для которого ты главная.
                Пусть у нас будет ещё тысяча таких фотографий.
                Я тебя люблю.
              </p>

              <div className="flex justify-center gap-4 text-2xl font-black pt-2">
                {["★", "✦", "◆", "●", "▲"].map((s, i) => (
                  <span key={i} className="animate-star-spin"
                    style={{
                      color: ["#FF0090","#FFEF00","#00F5FF","#AAFF00","#FF6B00"][i],
                      display: "inline-block",
                      animationDelay: `${i * 0.4}s`,
                    }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* FOOTER */}
        <div className="text-center mt-14 pb-4">
          <p className="font-black gradient-magenta text-2xl tracking-widest"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            С ЛЮБОВЬЮ, ДЛЯ ТЕБЯ
          </p>
          <p className="text-purple-600 text-xs mt-1 tracking-widest"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            2026
          </p>
        </div>
      </div>
    </div>
  );
}
