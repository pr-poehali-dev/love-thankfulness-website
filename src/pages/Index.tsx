import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMG1 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/be43fad9-51b0-4d71-aa26-37b06c875789.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/9714b1b1-9d3d-4fa9-aa9f-e52e49f29e86.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/4d4f9b5f-07c1-448c-b817-8436a1814921.jpg";
const COVER = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/bucket/c3a349a9-3793-4de9-9bc0-e0f8b8469078.jpg";

interface Particle {
  id: number; left: string; size: number;
  duration: number; delay: number; char: string; color: string;
}

function generateParticles(): Particle[] {
  const chars = ["★", "✦", "◆", "●", "▲", "✿", "♥", "✺"];
  const colors = ["#FF0090", "#FFEF00", "#00F5FF", "#AAFF00", "#FF6B00", "#FF1493"];
  return Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 12 + Math.random() * 20,
    duration: 7 + Math.random() * 10,
    delay: Math.random() * 12,
    char: chars[Math.floor(Math.random() * chars.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useIntersection(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`section-enter ${vis ? "section-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const MOMENTS = [
  { icon: "★", title: "Первый взгляд", desc: "Тот миг, когда всё изменилось навсегда", color: "#FF0090" },
  { icon: "✦", title: "Уютные вечера", desc: "Когда время останавливается, если ты рядом", color: "#FFEF00" },
  { icon: "◆", title: "Наш первый закат", desc: "Небо горело так же ярко, как моё сердце", color: "#00F5FF" },
  { icon: "●", title: "Смех и безумства", desc: "Лучшие моменты — самые спонтанные", color: "#AAFF00" },
  { icon: "▲", title: "Ночные прогулки", desc: "Город наш, когда мы идём вдвоём", color: "#FF6B00" },
  { icon: "✿", title: "Тихие утра", desc: "Лучшее пробуждение — когда ты рядом", color: "#FF1493" },
];

const GALLERY = [
  { src: IMG1, label: "Мы вместе ★" },
  { src: IMG2, label: "Наш мир ✦" },
  { src: IMG3, label: "Навсегда ◆" },
  { src: IMG1, label: "Счастье ●" },
  { src: IMG2, label: "Любовь ▲" },
  { src: IMG3, label: "Бесконечность ✿" },
];

const COLORS = ["#FF0090", "#FFEF00", "#00F5FF", "#AAFF00", "#FF6B00"];

export default function Index() {
  const [particles] = useState<Particle[]>(generateParticles);
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);

  const NAV = [
    { id: "home", label: "ГЛАВНАЯ" },
    { id: "moments", label: "МОМЕНТЫ" },
    { id: "love", label: "ЛЮБОВЬ" },
    { id: "thanks", label: "БЛАГОДАРНОСТЬ" },
    { id: "gallery", label: "ГАЛЕРЕЯ" },
  ];

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 100;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.offsetTop <= y) { setActive(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 120% 60% at 50% 0%, #7C3AED 0%, #4C1D95 30%, #2D0A4E 60%, #1a0530 100%)" }}>

      {/* BG orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="animate-orb-float absolute top-20 left-10 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, #FF0090, transparent)", filter: "blur(80px)", opacity: 0.18 }} />
        <div className="animate-orb-float absolute bottom-40 right-10 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, #FFEF00, transparent)", filter: "blur(80px)", opacity: 0.12, animationDelay: "3s" }} />
        <div className="animate-orb-float absolute top-1/2 left-1/3 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, #00F5FF, transparent)", filter: "blur(80px)", opacity: 0.1, animationDelay: "5s" }} />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => (
          <span key={p.id} className="floating-particle select-none font-black"
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

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(26,5,48,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,0,144,0.25)" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2">
            <span className="text-xl font-black animate-star-spin inline-block" style={{ color: "#FF0090" }}>★</span>
            <span className="text-lg font-black tracking-widest neon-pink" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              НАША ИСТОРИЯ
            </span>
          </button>

          <div className="hidden md:flex gap-6">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className={`nav-item text-xs font-black tracking-widest transition-colors ${active === n.id ? "neon-yellow" : "text-purple-300 hover:text-white"}`}>
                {n.label}
              </button>
            ))}
          </div>

          <button className="md:hidden" style={{ color: "#FF0090" }} onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menu && (
          <div className="md:hidden px-4 pb-5 pt-2 flex flex-col gap-3 animate-fade-in-up"
            style={{ borderTop: "1px solid rgba(255,0,144,0.2)" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="text-left text-xs font-black tracking-widest text-purple-300 hover:text-white py-1"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <Reveal className="mb-8">
          <div className="relative inline-block animate-float-bob">
            <div className="w-60 h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden mx-auto"
              style={{
                boxShadow: "0 0 0 3px #FF0090, 0 0 30px rgba(255,0,144,0.5), 0 0 80px rgba(107,33,168,0.6)",
                transform: "rotate(-2deg)"
              }}>
              <img src={COVER} alt="Our Story" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-5 -right-5 text-4xl font-black animate-star-spin" style={{ color: "#FFEF00", textShadow: "0 0 15px #FFEF00" }}>★</span>
            <span className="absolute -bottom-4 -left-5 text-3xl font-black animate-rotate-slow" style={{ color: "#00F5FF", textShadow: "0 0 12px #00F5FF" }}>✦</span>
            <span className="absolute top-1/2 -right-8 text-2xl font-black animate-star-spin" style={{ color: "#FF0090", animationDelay: "0.5s" }}>◆</span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-xs font-black tracking-[0.5em] neon-pink mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            ★ СПЕЦИАЛЬНО ДЛЯ ТЕБЯ ★
          </p>
          <h1 className="font-black leading-none mb-3"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(3rem, 12vw, 8rem)", letterSpacing: "0.05em" }}>
            <span className="gradient-magenta block">НАША</span>
            <span className="gradient-cyber block">ИСТОРИЯ</span>
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-sm font-bold tracking-[0.3em] text-purple-300 mb-8 uppercase"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            Два сердца · Одна вселенная
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["★ МОМЕНТЫ", "✦ ЛЮБОВЬ", "◆ БЛАГОДАРНОСТЬ", "● ГАЛЕРЕЯ"].map((t, i) => (
              <span key={i} className="px-4 py-1.5 text-xs font-black tracking-widest"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  border: `1.5px solid ${COLORS[i]}`,
                  color: COLORS[i],
                  boxShadow: `0 0 10px ${COLORS[i]}30`,
                }}>
                {t}
              </span>
            ))}
          </div>
          <button onClick={() => go("moments")}
            className="px-10 py-4 font-black text-lg tracking-widest text-black uppercase transition-all hover:scale-105 active:scale-95"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              background: "linear-gradient(135deg, #FF0090, #FFEF00)",
              boxShadow: "0 0 20px rgba(255,0,144,0.5), 0 0 40px rgba(255,239,0,0.3)",
              letterSpacing: "0.15em",
            }}>
            НАЧАТЬ ПУТЕШЕСТВИЕ ★
          </button>
        </Reveal>

        <div className="absolute bottom-8 animate-bounce">
          <Icon name="ChevronDown" size={32} style={{ color: "#FF0090" }} />
        </div>
      </section>

      {/* ===== МОМЕНТЫ ===== */}
      <section id="moments" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-black tracking-[0.5em] neon-pink mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>★ ★ ★</p>
              <h2 className="font-black leading-none mb-4"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
                <span className="gradient-magenta">НАШИ ЛЮБИМЫЕ</span><br />
                <span className="gradient-cyber">МОМЕНТЫ</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {MOMENTS.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card-dark p-7 rounded-xl">
                  <span className="text-4xl font-black mb-4 block animate-star-spin"
                    style={{ color: m.color, textShadow: `0 0 15px ${m.color}`, animationDelay: `${i * 0.8}s`, display: "inline-block" }}>
                    {m.icon}
                  </span>
                  <h3 className="font-black text-xl tracking-wider mb-2 text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                    {m.title}
                  </h3>
                  <p className="text-purple-400 text-sm leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    {m.desc}
                  </p>
                  <div className="mt-4 h-px" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }} />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 0 40px rgba(255,0,144,0.25)" }}>
              <img src={IMG2} alt="moments" className="w-full h-64 md:h-96 object-cover" />
              <div className="absolute inset-0 flex items-end p-8"
                style={{ background: "linear-gradient(transparent, rgba(26,5,48,0.92))" }}>
                <h3 className="font-black gradient-magenta" style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>
                  КАЖДЫЙ МОМЕНТ С ТОБОЙ — ШЕДЕВР ★
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ПРИЗНАНИЕ ===== */}
      <section id="love" className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-xs font-black tracking-[0.5em] neon-yellow mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>✦ ✦ ✦</p>
              <h2 className="font-black leading-none"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
                <span className="gradient-cyber">ПРИЗНАНИЕ</span><br />
                <span className="gradient-magenta">В ЛЮБВИ</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative rounded-2xl p-8 md:p-14 overflow-hidden"
              style={{
                background: "rgba(45,10,78,0.7)",
                border: "1px solid rgba(255,0,144,0.4)",
                boxShadow: "0 0 50px rgba(255,0,144,0.12), inset 0 0 50px rgba(107,33,168,0.08)"
              }}>
              <span className="absolute top-4 right-6 text-5xl font-black opacity-20 animate-star-spin"
                style={{ color: "#FFEF00" }}>★</span>
              <span className="absolute bottom-4 left-6 text-4xl font-black opacity-15 animate-rotate-slow"
                style={{ color: "#00F5FF" }}>✦</span>

              <div className="relative z-10 space-y-8 text-center">
                <blockquote className="font-black leading-tight"
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
                    color: "#FF0090",
                    textShadow: "0 0 20px rgba(255,0,144,0.4)",
                  }}>
                  «ТЫ МОЁ САМОЕ ЯРКОЕ ОТКРЫТИЕ — МОЙ ЛЮБИМЫЙ ЧЕЛОВЕК, МОЯ ВСЕЛЕННАЯ»
                </blockquote>

                <div className="flex justify-center gap-3">
                  {["★","✦","◆","●","▲"].map((s, i) => (
                    <span key={i} className="text-2xl font-black animate-star-spin"
                      style={{ color: COLORS[i], animationDelay: `${i * 0.4}s`, display: "inline-block" }}>
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-base md:text-lg leading-relaxed text-purple-200 max-w-2xl mx-auto"
                  style={{ fontFamily: "sans-serif" }}>
                  Каждый день рядом с тобой — это подарок, который я не заслужил.
                  Ты делаешь мою жизнь ярче любого неона, теплее любого заката.
                  Ты — моя любовь, мой дом, моя вселенная.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== БЛАГОДАРНОСТЬ ===== */}
      <section id="thanks" className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-black tracking-[0.5em] neon-cyan mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>◆ ◆ ◆</p>
              <h2 className="font-black leading-none"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
                <span className="gradient-magenta">ВЫРАЖЕНИЕ</span><br />
                <span className="gradient-cyber">БЛАГОДАРНОСТИ</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { sym: "★", text: "Спасибо за твои объятия — они моя броня от всего мира", color: "#FF0090" },
              { sym: "✦", text: "Спасибо за твою улыбку — она ярче любого неона", color: "#FFEF00" },
              { sym: "◆", text: "Спасибо за поддержку в моменты, когда я готов был сдаться", color: "#00F5FF" },
              { sym: "●", text: "Спасибо за смех — ты делаешь каждый день праздником", color: "#AAFF00" },
              { sym: "▲", text: "Спасибо за то, что веришь в меня сильнее, чем я сам", color: "#FF6B00" },
              { sym: "✿", text: "Спасибо за то, что ты просто есть — это главное", color: "#FF1493" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card-dark flex items-start gap-5 p-6 rounded-xl">
                  <span className="text-3xl font-black shrink-0 animate-star-spin"
                    style={{ color: item.color, textShadow: `0 0 12px ${item.color}`, animationDelay: `${i * 0.6}s`, display: "inline-block" }}>
                    {item.sym}
                  </span>
                  <p className="text-base text-purple-200 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ГАЛЕРЕЯ ===== */}
      <section id="gallery" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-black tracking-[0.5em] neon-pink mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>● ● ●</p>
              <h2 className="font-black leading-none"
                style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
                <span className="gradient-cyber">ГАЛЕРЕЯ</span><br />
                <span className="gradient-magenta">НАШИХ ФОТОГРАФИЙ</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {GALLERY.map((g, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group relative rounded-xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "1", border: "1px solid rgba(255,0,144,0.2)" }}>
                  <img src={g.src} alt={g.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                    style={{ background: "linear-gradient(transparent, rgba(26,5,48,0.92))" }}>
                    <span className="font-black text-white tracking-widest text-sm"
                      style={{ fontFamily: "Bebas Neue, sans-serif", textShadow: "0 0 10px #FF0090" }}>
                      {g.label}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="rounded-2xl p-10 text-center"
              style={{
                background: "rgba(45,10,78,0.4)",
                border: "2px dashed rgba(255,0,144,0.4)",
              }}>
              <span className="text-5xl font-black block mb-4 animate-star-spin"
                style={{ color: "#FF0090", textShadow: "0 0 15px #FF0090", display: "inline-block" }}>◆</span>
              <p className="font-black text-2xl tracking-widest text-white mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                ЗДЕСЬ БУДУТ ВАШИ ФОТО
              </p>
              <p className="text-purple-400 text-sm" style={{ fontFamily: "sans-serif" }}>
                Напишите мне — и я добавлю ваши совместные фотографии прямо сюда
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-4 text-center"
        style={{ borderTop: "1px solid rgba(255,0,144,0.2)" }}>
        <div className="flex justify-center gap-4 text-3xl mb-5">
          {["★", "✦", "◆", "●", "▲"].map((s, i) => (
            <span key={i} className="font-black animate-star-spin"
              style={{ color: COLORS[i], animationDelay: `${i * 0.4}s`, display: "inline-block" }}>
              {s}
            </span>
          ))}
        </div>
        <p className="font-black gradient-magenta text-3xl tracking-widest"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          С ЛЮБОВЬЮ, ДЛЯ ТЕБЯ
        </p>
        <p className="text-purple-500 text-sm mt-2 tracking-widest"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          2026 · НАША ИСТОРИЯ ЛЮБВИ
        </p>
      </footer>
    </div>
  );
}
