import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/00c50d3b-151e-4337-b506-62a7d06b7ef0.jpg";
const MOMENT_IMAGE = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/69fba0d8-1194-4fe2-ba86-0f62c23ed595.jpg";
const GALLERY_IMAGE = "https://cdn.poehali.dev/projects/ea17fd0a-dd98-4f3b-8259-4dde8eb0b5c7/files/cf197c30-f088-4d18-ace0-68c2bbd1e492.jpg";

const HEARTS_COUNT = 18;

interface FloatingHeart {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

function generateHearts(): FloatingHeart[] {
  const emojis = ["💕", "💗", "💖", "💝", "🌸", "✨", "💞", "🌷"];
  return Array.from({ length: HEARTS_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 14 + Math.random() * 18,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 10,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
  }));
}

function useIntersection(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`section-enter ${visible ? "section-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const moments = [
  { emoji: "🌅", title: "Наш первый закат", desc: "Тот вечер, который мы никогда не забудем" },
  { emoji: "☕", title: "Уютные утра", desc: "Когда весь мир — это чашка кофе и ты рядом" },
  { emoji: "🎬", title: "Кино и объятия", desc: "Лучшие фильмы всегда смотрятся вместе" },
  { emoji: "🌸", title: "Прогулки в цветах", desc: "Каждый шаг рядом с тобой — праздник" },
  { emoji: "🍰", title: "Сладкие вечера", desc: "Десерты вкуснее, когда делишь их с тобой" },
  { emoji: "🌙", title: "Ночные разговоры", desc: "Часы летят, пока мы говорим обо всём" },
];

const galleryPhotos = [
  { src: HERO_IMAGE, caption: "Наша первая встреча 🌸" },
  { src: MOMENT_IMAGE, caption: "Незабываемый вечер 💕" },
  { src: GALLERY_IMAGE, caption: "Вместе навсегда 💖" },
  { src: HERO_IMAGE, caption: "Счастливые моменты ✨" },
  { src: MOMENT_IMAGE, caption: "Наша история 💗" },
  { src: GALLERY_IMAGE, caption: "Любовь в каждом кадре 🌷" },
];

export default function Index() {
  const [hearts] = useState<FloatingHeart[]>(generateHearts);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "moments", label: "Моменты" },
    { id: "love", label: "Признание" },
    { id: "thanks", label: "Благодарность" },
    { id: "gallery", label: "Галерея" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #FFF5F7 0%, #FFE8EF 50%, #FFF0F5 100%)" }}>

      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map(h => (
          <span
            key={h.id}
            className="floating-heart absolute bottom-0 select-none"
            style={{
              left: h.left,
              fontSize: h.size,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-pink soft-shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="text-2xl animate-pulse-heart">💕</span>
            <span className="font-bold text-xl" style={{ color: "#C84B7E", fontFamily: "Caveat, cursive" }}>
              Наша История
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-semibold transition-colors ${
                  activeSection === item.id ? "text-pink-500" : "text-pink-300 hover:text-pink-500"
                }`}
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-pink-400" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 animate-fade-in-up" style={{ background: "rgba(255,245,247,0.95)" }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="text-left text-sm font-semibold text-pink-400 hover:text-pink-600 py-1"
                style={{ fontFamily: "Nunito, sans-serif" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* === HERO === */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 z-10">
        <div className="animate-fade-in-scale" style={{ animationDelay: "0.1s" }}>
          <div className="relative inline-block mb-6">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white mx-auto"
              style={{ boxShadow: "0 0 0 8px rgba(255,179,198,0.3), 0 20px 60px rgba(232,131,158,0.3)" }}>
              <img src={HERO_IMAGE} alt="Milk Mocha Bear" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-3 -right-3 text-4xl animate-wiggle">🌸</span>
            <span className="absolute -bottom-2 -left-4 text-3xl animate-float-heart">💕</span>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-2 gradient-text" style={{ fontFamily: "Caveat, cursive" }}>
            Наша История
          </h1>
          <p className="text-lg md:text-xl text-pink-400 font-medium mb-8" style={{ fontFamily: "Nunito, sans-serif" }}>
            Два сердца, одна история любви 💖
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["✨ Моменты счастья", "💕 Признание в любви", "📸 Наши фото"].map((tag, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(255,179,198,0.3)",
                  color: "#C84B7E",
                  border: "1px solid rgba(232,131,158,0.3)",
                  fontFamily: "Nunito, sans-serif"
                }}>
                {tag}
              </span>
            ))}
          </div>
          <button onClick={() => scrollTo("moments")}
            className="px-8 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #E8839E)",
              fontFamily: "Nunito, sans-serif",
              boxShadow: "0 8px 24px rgba(232,131,158,0.4)"
            }}>
            Наши моменты 💗
          </button>
        </div>

        <div className="absolute bottom-8 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-pink-300" />
        </div>
      </section>

      {/* === НАШИ ЛЮБИМЫЕ МОМЕНТЫ === */}
      <section id="moments" className="relative z-10 py-20 px-4">
        <Section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-6xl font-bold mb-3 gradient-text" style={{ fontFamily: "Caveat, cursive" }}>
                Наши любимые моменты
              </h2>
              <p className="text-pink-400 text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
                Каждый момент с тобой — маленькое чудо 🌸
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {moments.map((m, i) => (
                <Section key={i}>
                  <div className="photo-card p-6 rounded-3xl text-center"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(255,179,198,0.4)",
                      backdropFilter: "blur(8px)",
                    }}>
                    <div className="text-5xl mb-3 animate-sparkle" style={{ animationDelay: `${i * 0.3}s` }}>
                      {m.emoji}
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: "#C84B7E", fontFamily: "Caveat, cursive", fontSize: "1.4rem" }}>
                      {m.title}
                    </h3>
                    <p className="text-sm text-pink-400" style={{ fontFamily: "Nunito, sans-serif" }}>
                      {m.desc}
                    </p>
                  </div>
                </Section>
              ))}
            </div>

            <div className="mt-12 rounded-3xl overflow-hidden relative soft-shadow">
              <img src={MOMENT_IMAGE} alt="Наши моменты" className="w-full h-64 md:h-80 object-cover" />
              <div className="absolute inset-0 flex items-end p-6"
                style={{ background: "linear-gradient(transparent, rgba(200,75,126,0.5))" }}>
                <p className="text-white text-xl font-bold" style={{ fontFamily: "Caveat, cursive" }}>
                  Вместе каждый момент особенный 💕
                </p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* === ПРИЗНАНИЕ В ЛЮБВИ === */}
      <section id="love" className="relative z-10 py-20 px-4">
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-3 gradient-text" style={{ fontFamily: "Caveat, cursive" }}>
                Признание в любви
              </h2>
              <span className="text-4xl animate-pulse-heart inline-block">💖</span>
            </div>

            <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,214,224,0.6) 0%, rgba(255,255,255,0.8) 100%)",
                border: "2px solid rgba(255,179,198,0.5)",
                backdropFilter: "blur(12px)",
              }}>
              <span className="absolute top-4 right-6 text-5xl opacity-30">💕</span>
              <span className="absolute bottom-4 left-6 text-4xl opacity-20">🌸</span>

              <div className="relative z-10 space-y-6">
                <p className="text-2xl md:text-3xl font-bold leading-relaxed text-center"
                  style={{ color: "#C84B7E", fontFamily: "Caveat, cursive" }}>
                  "Ты — моё самое важное открытие,
                  мой любимый человек, моя вселенная..."
                </p>
                <div className="w-16 h-1 mx-auto rounded-full"
                  style={{ background: "linear-gradient(90deg, #FFB3C6, #E8839E)" }} />
                <p className="text-base md:text-lg text-center leading-relaxed"
                  style={{ color: "#8B5E52", fontFamily: "Nunito, sans-serif" }}>
                  Каждый день рядом с тобой — это подарок судьбы.
                  Ты делаешь мою жизнь ярче, теплее и счастливее.
                  Я люблю твою улыбку, твой смех, твою заботу.
                  Ты — моя любовь, мой дом, мой покой.
                </p>
                <div className="flex justify-center gap-4 text-3xl">
                  {["💕", "💖", "💗", "💝", "💘"].map((e, i) => (
                    <span key={i} className="animate-float-heart" style={{ animationDelay: `${i * 0.4}s` }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* === БЛАГОДАРНОСТЬ === */}
      <section id="thanks" className="relative z-10 py-20 px-4">
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-3 gradient-text" style={{ fontFamily: "Caveat, cursive" }}>
                Выражение благодарности
              </h2>
              <p className="text-pink-400 text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
                Спасибо за всё, что ты делаешь 🌷
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { emoji: "🤗", text: "Спасибо за твои объятия, которые всегда согревают меня" },
                { emoji: "😊", text: "Спасибо за твою улыбку, которая освещает мой день" },
                { emoji: "🛡️", text: "Спасибо за твою поддержку в самые трудные моменты" },
                { emoji: "🎵", text: "Спасибо за смех, который ты привносишь в мою жизнь" },
                { emoji: "💡", text: "Спасибо за то, что веришь в меня больше, чем я сам" },
                { emoji: "🌈", text: "Спасибо за то, что ты просто есть рядом" },
              ].map((item, i) => (
                <Section key={i}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(255,179,198,0.35)",
                    }}>
                    <span className="text-3xl shrink-0 animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }}>
                      {item.emoji}
                    </span>
                    <p className="text-base leading-relaxed" style={{ color: "#8B5E52", fontFamily: "Nunito, sans-serif" }}>
                      {item.text}
                    </p>
                  </div>
                </Section>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* === ГАЛЕРЕЯ === */}
      <section id="gallery" className="relative z-10 py-20 px-4">
        <Section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-6xl font-bold mb-3 gradient-text" style={{ fontFamily: "Caveat, cursive" }}>
                Галерея совместных фотографий
              </h2>
              <p className="text-pink-400 text-lg" style={{ fontFamily: "Nunito, sans-serif" }}>
                Наши драгоценные воспоминания 📸
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryPhotos.map((photo, i) => (
                <Section key={i}>
                  <div className="photo-card rounded-2xl overflow-hidden relative group" style={{ aspectRatio: "1" }}>
                    <img src={photo.src} alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                      style={{ background: "linear-gradient(transparent, rgba(200,75,126,0.6))" }}>
                      <p className="text-white font-bold" style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem" }}>
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </Section>
              ))}
            </div>

            <Section>
              <div className="mt-10 text-center p-8 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,179,198,0.3), rgba(255,214,224,0.5))",
                  border: "2px dashed rgba(232,131,158,0.4)"
                }}>
                <p className="text-4xl mb-3">📷</p>
                <p className="font-semibold" style={{ color: "#C84B7E", fontFamily: "Caveat, cursive", fontSize: "1.4rem" }}>
                  Здесь будут ваши совместные фотографии
                </p>
                <p className="text-sm text-pink-400 mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>
                  Напишите мне, и я добавлю ваши фото в галерею 💕
                </p>
              </div>
            </Section>
          </div>
        </Section>
      </section>

      {/* === FOOTER === */}
      <footer className="relative z-10 py-10 px-4 text-center"
        style={{ borderTop: "1px solid rgba(255,179,198,0.3)" }}>
        <div className="flex justify-center gap-3 text-3xl mb-4">
          {["💕", "💖", "💗"].map((e, i) => (
            <span key={i} className="animate-pulse-heart" style={{ animationDelay: `${i * 0.5}s` }}>{e}</span>
          ))}
        </div>
        <p className="font-bold gradient-text" style={{ fontFamily: "Caveat, cursive", fontSize: "1.5rem" }}>
          С любовью, для тебя
        </p>
        <p className="text-sm text-pink-300 mt-1" style={{ fontFamily: "Nunito, sans-serif" }}>
          2026 · Наша история любви
        </p>
      </footer>
    </div>
  );
}
