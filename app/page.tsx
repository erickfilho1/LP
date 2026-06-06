"use client";

import { AnimatePresence, motion, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Lenis from "lenis";
import { createWhatsappHref, getWhatsappNumberLabel } from "./whatsapp";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["Soluções", "#solucoes"],
  ["Processo", "#processo"],
  ["Planos", "#planos"],
  ["Cases", "#cases"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
] as const;

const services = [
  "Landing Pages",
  "Ads & Creatives",
  "Vídeos",
  "Design Systems",
  "Web Elements",
];

const heroWords = ["Landing pages", "Artes", "Vídeos", "Sites"];

const metrics = [
  ["+100", "Landing pages entregues"],
  ["+30", "Agências atendidas"],
  ["+10", "Lançamentos suportados"],
  ["98%", "Entregas no prazo"],
  ["3 dias", "Prazo médio de entrega"],
  ["5", "Solicitações diárias"],
];

const clients = [
  ["Agency X", "spark"],
  ["LaunchLab", "frame"],
  ["INFOpro", "orbit"],
  ["PULSE", "signal"],
  ["StudioNorth", "north"],
  ["CreativeFlow", "flow"],
];

const clientLogos = [
  { name: "Parceiro 01", src: "/assets/clients/client-logo-01.svg", width: 229, height: 90 },
  { name: "Parceiro 02", src: "/assets/clients/client-logo-02.svg", width: 208, height: 71 },
  { name: "Parceiro 03", src: "/assets/clients/client-logo-03.svg", width: 324, height: 119 },
  { name: "Parceiro 04", src: "/assets/clients/client-logo-04.svg", width: 236, height: 89 },
  { name: "Parceiro 05", src: "/assets/clients/client-logo-05.svg", width: 334, height: 106 },
] as const;

const boardColumns = [
  {
    title: "Backlog",
    count: "3",
    cards: ["Landing Page", "Anúncio", "Video Edit"],
  },
  {
    title: "Em andamento",
    count: "2",
    cards: ["Página de Vendas", "VSL"],
  },
  {
    title: "Revisão",
    count: "1",
    cards: ["Página Obrigado"],
  },
  {
    title: "Concluído",
    count: "4",
    cards: ["Anúncio", "Landing Page", "Email Design", "Video Edit"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Solicitação",
    text: "Você envia a demanda pelo Trello com briefing simples e objetivo.",
    icon: "request",
  },
  {
    step: "02",
    title: "Produção",
    text: "Entramos em ação com nosso fluxo operacional organizado.",
    icon: "progress",
  },
  {
    step: "03",
    title: "Revisão",
    text: "Você revisa e solicita ajustes com agilidade e clareza.",
    icon: "review",
  },
  {
    step: "04",
    title: "Entrega",
    text: "Arquivos entregues com prazo, qualidade e consistência.",
    icon: "delivered",
  },
];

const plans = [
  {
    name: "Essencial",
    price: "R$ 1.500",
    description: "Suporte criativo diário para demandas contínuas.",
    included: ["Artes"],
    features: ["3 pedidos por dia", "Entregas em 3 dias", "Revisões limitadas", "Acompanhamento Trello"],
  },
  {
    name: "Growth",
    price: "R$ 2.000",
    description: "Ideal para agências em crescimento.",
    tag: "Mais escolhido",
    featured: true,
    included: ["Artes", "Vídeos", "LPs"],
    features: ["5 demandas por dia", "Entregas em 72h", "Revisões ilimitadas", "Acompanhamento Trello"],
  },
  {
    name: "Scale",
    price: "R$ 2.997",
    description: "Produção criativa em alta escala.",
    included: ["Artes", "Vídeos", "LPs", "Prazo prioritário"],
    features: ["10+ demandas por dia", "Entregas prioritárias", "Revisões ilimitadas", "Acompanhamento Trello"],
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    description: "Infraestrutura criativa personalizada.",
    included: ["Tudo incluso"],
    features: ["Demandas ilimitadas", "Entrega prioritária", "Suporte dedicado", "Fluxo personalizado"],
  },
];

const briefingHref = (plan?: string) => `/briefing${plan ? `?plano=${encodeURIComponent(plan)}` : ""}`;
const specialistWhatsappHref = createWhatsappHref("Ola, Erick! Quero falar sobre plugar a HAKI na minha operacao.");
const specialistWhatsappLabel = getWhatsappNumberLabel();

type ConnectionLike = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function useLightweightExperience() {
  const reduceMotion = useReducedMotion();
  const [isLightweight, setIsLightweight] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: ConnectionLike }).connection;

    const syncPreference = () => {
      const saveData = Boolean(connection?.saveData);
      const slowerConnection = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
      setIsLightweight(reduceMotion || saveData || slowerConnection);
    };

    syncPreference();
    connection?.addEventListener?.("change", syncPreference);

    return () => {
      connection?.removeEventListener?.("change", syncPreference);
    };
  }, [reduceMotion]);

  return isLightweight;
}

const portfolio = {
  "Landing pages": [
    ["Launch Sprint", "Página de vendas para lançamento digital", "Conversão"],
    ["Med Scale", "Landing page para captação de pacientes", "Performance"],
    ["Expert OS", "Página institucional para expert", "Autoridade"],
  ],
  "Criativos": [
    ["Ad Pack 01", "Pacote de criativos para teste de oferta", "Ads"],
    ["Reels System", "Linha visual para conteúdo diário", "Social"],
    ["Launch Assets", "Peças para aquecimento e abertura", "Lançamento"],
  ],
  "Vídeos": [
    ["VSL Cut", "Edição objetiva para página de vendas", "VSL"],
    ["Shorts Engine", "Cortes recorrentes para especialistas", "Conteúdo"],
    ["Offer Motion", "Motion simples para criativos pagos", "Motion"],
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

function SmoothScroll({ disabled = false }: { disabled?: boolean }) {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const isCompactViewport = window.matchMedia("(max-width: 768px)").matches;
    const lenis = new Lenis({
      duration: isCompactViewport ? 0.82 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: isCompactViewport,
      touchMultiplier: isCompactViewport ? 0.92 : 1,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [disabled]);

  return null;
}

function HakiPreloader({ disabled = false }: { disabled?: boolean }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (disabled) {
      setIsVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setIsVisible(false), 1450);

    return () => window.clearTimeout(timeout);
  }, [disabled]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="haki-preloader" aria-label="Carregando Studio Haki">
      <div className="haki-preloader-mark">
        <Image src="/brand/assets/haki-symbol-transparent.png" alt="" width={460} height={393} priority />
      </div>
      <p>Creative operational studio</p>
    </div>
  );
}

function UmanoNav({ liteMode = false }: { liteMode?: boolean }) {
  const [isRailMode, setIsRailMode] = useState(false);
  const [railIndex, setRailIndex] = useState(0);
  const [railCount, setRailCount] = useState(4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (liteMode) {
      return;
    }

    const section = document.querySelector<HTMLElement>(".umano-rail-section");
    const viewport = document.querySelector<HTMLElement>(".umano-rail-viewport");
    const track = document.querySelector<HTMLElement>(".umano-rail");

    if (!section || !viewport || !track) {
      return;
    }

    let railModeActive = false;
    let casesModeActive = false;
    const syncRailMode = () => setIsRailMode(railModeActive || casesModeActive);
    const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const deliveryCard = document.querySelector<HTMLElement>(".is-delivery-card");
    const getFocusDistance = () => {
      if (!deliveryCard) {
        return getDistance();
      }

      const targetX = window.innerWidth / 2 - (deliveryCard.offsetLeft + deliveryCard.offsetWidth / 2);
      return Math.abs(targetX);
    };
    const railTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getFocusDistance() * 0.62 + window.innerHeight * 0.16}`,
      onEnter: () => {
        railModeActive = true;
        syncRailMode();
      },
      onEnterBack: () => {
        railModeActive = true;
        syncRailMode();
      },
      onLeave: () => {
        railModeActive = false;
        syncRailMode();
      },
      onLeaveBack: () => {
        railModeActive = false;
        syncRailMode();
      },
      onUpdate: (self) => {
        const carouselProgress = Math.min(1, self.progress / 0.52);
        const nextIndex = Math.min(3, Math.max(0, Math.round(carouselProgress * 3)));
        setRailIndex((current) => (current === nextIndex ? current : nextIndex));
      },
      invalidateOnRefresh: true,
    });

    const handleCasesRail = (event: Event) => {
      const detail = (event as CustomEvent<{ active: boolean; count?: number }>).detail;
      casesModeActive = Boolean(detail?.active);
      setRailCount(casesModeActive ? detail?.count ?? deliveryCases.length : 4);
      syncRailMode();
    };
    const handleCasesIndex = (event: Event) => {
      const nextIndex = (event as CustomEvent<{ index: number }>).detail?.index ?? 0;
      setRailIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    window.addEventListener("haki:cases-rail", handleCasesRail);
    window.addEventListener("haki:cases-index", handleCasesIndex);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      railTrigger.kill();
      window.removeEventListener("haki:cases-rail", handleCasesRail);
      window.removeEventListener("haki:cases-index", handleCasesIndex);
    };
  }, [liteMode]);

  return (
    <header className={`umano-nav ${isRailMode ? "is-rail-mode" : ""}`} aria-label="Navegação principal">
      <a href="#top" className="umano-nav-logo" aria-label="Studio Haki">
        <Image src="/brand/assets/haki-logo-transparent.png" alt="HAKI" width={1570} height={393} priority />
      </a>

      <div className="umano-nav-mobile-rail" aria-label={`Progresso do carrossel: item ${railIndex + 1} de ${railCount}`}>
        {Array.from({ length: railCount }).map((_, index) => (
          <span key={`mobile-${index}`} className={railIndex === index ? "is-active" : ""} />
        ))}
      </div>

      <div className="umano-nav-center">
        <nav className="umano-nav-links" aria-label="Seções">
          <a href="#solucoes">Soluções</a>
          <a href="#processo">Processo</a>
          <a href="#cases">Cases</a>
          <a href="#planos">Planos</a>
        </nav>

        <div className="umano-nav-rail" aria-label={`Progresso do carrossel: item ${railIndex + 1} de ${railCount}`}>
          {Array.from({ length: railCount }).map((_, index) => (
            <span key={index} className={railIndex === index ? "is-active" : ""} />
          ))}
        </div>
      </div>

      <a className="umano-nav-cta" href={specialistWhatsappHref} target="_blank" rel="noreferrer">
        Plugar HAKI
      </a>

      <button
        type="button"
        className={`umano-nav-mobile-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              className="umano-nav-mobile-backdrop"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="umano-nav-mobile-panel"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="umano-nav-mobile-links" aria-label="Menu mobile">
                {navItems.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)}>
                    {label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function DynamicHeroWord({ liteMode = false }: { liteMode?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (liteMode || reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroWords.length);
    }, 1550);

    return () => window.clearInterval(interval);
  }, [liteMode, reduceMotion]);

  if (liteMode) {
    return <span>Landing pages</span>;
  }

  return (
    <motion.span
      layout
      className="umano-hero-word-shell"
      transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={heroWords[activeIndex]}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.98, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98, filter: "blur(8px)" }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {heroWords[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function HeroWireframe() {
  const heroCards = [
    ["hero-dashboard-preview", "Dashboard operacional", "Fluxo Trello + entregas"],
    ["case-video-01", "Vídeo criativo", "Área para VSL / cortes"],
    ["case-image-01", "Landing page", "?rea para print do projeto"],
  ];

  return (
    <motion.div
      className="umano-wireframe"
      initial={{ opacity: 0, y: 80, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.05, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="umano-wireframe-system" aria-label="Wireframe da interface operacional HAKI">
        <div className="umano-wireframe-shell">
          <div className="umano-wireframe-topbar">
            <span />
            <span />
            <span />
            <strong>HAKI OPS</strong>
          </div>

          <div className="umano-wireframe-grid">
            <div className="umano-wireframe-media" data-slot="hero-video">
              <span>hero-video</span>
              <strong>1920 x 800</strong>
              <em>Substituir pelo vídeo hero final</em>
            </div>

            <div className="umano-wireframe-core">
              <Image src="/brand/assets/haki-symbol-transparent.png" alt="" width={460} height={393} />
              <small>Creative infrastructure online</small>
            </div>

            <div className="umano-wireframe-stack">
              {heroCards.map(([slot, title, text], index) => (
                <motion.div
                  key={slot}
                  className="umano-wireframe-card"
                  data-slot={slot}
                  animate={{ y: [0, index % 2 === 0 ? -7 : 7, 0] }}
                  transition={{ duration: 5.5 + index, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span>{slot}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="umano-wireframe-footer">
            <span>3 dias úteis</span>
            <span>5 solicitações/dia</span>
            <span>Fluxo previsível</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UmanoHero({ liteMode = false }: { liteMode?: boolean }) {
  const circuitPaths = [
    "M445.353 -279L369.066 62.4226C364.117 84.5745 378.571 106.401 400.898 110.49L795 182.5",
    "M1474.65 -278L1550.93 63.4226C1555.88 85.5745 1541.43 107.401 1519.1 111.49L1125 183.5",
    "M-216.261 -35.6707L-1.55047 63.037C20.9596 73.3854 38.1246 92.1429 45.9813 114.979L97.5266 264.796C102.113 278.125 109.925 290.208 120.315 300.043L393.023 558.171C402.66 567.293 415.034 573.246 428.382 575.183L576.26 596.644C589.34 598.542 601.471 604.359 610.939 613.273L844.36 833.046",
    "M-325.194 157.396L-158.521 219.108C-129.981 229.675 -108.786 253.285 -102.016 282.051L-76.9681 388.475C-73.0587 405.086 -64.2585 420.253 -51.6264 432.151L153.457 625.311C164.837 636.03 179.939 642.285 195.83 642.861L313.392 647.124C328.958 647.688 343.758 653.789 354.941 664.253L535.632 833.309",
    "M2134.5 -18.9173L1923.62 76.6819C1900.69 87.0732 1883.25 106.16 1875.44 129.407L1826.21 275.845C1821.66 289.406 1813.77 301.701 1803.22 311.682L1536.06 564.475C1526.29 573.714 1513.72 579.698 1500.18 581.553L1354.75 601.485C1341.49 603.303 1329.16 609.149 1319.57 618.177L1090.51 833.757",
    "M2215.8 157.396L2049.2 219.054C2020.65 229.62 1999.44 253.24 1992.68 282.016L1967.67 388.371C1963.76 404.987 1954.96 420.16 1942.32 432.061L1737.34 625.124C1725.96 635.845 1710.85 642.1 1694.95 642.673L1577.44 646.913C1561.87 647.475 1547.06 653.576 1535.88 664.043L1355.27 833.023",
  ];

  return (
    <section id="top" className="umano-hero">
      <div className="umano-hero-circuit" aria-hidden="true">
        <svg className="umano-hero-circuit-svg" viewBox="0 0 1920 870" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hero-circuit-top-left" x1="380" y1="-160" x2="790" y2="184" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#454545" stopOpacity="0" />
              <stop offset="1" stopColor="#454545" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="hero-circuit-top-right" x1="1540" y1="-160" x2="1128" y2="184" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#454545" stopOpacity="0" />
              <stop offset="1" stopColor="#454545" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="hero-pulse-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff0f33" stopOpacity="0" />
              <stop offset="0.45" stopColor="#ff0f33" stopOpacity="1" />
              <stop offset="1" stopColor="#ff0f33" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="umano-hero-circuit-base">
            {circuitPaths.map((path, index) => (
              <path
                key={`base-${index}`}
                d={path}
                pathLength="1"
                stroke={index === 0 ? "url(#hero-circuit-top-left)" : index === 1 ? "url(#hero-circuit-top-right)" : "#454545"}
              />
            ))}
            <path d="M-216 833H2136" stroke="#262624" />
          </g>

          {liteMode ? null : (
            <g className="umano-hero-circuit-pulses" filter="url(#hero-pulse-glow)">
              {circuitPaths.map((path, index) => (
                <path
                  key={`pulse-${index}`}
                  className={`umano-hero-circuit-pulse pulse-${index + 1}`}
                  d={path}
                  pathLength="1"
                  stroke="url(#hero-pulse-gradient)"
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      <div className="umano-hero-inner">
        <Reveal className="umano-hero-copy">
          <div className="umano-hero-kicker">
            Para agências e profissionais de marketing
          </div>
          <h1 className="umano-hero-title">
            Pare de depender de freelancer.
            <br />
            Plugue a HAKI na sua operação.
          </h1>
          <p className="umano-hero-subtitle">
            A HAKI entrega <DynamicHeroWord liteMode={liteMode} /> para sua operação, sem depender de freelancer solto.
          </p>
          <div className="umano-hero-actions">
            <a href="#planos">Plugar a HAKI</a>
            <a href="#processo">Ver processo</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function UmanoLogoStrip() {
  return (
    <section className="umano-logo-strip" aria-label="Clientes e parceiros">
      <p>Agências e negócios digitais que confiam no nosso fluxo</p>
      <div className="umano-logo-strip-viewport">
        <div className="umano-logo-strip-marquee">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="umano-logo-strip-grid"
              aria-hidden={copyIndex === 1 ? "true" : undefined}
            >
              {clientLogos.map((logo) => (
                <span key={`${copyIndex}-${logo.src}`} className="umano-logo-badge">
                  <Image
                    src={logo.src}
                    alt={copyIndex === 0 ? logo.name : ""}
                    width={logo.width}
                    height={logo.height}
                    className="umano-logo-badge-image"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.08 + (index / total) * 0.64;
  const end = start + 0.2;
  const color = useTransform(progress, [start, end], ["rgba(8,8,8,0.16)", "rgba(8,8,8,0.84)"]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.span className="umano-manifesto-word" style={{ color, y }}>
      {word}
    </motion.span>
  );
}

function StickyManifesto({ liteMode = false }: { liteMode?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 76, damping: 24, mass: 0.2 });
  const y = useTransform(smoothProgress, [0, 0.5, 1], [18, 0, -18]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.985, 1, 0.992]);
  const progressScale = useTransform(smoothProgress, [0.06, 0.9], [0, 1]);
  const firstLine = ["Um", "estúdio", "dentro", "da", "sua", "operação,"];
  const secondLine = ["com", "ritmo", "de", "produto", "e", "prazo", "de lançamento."];
  const words = [...firstLine, ...secondLine];

  if (liteMode) {
    return (
      <section ref={ref} className="umano-manifesto">
        <div ref={pinRef} className="umano-manifesto-pin">
          <div className="umano-manifesto-sticky">
            <span className="umano-manifesto-kicker">Infraestrutura criativa plugada</span>
            <h2>
              <span className="umano-manifesto-line">{firstLine.join(" ")}</span>
              <span className="umano-manifesto-line">{secondLine.join(" ")}</span>
            </h2>
          </div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    if (!ref.current || !pinRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: () => {
          if (!ref.current) {
            return "+=0";
          }

          return `+=${Math.max(ref.current.offsetHeight - window.innerHeight, window.innerHeight)}`;
        },
        pin: pinRef.current,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, ref);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="umano-manifesto">
      <div ref={pinRef} className="umano-manifesto-pin">
        <motion.div style={{ y, scale }} className="umano-manifesto-sticky">
          <span className="umano-manifesto-kicker">Infraestrutura criativa plugada</span>
          <h2>
            <span className="umano-manifesto-line">
              {firstLine.map((word, index) => (
                <ManifestWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={smoothProgress} />
              ))}
            </span>
            <span className="umano-manifesto-line">
              {secondLine.map((word, index) => (
                <ManifestWord
                  key={`${word}-${index + firstLine.length}`}
                  word={word}
                  index={index + firstLine.length}
                  total={words.length}
                  progress={smoothProgress}
                />
              ))}
            </span>
          </h2>
          <div className="umano-manifesto-progress" aria-hidden="true">
            <motion.i style={{ scaleX: progressScale }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RailIcon({ type }: { type: string }) {
  if (type === "queue") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6.5h14M5 12h10M5 17.5h7" />
        <path d="M17 14.5l2.5 2.5-2.5 2.5" />
      </svg>
    );
  }

  if (type === "system") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
      </svg>
    );
  }

  if (type === "production") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 17V7l10 5z" />
        <path d="M4 5h3M4 19h3M17 5h3M17 19h3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13.5l4 4L19 7" />
      <path d="M4.5 4.5h15v15h-15z" />
    </svg>
  );
}

function HowItWorksRail({ liteMode = false }: { liteMode?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  type RailStep = {
    icon: "queue" | "system" | "production" | "delivery";
    title: string;
    text: string;
    label: string;
    isSystem?: boolean;
    isRequest?: boolean;
    isProduction?: boolean;
    isDelivery?: boolean;
  };
  const steps: RailStep[] = [
    { icon: "queue", title: "Pedido entra", text: "Briefing simples, prioridade clara e tudo rastreado.", label: "trello-request", isRequest: true },
    { icon: "system", title: "Fluxo organiza", text: "A demanda vira card, prazo e fila operacional.", label: "ops-board", isSystem: true },
    { icon: "production", title: "Produção roda", text: "Design, vídeo e landing page seguem sem travar seu time.", label: "creative-sprint", isProduction: true },
    {
      icon: "delivery",
      title: "Entrega volta",
      text: "Arquivos prontos, revisão objetiva e histórico no Trello.",
      label: "delivery-pack",
      isDelivery: true,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track || reduceMotion || liteMode) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const deliveryCard = section.querySelector<HTMLElement>(".is-delivery-card");
      const deliveryScene = section.querySelector<HTMLElement>(".delivery-card-scene");
      const deliveryCopy = section.querySelector<HTMLElement>(".is-delivery-card .umano-rail-card-copy");
      const deliveryLogo = section.querySelector<HTMLElement>(".delivery-card-logo");
      const deliveryBg = section.querySelector<HTMLElement>(".delivery-card-bg");
      const deliveryGlow = section.querySelector<HTMLElement>(".delivery-card-glow");
      const railCopy = section.querySelector<HTMLElement>(".umano-rail-copy");
      const otherCards = gsap.utils.toArray<HTMLElement>(".umano-rail-card:not(.is-delivery-card)", section);

      if (!deliveryCard || !deliveryScene || !deliveryCopy || !deliveryLogo || !deliveryBg || !deliveryGlow || !railCopy) {
        return undefined;
      }

      const getCenterInTrack = (element: HTMLElement) => {
        let x = element.offsetLeft + element.offsetWidth / 2;
        let y = element.offsetTop + element.offsetHeight / 2;
        let parent = element.offsetParent as HTMLElement | null;

        while (parent && parent !== track) {
          x += parent.offsetLeft;
          y += parent.offsetTop;
          parent = parent.offsetParent as HTMLElement | null;
        }

        return { x, y };
      };
      const getFocusX = () => window.innerWidth / 2 - getCenterInTrack(deliveryScene).x;
      const getFocusDistance = () => Math.abs(getFocusX());
      const getRailOrigin = () => {
        const center = getCenterInTrack(deliveryScene);
        return `${center.x}px ${center.y}px`;
      };
      const getRailShiftY = () => {
        const rect = deliveryScene.getBoundingClientRect();
        return window.innerHeight * 0.5 - (rect.top + rect.height / 2);
      };
      const getRailScale = () => {
        const rect = deliveryScene.getBoundingClientRect();
        return Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.42;
      };
      const getLogoCenterX = () => {
        const rect = deliveryLogo.getBoundingClientRect();
        const correction = window.innerWidth / 2 - (rect.left + rect.width / 2) - 20;
        return correction / getRailScale();
      };
      const getLogoCenterY = () => {
        const rect = deliveryLogo.getBoundingClientRect();
        const correction = window.innerHeight / 2 - (rect.top + rect.height / 2);
        return correction / getRailScale();
      };
      const getLogoScale = () => {
        const targetWidth = Math.min(390, Math.max(220, window.innerWidth * 0.22));
        return targetWidth / deliveryLogo.getBoundingClientRect().width / getRailScale();
      };

      gsap.set([track, deliveryCard, deliveryScene, deliveryBg, deliveryLogo, deliveryGlow, railCopy, ...otherCards], {
        willChange: "transform, opacity, border-radius",
      });
      gsap.set(deliveryCard, { overflow: "hidden" });
      gsap.set(deliveryCard, { zIndex: 12 });
      gsap.set(otherCards, { zIndex: 0 });
      gsap.set(deliveryScene, { transformOrigin: "center center" });
      gsap.set(deliveryLogo, { xPercent: -50, yPercent: -50, transformOrigin: "center center" });
      gsap.set(deliveryGlow, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getFocusDistance() * 0.62 + window.innerHeight * 0.16}`,
          pin: true,
          scrub: 0.34,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: getFocusX, ease: "none", duration: 0.36 }, 0)
        .to([railCopy, ...otherCards], { opacity: 0, filter: "blur(6px)", ease: "none", duration: 0.1 }, 0.34)
        .set([railCopy, ...otherCards], { visibility: "hidden" }, 0.43)
        .to(deliveryCopy, { opacity: 0, yPercent: 24, filter: "blur(8px)", ease: "none", duration: 0.09 }, 0.34)
        .set(deliveryCopy, { visibility: "hidden" }, 0.43)
        .set(deliveryCard, { overflow: "visible" }, 0.4)
        .to(deliveryCard, {
          backgroundColor: "transparent",
          borderColor: "rgba(5, 5, 5, 0)",
          boxShadow: "none",
          ease: "none",
          duration: 0.12,
        }, 0.4)
        .to(section, { backgroundColor: "#050505", ease: "none", duration: 0.18 }, 0.38)
        .set(track, { transformOrigin: getRailOrigin }, 0.4)
        .to(track, {
          y: getRailShiftY,
          scale: getRailScale,
          ease: "none",
          duration: 0.28,
        }, 0.42)
        .to(deliveryLogo, { x: getLogoCenterX, y: getLogoCenterY, scale: getLogoScale, xPercent: -50, yPercent: -50, ease: "none", duration: 0.28 }, 0.42)
        .to(deliveryGlow, { opacity: 0.72, ease: "none", duration: 0.14 }, 0.46)
        .to(deliveryLogo, { y: () => getLogoCenterY() - window.innerHeight * 0.28, opacity: 0, ease: "none", duration: 0.14 }, 0.66);

      return () => tl.kill();
    });

    media.add("(max-width: 767px)", () => {
      const deliveryCard = section.querySelector<HTMLElement>(".is-delivery-card");
      const deliveryScene = section.querySelector<HTMLElement>(".delivery-card-scene");
      const deliveryCopy = section.querySelector<HTMLElement>(".is-delivery-card .umano-rail-card-copy");
      const deliveryLogo = section.querySelector<HTMLElement>(".delivery-card-logo");
      const deliveryBg = section.querySelector<HTMLElement>(".delivery-card-bg");
      const deliveryGlow = section.querySelector<HTMLElement>(".delivery-card-glow");
      const railCopy = section.querySelector<HTMLElement>(".umano-rail-copy");
      const otherCards = gsap.utils.toArray<HTMLElement>(".umano-rail-card:not(.is-delivery-card)", section);

      if (!deliveryCard || !deliveryScene || !deliveryCopy || !deliveryLogo || !deliveryBg || !deliveryGlow || !railCopy) {
        return undefined;
      }

      const getCenterInTrack = (element: HTMLElement) => {
        let x = element.offsetLeft + element.offsetWidth / 2;
        let y = element.offsetTop + element.offsetHeight / 2;
        let parent = element.offsetParent as HTMLElement | null;

        while (parent && parent !== track) {
          x += parent.offsetLeft;
          y += parent.offsetTop;
          parent = parent.offsetParent as HTMLElement | null;
        }

        return { x, y };
      };
      const getFocusX = () => {
        const center = getCenterInTrack(deliveryScene).x;
        return viewport.clientWidth / 2 - center;
      };
      const getFocusDistance = () => Math.abs(getFocusX());
      const getRailOrigin = () => {
        const center = getCenterInTrack(deliveryScene);
        return `${center.x}px ${center.y}px`;
      };
      const getRailShiftY = () => {
        const rect = deliveryScene.getBoundingClientRect();
        return window.innerHeight * 0.44 - (rect.top + rect.height / 2);
      };
      const getRailScale = () => {
        const rect = deliveryScene.getBoundingClientRect();
        return Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.03;
      };
      const getLogoCenterX = () => {
        const rect = deliveryLogo.getBoundingClientRect();
        return (window.innerWidth / 2 - (rect.left + rect.width / 2)) / getRailScale();
      };
      const getLogoCenterY = () => {
        const rect = deliveryLogo.getBoundingClientRect();
        return (window.innerHeight / 2 - (rect.top + rect.height / 2)) / getRailScale();
      };
      const getLogoScale = () => {
        const targetWidth = Math.min(220, Math.max(138, window.innerWidth * 0.38));
        return targetWidth / deliveryLogo.getBoundingClientRect().width / getRailScale();
      };

      gsap.set([track, deliveryCard, deliveryScene, deliveryBg, deliveryLogo, deliveryGlow, railCopy, ...otherCards], {
        willChange: "transform, opacity, border-radius",
      });
      gsap.set(deliveryCard, { overflow: "hidden", zIndex: 12 });
      gsap.set(otherCards, { zIndex: 0 });
      gsap.set(deliveryScene, { transformOrigin: "center center" });
      gsap.set(deliveryLogo, { xPercent: -50, yPercent: -50, transformOrigin: "center center" });
      gsap.set(deliveryGlow, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center 56%",
          end: () => `+=${getFocusDistance() * 0.58 + window.innerHeight * 0.34}`,
          pin: true,
          scrub: 0.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: getFocusX, ease: "none", duration: 0.34 }, 0)
        .to([railCopy, ...otherCards], { opacity: 0, filter: "blur(6px)", ease: "none", duration: 0.08 }, 0.26)
        .set([railCopy, ...otherCards], { visibility: "hidden" }, 0.34)
        .to(deliveryCopy, { opacity: 0, yPercent: 14, filter: "blur(8px)", ease: "none", duration: 0.06 }, 0.28)
        .set(deliveryCopy, { visibility: "hidden" }, 0.34)
        .set(deliveryCard, { overflow: "visible" }, 0.32)
        .to(deliveryCard, {
          backgroundColor: "transparent",
          borderColor: "rgba(5, 5, 5, 0)",
          boxShadow: "none",
          ease: "none",
          duration: 0.1,
        }, 0.32)
        .to(section, { backgroundColor: "#050505", ease: "none", duration: 0.14 }, 0.3)
        .set(track, { transformOrigin: getRailOrigin }, 0.34)
        .to(track, {
          y: getRailShiftY,
          scale: getRailScale,
          ease: "none",
          duration: 0.18,
        }, 0.36)
        .to(deliveryLogo, {
          x: getLogoCenterX,
          y: getLogoCenterY,
          scale: getLogoScale,
          xPercent: -50,
          yPercent: -50,
          ease: "none",
          duration: 0.18,
        }, 0.36)
        .to(deliveryGlow, { opacity: 0.72, ease: "none", duration: 0.1 }, 0.42)
        .to(deliveryLogo, { y: () => getLogoCenterY() - window.innerHeight * 0.12, opacity: 0, ease: "none", duration: 0.1 }, 0.56);

      return () => tl.kill();
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => media.revert();
  }, [liteMode, reduceMotion]);

  return (
    <section ref={sectionRef} id="processo" className="umano-rail-section">
      <div className="umano-rail-copy">
        <p>Como funciona</p>
        <h2>O operacional vira uma esteira criativa.</h2>
      </div>
      <div ref={viewportRef} className="umano-rail-viewport">
        <div ref={trackRef} className="umano-rail">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              whileHover={step.isDelivery ? undefined : { y: -8, rotate: index % 2 === 0 ? -0.45 : 0.45 }}
              className={`umano-rail-card ${step.isDelivery ? "is-delivery-card" : ""}`}
            >
              <div className={`umano-card-wire ${step.isDelivery ? "delivery-card-scene" : ""} ${step.isRequest ? "request-card-scene" : ""} ${step.isSystem ? "system-card-scene" : ""} ${step.isProduction ? "production-card-scene" : ""}`}>
                {step.isDelivery ? (
                  <>
                    <img src="/assets/cards/delivery/background.svg" alt="" className="delivery-card-bg" />
                    <div className="delivery-card-glow" aria-hidden="true" />
                    <img src="/assets/cards/delivery/logo.svg" alt="" className="delivery-card-logo" />
                  </>
                ) : step.isRequest ? (
                  <div className="request-bento-crop">
                    <iframe
                      src="/assets/cards/request/bento.html"
                      title="Bento Pedido entra"
                      className="request-bento-frame"
                      loading="lazy"
                      scrolling="no"
                    />
                  </div>
                ) : step.isSystem ? (
                  <div className="system-bento-crop">
                    <iframe
                      src="/assets/cards/ops-board/bento.html"
                      title="Bento Fluxo organiza"
                      className="system-bento-frame"
                      loading="lazy"
                      scrolling="no"
                    />
                  </div>
                ) : step.isProduction ? (
                  <div className="production-bento-crop">
                    <iframe
                      src="/assets/cards/production/bento.html"
                      title="Bento Produção roda"
                      className="production-bento-frame"
                      loading="lazy"
                      scrolling="no"
                    />
                  </div>
                ) : (
                  <span>{step.label}</span>
                )}
              </div>
              <div className="umano-rail-card-copy">
                <span className="umano-rail-icon">
                  <RailIcon type={step.icon} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="container-haki fixed left-1/2 top-7 z-50 flex -translate-x-1/2 items-center justify-between rounded-full border hairline bg-haki-black/76 px-4 py-3 backdrop-blur-2xl md:px-6">
      <a href="#top" className="flex items-center">
        <Image
          src="/brand/assets/haki-logo-transparent.png"
          alt="HAKI"
          width={1570}
          height={393}
          priority
          className="h-8 w-auto md:h-9"
        />
      </a>

      <nav className="hidden items-center gap-9 text-sm text-haki-muted lg:flex">
        {navItems.map(([label, href]) => (
          <a key={label} href={href} className="transition-colors duration-300 hover:text-haki-white">
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a href="#planos" className="hidden text-sm text-haki-muted transition-colors duration-300 hover:text-haki-white md:block">
          Entrar
        </a>
        <a
          href="#planos"
          className="group hidden items-center gap-3 rounded-md border border-haki-red/60 bg-haki-red px-5 py-3 text-sm font-semibold text-white shadow-red-soft transition duration-500 ease-mass hover:-translate-y-0.5 hover:bg-[#e60b2d] sm:inline-flex"
        >
          Comecar agora
          <span className="transition-transform duration-500 ease-mass group-hover:translate-x-1">{"->"}</span>
        </a>
      </div>
    </header>
  );
}

type MenuPathState = {
  openHidden: string;
  openBulge: string;
  openFull: string;
  closeStart: string;
  closeBulge: string;
  closeHidden: string;
};

type SplitInstance = {
  chars: Element[];
  revert: () => void;
};

type SplitTextConstructor = new (target: Element, vars: { type: string }) => SplitInstance;

type GsapTimeline = {
  to: (...args: unknown[]) => GsapTimeline;
  kill: () => void;
};

type GsapApi = {
  set: (...args: unknown[]) => void;
  to: (...args: unknown[]) => unknown;
  timeline: (...args: unknown[]) => GsapTimeline;
  registerPlugin: (...args: unknown[]) => void;
};

type GsapWindow = Window & {
  gsap?: GsapApi;
  SplitText?: SplitTextConstructor;
  MorphSVGPlugin?: unknown;
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

    if (existingScript?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existingScript || document.createElement("script");

    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));

    if (!existingScript) {
      document.head.appendChild(script);
    }
  });
}

function getMenuPathStates(svg: SVGSVGElement): MenuPathState {
  const box = svg.viewBox.baseVal;
  const left = box.x;
  const top = box.y;
  const width = box.width;
  const height = box.height;
  const right = left + width;
  const bottom = top + height;
  const cx = left + width / 2;

  return {
    openHidden: `M ${left} ${top} L ${right} ${top} L ${right} ${top} Q ${cx} ${top} ${left} ${top} Z`,
    openBulge: `M ${left} ${top} L ${right} ${top} L ${right} ${top + height * 0.34} Q ${cx} ${bottom + height * 0.34} ${left} ${top + height * 0.34} Z`,
    openFull: `M ${left} ${top} L ${right} ${top} L ${right} ${bottom} Q ${cx} ${bottom} ${left} ${bottom} Z`,
    closeStart: `M ${left} ${top} L ${right} ${top} L ${right} ${bottom} Q ${cx} ${bottom} ${left} ${bottom} Z`,
    closeBulge: `M ${left} ${top} L ${right} ${top} L ${right} ${bottom} Q ${cx} ${top - height * 0.34} ${left} ${bottom} Z`,
    closeHidden: `M ${left} ${bottom} L ${right} ${bottom} L ${right} ${bottom} Q ${cx} ${bottom} ${left} ${bottom} Z`,
  };
}

function FullscreenNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const menuLogoRef = useRef<HTMLAnchorElement | null>(null);
  const toggleMenuRef = useRef<HTMLSpanElement | null>(null);
  const toggleCloseRef = useRef<HTMLSpanElement | null>(null);
  const infoRefs = useRef<HTMLElement[]>([]);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const splitsRef = useRef<SplitInstance[]>([]);
  const gsapRef = useRef<GsapApi | null>(null);
  const timelineRef = useRef<GsapTimeline | null>(null);
  const pluginsReadyRef = useRef(false);
  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const reduceMotionRef = useRef(false);

  const setInfoRef = (node: HTMLElement | null) => {
    if (node && !infoRefs.current.includes(node)) {
      infoRefs.current.push(node);
    }
  };

  const setLinkRef = (node: HTMLAnchorElement | null) => {
    if (node && !linkRefs.current.includes(node)) {
      linkRefs.current.push(node);
    }
  };

  const setOpenState = useCallback((nextOpen: boolean) => {
    isOpenRef.current = nextOpen;
    setIsOpen(nextOpen);
  }, []);

  const resetMenuItems = useCallback(() => {
    const gsap = gsapRef.current;
    if (!gsap) {
      return;
    }

    const chars = splitsRef.current.flatMap((split) => split.chars);
    gsap.set(chars, { xPercent: 115, opacity: 0, willChange: "transform, opacity" });
    gsap.set(infoRefs.current, { y: 18, opacity: 0, willChange: "transform, opacity" });
    gsap.set(menuLogoRef.current, { y: -14, opacity: 0, willChange: "transform, opacity" });
    gsap.set(toggleMenuRef.current, { yPercent: 0, opacity: 1 });
    gsap.set(toggleCloseRef.current, { yPercent: 120, opacity: 0 });
  }, []);

  const closeMenu = useCallback(() => {
    const gsap = gsapRef.current;

    if (!gsap || !pluginsReadyRef.current || !svgRef.current || !pathRef.current || isAnimatingRef.current || !isOpenRef.current) {
      return;
    }

    const paths = getMenuPathStates(svgRef.current);
    const chars = splitsRef.current.flatMap((split) => split.chars);
    const reduceMotion = reduceMotionRef.current;

    isAnimatingRef.current = true;
    timelineRef.current?.kill();
    gsap.set(pathRef.current, { attr: { d: paths.closeStart } });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        resetMenuItems();
        gsap.set(pathRef.current, { attr: { d: paths.openHidden } });
        navRef.current?.classList.remove("is-open");
        setOpenState(false);
        isAnimatingRef.current = false;
      },
    });

    timelineRef.current = tl;

    if (reduceMotion) {
      tl.to([chars, infoRefs.current, menuLogoRef.current], { opacity: 0, duration: 0.16 }).to(
        pathRef.current,
        { morphSVG: paths.closeHidden, duration: 0.22 },
        0,
      );
      return;
    }

    tl.to(chars, { xPercent: 55, opacity: 0, duration: 0.28, stagger: { each: 0.006, from: "end" }, ease: "power2.in" }, 0)
      .to(infoRefs.current, { y: 18, opacity: 0, duration: 0.26, stagger: 0.025 }, 0)
      .to(menuLogoRef.current, { y: -14, opacity: 0, duration: 0.24 }, 0)
      .to(toggleMenuRef.current, { yPercent: 0, opacity: 1, duration: 0.28 }, 0)
      .to(toggleCloseRef.current, { yPercent: 120, opacity: 0, duration: 0.28 }, 0)
      .to(pathRef.current, { morphSVG: paths.closeBulge, duration: 0.52 }, 0.08)
      .to(pathRef.current, { morphSVG: paths.closeHidden, duration: 0.46, ease: "power4.inOut" });
  }, [resetMenuItems, setOpenState]);

  const openMenu = useCallback(() => {
    const gsap = gsapRef.current;

    if (!gsap || !pluginsReadyRef.current || !svgRef.current || !pathRef.current || isAnimatingRef.current || isOpenRef.current) {
      return;
    }

    const paths = getMenuPathStates(svgRef.current);
    const chars = splitsRef.current.flatMap((split) => split.chars);
    const reduceMotion = reduceMotionRef.current;

    isAnimatingRef.current = true;
    timelineRef.current?.kill();
    navRef.current?.classList.add("is-open");
    setOpenState(true);
    resetMenuItems();
    gsap.set(pathRef.current, { attr: { d: paths.openHidden } });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    timelineRef.current = tl;

    if (reduceMotion) {
      tl.to(pathRef.current, { morphSVG: paths.openFull, duration: 0.22 }).to(
        [chars, infoRefs.current, menuLogoRef.current],
        { opacity: 1, xPercent: 0, y: 0, duration: 0.18 },
      );
      return;
    }

    tl.to(pathRef.current, { morphSVG: paths.openBulge, duration: 0.55, ease: "power3.inOut" })
      .to(pathRef.current, { morphSVG: paths.openFull, duration: 0.48, ease: "power4.out" })
      .to(menuLogoRef.current, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, "-=0.28")
      .to(toggleMenuRef.current, { yPercent: -120, opacity: 0, duration: 0.32 }, "-=0.42")
      .to(toggleCloseRef.current, { yPercent: 0, opacity: 1, duration: 0.32 }, "<")
      .to(infoRefs.current, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" }, "-=0.2")
      .to(chars, { xPercent: 0, opacity: 1, duration: 1.15, stagger: 0.012, ease: "elastic.out(1, 0.72)" }, "-=0.56")
      .to(chars, { opacity: 1, duration: 0.28, stagger: 0.008, ease: "power1.out" }, "<");
  }, [resetMenuItems, setOpenState]);

  const toggleMenu = useCallback(() => {
    if (isOpenRef.current) {
      closeMenu();
      return;
    }

    openMenu();
  }, [closeMenu, openMenu]);

  const handleMenuLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();

      if (!isOpenRef.current) {
        window.location.hash = href;
        return;
      }

      closeMenu();
      window.setTimeout(() => {
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({ behavior: reduceMotionRef.current ? "auto" : "smooth", block: "start" });
          window.history.replaceState(null, "", href);
        }
      }, reduceMotionRef.current ? 80 : 620);
    },
    [closeMenu],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      reduceMotionRef.current = mediaQuery.matches;
    };

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    if (svgRef.current && pathRef.current) {
      pathRef.current.setAttribute("d", getMenuPathStates(svgRef.current).openHidden);
    }

    let isMounted = true;

    Promise.all([
      loadScript("/vendor/gsap/gsap.min.js"),
      loadScript("/vendor/gsap/SplitText.min.js"),
      loadScript("/vendor/gsap/MorphSVGPlugin.min.js"),
    ]).then(() => {
      if (!isMounted) {
        return;
      }

      const gsapWindow = window as GsapWindow;
      const gsap = gsapWindow.gsap;
      const SplitTextConstructor = gsapWindow.SplitText;
      const MorphSVGPlugin = gsapWindow.MorphSVGPlugin;

      if (!gsap || !SplitTextConstructor || !MorphSVGPlugin) {
        return;
      }

      gsap.registerPlugin(SplitTextConstructor, MorphSVGPlugin);
      gsapRef.current = gsap;
      splitsRef.current = linkRefs.current.map((link) => new SplitTextConstructor(link, { type: "chars" }));
      pluginsReadyRef.current = true;
      resetMenuItems();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      isMounted = false;
      timelineRef.current?.kill();
      splitsRef.current.forEach((split) => split.revert());
      splitsRef.current = [];
      gsapRef.current = null;
      pluginsReadyRef.current = false;
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", updateReducedMotion);
    };
  }, [closeMenu, resetMenuItems]);

  return (
    <nav ref={navRef} className="fullscreen-nav" aria-label="Navegação principal">
      <div className="container-haki fullscreen-nav-bar">
        <a href="#top" className="nav-logo" aria-label="Voltar para o inicio" onClick={closeMenu}>
          <Image
            src="/brand/assets/haki-logo-transparent.png"
            alt="HAKI"
            width={1570}
            height={393}
            priority
            className="h-8 w-auto md:h-9"
          />
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-controls="fullscreen-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={toggleMenu}
        >
          <span ref={toggleMenuRef}>menu</span>
          <span ref={toggleCloseRef} aria-hidden="true">
            close
          </span>
        </button>
      </div>

      <div id="fullscreen-menu" className="menu" aria-hidden={!isOpen}>
        <svg ref={svgRef} className="menu-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path ref={pathRef} className="menu-path" />
        </svg>

        <div className="menu-column-info" aria-label="Informacoes do Studio Haki">
          <p ref={setInfoRef}>Studio Haki</p>
          <p ref={setInfoRef}>Creative operational studio</p>
          <a ref={setInfoRef} href="mailto:contato@studiohaki.com">
            contato@studiohaki.com
          </a>
          <a ref={setInfoRef} href="#contato" onClick={closeMenu}>
            WhatsApp: falar com especialista
          </a>
          <p ref={setInfoRef}>Brasil / remoto</p>
        </div>

        <div className="menu-column-links" aria-label="Links principais">
          {navItems.map(([label, href], index) => (
            <a
              key={label}
              ref={setLinkRef}
              href={href}
              className="menu-link"
              onClick={(event) => handleMenuLinkClick(event, href)}
              style={{ ["--menu-link-index" as string]: index }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-16 grid-fade"
        animate={reduceMotion ? undefined : { opacity: [0.32, 0.54, 0.38], scale: [1, 1.018, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/assets/hero/grid-background.svg" alt="" fill className="object-cover opacity-70" />
      </motion.div>

      <motion.div
        className="absolute -inset-20"
        animate={reduceMotion ? undefined : { opacity: [0.42, 0.88, 0.48] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/assets/hero/red-glow.svg" alt="" fill className="object-cover mix-blend-screen" />
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded-2xl border hairline bg-white/[0.025] p-2 shadow-panel"
        animate={reduceMotion ? undefined : { y: [-6, 7, -6], scale: [0.995, 1.006, 0.995] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative aspect-[1920/800] w-full max-w-[calc(100vw-32px)] overflow-hidden rounded-xl bg-black md:max-w-none">
          <video
            className="h-full w-full object-cover"
            src="/videos/haki-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,transparent_0%,rgba(0,0,0,0.1)_42%,rgba(0,0,0,0.42)_100%)]" />
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const visualY = useTransform(scrollYProgress, [0, 0.3], [0, -46]);

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-36">
      <div className="container-haki grid min-h-[720px] items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal className="relative z-10">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-haki-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-haki-red shadow-[0_0_18px_rgba(255,15,51,0.8)]" />
            Infraestrutura criativa
          </div>
          <h1 className="max-w-[620px] text-balance text-[clamp(2.45rem,4.9vw,5.9rem)] font-medium leading-[0.94] tracking-[-0.07em] text-haki-white max-sm:max-w-[calc(100vw-40px)] max-sm:text-[2.05rem] max-sm:leading-[1.02] max-sm:tracking-[-0.055em]">
            Plugamos um estúdio criativo na sua operação.
          </h1>
          <p className="mt-6 max-w-[calc(100vw-32px)] text-base leading-7 text-haki-muted md:max-w-lg md:text-lg md:leading-8">
            Entregamos landing pages, vídeos e criativos com velocidade, consistência e previsibilidade
            para agências e negócios digitais que querem crescer.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              className="group inline-flex w-full items-center justify-center gap-4 rounded-md bg-haki-red px-5 py-4 text-sm font-semibold text-white shadow-red-soft transition duration-500 ease-mass hover:-translate-y-1 sm:w-auto sm:px-7 sm:text-base"
              href={specialistWhatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Plugar HAKI na operação
              <span className="transition-transform duration-500 group-hover:translate-x-1">{"->"}</span>
            </a>
            <a className="inline-flex w-full items-center justify-center rounded-md border hairline bg-white/[0.025] px-5 py-4 text-sm font-semibold text-haki-muted transition duration-500 ease-mass hover:-translate-y-1 hover:text-haki-white sm:w-auto sm:px-7 sm:text-base" href="#processo">
              Ver como funciona
            </a>
          </div>
          <div className="mt-6 flex max-w-[calc(100vw-32px)] flex-wrap gap-x-5 gap-y-3 font-mono text-xs text-haki-muted">
            {["Rapido", "Escalavel", "Previsivel", "Sem burocracia"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <i className="h-1.5 w-1.5 rounded-full bg-haki-red" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <motion.div style={{ y: visualY }} className="relative z-0">
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <Reveal className="container-haki">
      <div className="grid grid-cols-2 border hairline bg-white/[0.018] md:grid-cols-3 xl:grid-cols-6">
        {metrics.map(([value, label]) => (
          <div key={label} className="border-b border-r border-white/[0.08] p-6 last:border-r-0 xl:border-b-0">
            <p className="text-3xl font-semibold tracking-[-0.05em] text-haki-white">{value}</p>
            <span className="mt-1 block text-sm text-haki-muted">{label}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function ClientIcon({ type }: { type: string }) {
  const common = "h-5 w-5 shrink-0 text-haki-muted/80";

  if (type === "frame") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4.5H5.8A1.8 1.8 0 0 0 4 6.3v11.4a1.8 1.8 0 0 0 1.8 1.8h11.4a1.8 1.8 0 0 0 1.8-1.8v-1.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 4.5h5.5L19 10v4.5H8v-10Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13.5 5v5H19" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (type === "orbit") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4.7 9.6c2.9 1.8 7.7 3.2 14.6 4.8M4.7 14.4c2.9-1.8 7.7-3.2 14.6-4.8" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "signal") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 17.5 12 4.5l7.5 13" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8.3 13.2h7.4M6.7 16h10.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "north") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === "flow") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="m8.5 8.5 7 7M15.5 8.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4.5v15M4.5 12h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m8.2 7.9 7.6 8.2M15.8 7.9l-7.6 8.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ClientsBar() {
  return (
    <Reveal className="container-haki">
      <section className="overflow-hidden border-y border-white/[0.07] bg-white/[0.012]">
        <div className="flex flex-col gap-6 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-haki-muted/70">
            Trusted by agencies and infoproduct businesses
          </p>

          <div className="grid min-w-0 grid-cols-2 gap-x-7 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-10">
            {clients.map(([name, icon], index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.75, delay: 0.08 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="group flex items-center gap-2.5 text-sm font-medium tracking-[-0.03em] text-haki-muted/75 transition duration-500 hover:text-haki-white"
              >
                <ClientIcon type={icon} />
                <span>{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function Workflow() {
  return (
    <section id="solucoes" className="container-haki grid gap-12 border-b border-white/[0.08] py-28 lg:grid-cols-[0.55fr_1.45fr]">
      <Reveal>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Feito para escalar</p>
        <h2 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-6xl">
          Saidas criativas que funcionam como seu time interno.
        </h2>
        <p className="mt-6 max-w-md leading-7 text-haki-muted">
          Integramos seus fluxos e entregamos criacoes de alto volume com qualidade e previsibilidade.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-haki-muted">
          {["Demandas ilimitadas", "Entregas diárias", "Fluxo previsível", "Acompanhamento no Trello"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-haki-red" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="grid min-w-0 gap-4 overflow-x-auto rounded-xl border hairline bg-white/[0.018] p-4 lg:grid-cols-4">
          {boardColumns.map((column) => (
            <div key={column.title} className="min-w-[220px] rounded-lg border border-white/[0.07] bg-black/35 p-4">
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-haki-muted">
                {column.title}
                <span className="rounded bg-white/[0.06] px-2 py-1">{column.count}</span>
              </div>
              <div className="space-y-3">
                {column.cards.map((card) => (
                  <motion.div
                    key={card}
                    whileHover={{ y: -4, borderColor: "rgba(255,15,51,0.42)" }}
                    className="rounded-md border hairline bg-haki-ink p-4 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-haki-white">{card}</strong>
                      <span className="h-2.5 w-2.5 rounded-full bg-haki-red shadow-[0_0_16px_rgba(255,15,51,0.7)]" />
                    </div>
                    <p className="mt-1 text-xs text-haki-muted">Cliente {card.at(0)}</p>
                  </motion.div>
                ))}
                <button className="pt-2 text-left text-xs text-haki-muted">+ Adicionar card</button>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ProcessIcon({ type }: { type: string }) {
  const common = "h-9 w-9 text-haki-white";

  if (type === "request") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="9" y="6.5" width="22" height="27" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 6.5V33.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 13H26M20 19H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="13" cy="13" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "progress") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M8 12.5C8 9.46 10.46 7 13.5 7H26.5C29.54 7 32 9.46 32 12.5V21.5C32 24.54 29.54 27 26.5 27H18L11.5 32V27.08C9.49 26.55 8 24.72 8 22.55V12.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 19L18 16L22 18L27 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "review") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 11.5V20L25.5 23.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31.5 12.5L34 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="9" y="8" width="22" height="24" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 14H26V26H14V14Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 20.5L19.2 23.2L24.5 17.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 14H9M31 14H34M6 26H9M31 26H34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Process() {
  return (
    <section id="processo" className="container-haki grid gap-12 border-b border-white/[0.08] py-28 lg:grid-cols-[0.55fr_1.45fr]">
      <Reveal>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Nosso processo</p>
        <h2 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-6xl">
          Um sistema para fluxo criativo previsível.
        </h2>
        <p className="mt-6 max-w-md leading-7 text-haki-muted">
          Do pedido a entrega, tudo rastreado, organizado e otimizado para maxima performance.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-4 md:gap-8">
        {processSteps.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.12}>
            <motion.article
              whileHover={{ y: -7, borderColor: "rgba(255,15,51,0.52)" }}
              className={`group relative min-h-[292px] rounded-xl border bg-white/[0.025] p-6 shadow-panel transition-colors ${
                index === processSteps.length - 1 ? "border-haki-red/60 shadow-red-soft" : "hairline"
              }`}
            >
              {index < processSteps.length - 1 ? (
                <motion.span
                  className="pointer-events-none absolute -right-7 top-[86px] hidden h-px w-7 bg-haki-red md:block"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: 0.28 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformOrigin: "left" }}
                >
                  <i className="absolute -right-1 -top-[3px] h-2 w-2 rotate-45 border-r border-t border-haki-red" />
                </motion.span>
              ) : null}

              <div className="mb-14 flex items-start justify-between">
                <span className="font-mono text-xs text-haki-red">{item.step}</span>
                <motion.span
                  className={`grid h-14 w-14 place-items-center rounded-xl border transition-colors duration-500 ${
                    index === processSteps.length - 1
                      ? "border-haki-red/70 bg-haki-red/10 text-haki-red shadow-red-soft"
                      : "hairline bg-white/[0.025] text-haki-white group-hover:border-haki-red/45 group-hover:text-haki-red"
                  }`}
                  initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.72, delay: 0.18 + index * 0.12, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ProcessIcon type={item.icon} />
                </motion.span>
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-haki-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-haki-muted">{item.text}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section id="planos" className="container-haki border-b border-white/[0.08] py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Planos recorrentes</p>
        <h2 className="mx-auto text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-6xl">
          Planos que escalam com a sua operação.
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-7 text-haki-muted">
          Escolha o plano ideal para o volume de demandas da sua agência ou negócio digital.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 0.07}>
            <motion.article
              whileHover={{ y: -8 }}
              className={`flex min-h-[460px] flex-col rounded-xl border p-6 ${
                plan.featured ? "border-haki-red/65 bg-haki-red/10 shadow-red-soft" : "hairline bg-white/[0.025]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.05em] text-haki-white">{plan.name}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-haki-muted">{plan.description}</p>
                </div>
                {plan.tag ? (
                  <span className="rounded bg-haki-red px-2 py-1 font-mono text-[9px] uppercase text-white">
                    {plan.tag}
                  </span>
                ) : null}
              </div>
              <div className="mt-10">
                <span className="text-sm text-haki-muted">R$ </span>
                <strong className="text-5xl font-medium tracking-[-0.06em] text-haki-white">
                  {plan.price.replace("R$ ", "")}
                </strong>
                {plan.price.includes("R$") ? <span className="text-haki-muted">/mes</span> : null}
              </div>
              <ul className="mt-8 space-y-3 text-sm text-haki-muted">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-haki-red">+</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a className={`mt-auto inline-flex justify-center rounded-md px-5 py-3 text-sm font-semibold transition duration-500 ease-mass hover:-translate-y-1 ${
                plan.featured ? "bg-haki-red text-white" : "border hairline text-haki-white"
              }`} href="#cta">
                {plan.name === "Enterprise" ? "Falar com especialista" : "Escolher plano"}
              </a>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const faqItems = [
  ["Como a HAKI entra na minha operação?", "Você assina o plano, entra no Trello e passa a solicitar demandas por cards com prazo, briefing e status claros."],
  ["As entregas são realmente previsíveis?", "A proposta é manter uma esteira recorrente com limite de demandas, prioridade e prazo combinado para não quebrar seu fluxo."],
  ["Consigo usar em lançamentos?", "Sim. A HAKI funciona bem para páginas, criativos, cortes e peças de suporte durante aquecimento, abertura e carrinho."],
  ["E se eu já tiver designer interno?", "A HAKI pode entrar como extensão operacional para tirar gargalo, absorver volume e manter seu time focado no que é mais estratégico."],
];

const caseTabs = {
  "Landing pages": [
    ["case-image-01", "Launch OS", "Página de vendas para lançamento com estrutura de conversão."],
    ["case-image-02", "Expert Authority", "Landing institucional para expert com prova e oferta clara."],
    ["case-video-01", "VSL Page", "Espaço para vídeo + página de conversão em uma experiência única."],
  ],
  "Criativos": [
    ["case-image-03", "Ads Sprint", "Pacote visual para testar ângulos de oferta em tráfego pago."],
    ["case-video-02", "Reels Engine", "Linha visual para cortes, anúncios e conteúdo diário."],
    ["case-image-04", "Launch Kit", "Peças de aquecimento, abertura e remarketing."],
  ],
  "Operação": [
    ["hero-dashboard-preview", "Trello Flow", "Quadro operacional com backlog, produção, revisão e entrega."],
    ["founder-photo", "Founder Layer", "Espaço para foto do Erick ou bastidores do estúdio."],
    ["contact-bg", "Client Room", "Espaço visual para depoimentos, reuniões ou prints de entrega."],
  ],
};

const deliveryCases = [
  {
    slug: "upshare",
    title: "Upshare",
    description: "Cliente desde 2026. Agencia dos Estados Unidos que atende restaurantes com conteudo, social e presenca digital recorrente.",
    marker: "US / RESTAURANTES",
    theme: "upshare",
    image: "/assets/cases/upshare-main.svg",
  },
  {
    slug: "vibefor",
    title: "Vibefor",
    description: "Cliente desde 2026. Agencia focada em medicos, com criativos, presenca digital e materiais para captacao de pacientes.",
    marker: "MEDICOS / SAUDE",
    theme: "vibefor",
    image: "/assets/cases/vibefor-main.svg",
  },
  {
    slug: "inplexo",
    title: "Inplexo",
    description: "Cliente desde 2026. Projeto focado em landing page, com estrutura visual para apresentar oferta, prova e conversao.",
    marker: "LANDING PAGE",
    theme: "inplexo",
    image: "/assets/cases/inplexo-main.svg",
  },
];
function PlanIncluded({ planName, items }: { planName: string; items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`umano-plan-included ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="umano-plan-included-trigger"
        aria-expanded={isOpen}
        aria-controls={`included-${planName}`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>Incluso</span>
        <em>{isOpen ? "Ocultar" : "Ver itens"}</em>
        <i aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`included-${planName}`}
            className="umano-plan-included-panel"
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function UmanoPlans() {
  return (
    <section id="planos" className="umano-pricing-section">
      <Reveal className="umano-section-header">
        <p>Planos recorrentes</p>
        <h2>Escolha o tamanho da infraestrutura.</h2>
        <span>Planos para agências e infoprodutos que precisam de volume sem criar caos operacional.</span>
      </Reveal>

      <div className="umano-pricing-grid">
        {plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -10, rotate: index === 1 ? 0 : index % 2 === 0 ? -0.35 : 0.35 }}
              className={`umano-price-card ${plan.featured ? "is-featured" : ""}`}
            >
              <div className="umano-price-card-top">
                {plan.tag ? <em>{plan.tag}</em> : null}
              </div>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <PlanIncluded planName={plan.name} items={plan.included} />
              <strong>{plan.price}</strong>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href={briefingHref(plan.name)}>{plan.name === "Enterprise" ? "Falar com especialista" : "Escolher plano"}</a>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function UmanoCases({ liteMode = false }: { liteMode?: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [caseCursor, setCaseCursor] = useState({ x: 0, y: 0, visible: false });
  const reduceMotion = useReducedMotion();

  const showCaseCursor = useCallback((event: MouseEvent) => {
    setCaseCursor({ x: event.clientX, y: event.clientY, visible: true });
  }, []);

  const hideCaseCursor = useCallback(() => {
    setCaseCursor((cursor) => ({ ...cursor, visible: false }));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track || reduceMotion || liteMode) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const updateEdgeSpacer = () => {
        const firstSlide = track.querySelector<HTMLElement>(".umano-case-slide");
        if (!firstSlide) {
          return;
        }

        const viewportStyle = window.getComputedStyle(viewport);
        const viewportPaddingLeft = Number.parseFloat(viewportStyle.paddingLeft) || 0;
        const spacer = Math.max(24, viewport.clientWidth / 2 - viewportPaddingLeft - firstSlide.offsetWidth / 2);
        track.style.setProperty("--case-edge-spacer", `${spacer}px`);
      };
      const getDistance = () => {
        updateEdgeSpacer();
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };
      let lastDispatchedIndex = -1;
      const dispatchRailMode = (active: boolean) => {
        window.dispatchEvent(new CustomEvent("haki:cases-rail", { detail: { active, count: deliveryCases.length } }));
      };
      const updateActiveCase = (progress = 0) => {
        const x = -getDistance() * progress;
        const viewportCenter = viewport.clientWidth / 2;
        const slides = Array.from(track.querySelectorAll<HTMLElement>(".umano-case-slide"));
        let nextIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const center = slide.offsetLeft + slide.offsetWidth / 2 + x;
          const distance = Math.abs(center - viewportCenter);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nextIndex = index;
          }
        });

        setActiveCase(nextIndex);
        if (lastDispatchedIndex !== nextIndex) {
          lastDispatchedIndex = nextIndex;
          window.dispatchEvent(new CustomEvent("haki:cases-index", { detail: { index: nextIndex } }));
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: viewport,
          start: "top 16%",
          end: () => `+=${getDistance() + window.innerHeight * 0.7}`,
          pin: true,
          scrub: 0.34,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => dispatchRailMode(true),
          onEnterBack: () => dispatchRailMode(true),
          onLeave: () => dispatchRailMode(false),
          onLeaveBack: () => dispatchRailMode(false),
          onRefresh: (self) => {
            updateEdgeSpacer();
            updateActiveCase(self.progress);
          },
          onUpdate: (self) => updateActiveCase(self.progress),
        },
      });

      tl.to(track, { x: () => -getDistance(), ease: "none", duration: 1 }, 0);
      updateActiveCase(0);

      return () => {
        dispatchRailMode(false);
        tl.kill();
      };
    });

    media.add("(max-width: 767px)", () => {
      const updateEdgeSpacer = () => {
        const firstSlide = track.querySelector<HTMLElement>(".umano-case-slide");
        if (!firstSlide) {
          return;
        }

        const spacer = Math.max(20, viewport.clientWidth / 2 - firstSlide.offsetWidth / 2);
        track.style.setProperty("--case-edge-spacer", `${spacer}px`);
      };
      const getDistance = () => {
        updateEdgeSpacer();
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };
      let lastDispatchedIndex = -1;
      const dispatchRailMode = (active: boolean) => {
        window.dispatchEvent(new CustomEvent("haki:cases-rail", { detail: { active, count: deliveryCases.length } }));
      };
      const updateActiveCase = (progress = 0) => {
        const x = -getDistance() * progress;
        const viewportCenter = viewport.clientWidth / 2;
        const slides = Array.from(track.querySelectorAll<HTMLElement>(".umano-case-slide"));
        let nextIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const center = slide.offsetLeft + slide.offsetWidth / 2 + x;
          const distance = Math.abs(center - viewportCenter);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nextIndex = index;
          }
        });

        setActiveCase(nextIndex);
        if (lastDispatchedIndex !== nextIndex) {
          lastDispatchedIndex = nextIndex;
          window.dispatchEvent(new CustomEvent("haki:cases-index", { detail: { index: nextIndex } }));
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: viewport,
          start: "center center",
          end: () => `+=${getDistance() + window.innerHeight * 0.42}`,
          pin: true,
          scrub: 0.28,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => dispatchRailMode(true),
          onEnterBack: () => dispatchRailMode(true),
          onLeave: () => dispatchRailMode(false),
          onLeaveBack: () => dispatchRailMode(false),
          onRefresh: (self) => {
            updateEdgeSpacer();
            updateActiveCase(self.progress);
          },
          onUpdate: (self) => updateActiveCase(self.progress),
        },
      });

      tl.to(track, { x: () => -getDistance(), ease: "none", duration: 1 }, 0);
      updateActiveCase(0);

      return () => {
        dispatchRailMode(false);
        tl.kill();
      };
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => media.revert();
  }, [liteMode, reduceMotion]);

  return (
    <section ref={sectionRef} id="cases" className="umano-cases-section">
      <Reveal className="umano-cases-hero">
        <h2>Conheça<br />nossa entrega.</h2>
        <p>
          Veja como a HAKI organiza landing pages, criativos e vídeos em um fluxo visual claro para a sua operação.
        </p>
      </Reveal>

      <div ref={viewportRef} className="umano-case-carousel-viewport">
        <div ref={trackRef} className="umano-case-carousel-track">
          <span className="umano-case-carousel-spacer" aria-hidden="true" />
          {deliveryCases.map((project, index) => (
            <motion.a
              key={project.slug}
              href={`/cases/${project.slug}`}
              className={`umano-case-slide is-${project.theme} ${activeCase === index ? "is-active" : "is-muted"}`}
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={showCaseCursor}
              onMouseMove={showCaseCursor}
              onMouseLeave={hideCaseCursor}
            >
              <div className="umano-case-slide-media" aria-hidden="true">
                <span>{project.marker}</span>
                {"image" in project ? (
                  <Image
                    className="umano-case-main-art"
                    src={project.image}
                    alt=""
                    sizes="(max-width: 767px) 88vw, 36vw"
                    width={1633}
                    height={1846}
                  />
                ) : (
                  <>
                    <div className="umano-case-mosaic">
                      {Array.from({ length: 10 }).map((_, tileIndex) => (
                        <i key={tileIndex} />
                      ))}
                    </div>
                    <Image src="/brand/assets/haki-symbol-transparent.png" alt="" width={460} height={393} />
                  </>
                )}
              </div>
              <div className="umano-case-slide-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="umano-case-hover-cue" aria-hidden="true">
                <span>Abrir</span>
                <Image
                  src="/assets/case-open-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="umano-case-open-icon"
                />
              </span>
            </motion.a>
          ))}
          <span className="umano-case-carousel-spacer" aria-hidden="true" />
        </div>
      </div>

      <motion.div
        className="umano-case-cursor"
        aria-hidden="true"
        animate={{
          x: caseCursor.x,
          y: caseCursor.y,
          opacity: caseCursor.visible ? 1 : 0,
          scale: caseCursor.visible ? 1 : 0.84,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.55 }}
      >
        <span>Abrir</span>
        <Image
          src="/assets/case-open-arrow.svg"
          alt=""
          width={16}
          height={16}
          className="umano-case-open-icon"
        />
      </motion.div>
    </section>
  );
}

function WaveLensBridge({ disabled = false }: { disabled?: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sendWavePointer = useCallback((event: MouseEvent<HTMLElement>, active = true) => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;

    const rect = event.currentTarget.getBoundingClientRect();
    frame.postMessage(
      {
        type: "haki-wave-pointer",
        active,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        width: rect.width,
        height: rect.height,
      },
      window.location.origin,
    );
  }, []);

  const releaseWavePointer = useCallback((event: MouseEvent<HTMLElement>) => {
    sendWavePointer(event, false);
  }, [sendWavePointer]);

  if (disabled) {
    return null;
  }

  return (
    <section className="wave-lens-bridge" aria-label="Transição visual HAKI">
      <div
        className="wave-lens-hitbox"
        onPointerEnter={sendWavePointer}
        onPointerMove={sendWavePointer}
        onPointerLeave={releaseWavePointer}
      />
      <iframe ref={iframeRef} src="/assets/wave-lens.html" title="Wave Lens" loading="lazy" scrolling="no" />
    </section>
  );
}

function UmanoFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="umano-faq-section" id="faq">
      <Reveal className="umano-section-header">
        <p>FAQ</p>
        <h2>Perguntas antes de plugar.</h2>
      </Reveal>

      <div className="umano-faq-list">
        {faqItems.map(([question, answer], index) => (
          <motion.button
            key={question}
            type="button"
            className={`umano-faq-item ${openIndex === index ? "is-open" : ""}`}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            whileHover={{ x: 8 }}
          >
            <span>{openIndex === index ? "-" : "+"}</span>
            <strong>{question}</strong>
            <AnimatePresence>
              {openIndex === index ? (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
                >
                  {answer}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function UmanoFinalStack({ liteMode = false }: { liteMode?: boolean }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const panel = panelRef.current;

    if (!stage || !panel || reduceMotion || liteMode) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(panel, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          transformOrigin: "top center",
          willChange: "transform, clip-path, border-radius, box-shadow",
        });

        gsap.to(panel, {
          y: () => -Math.min(panel.offsetHeight * 0.92, window.innerHeight * 1.08),
          clipPath: "inset(0% 2.4% 0% 2.4% round 0px 0px 58px 58px)",
          borderBottomLeftRadius: 58,
          borderBottomRightRadius: 58,
          boxShadow: "0 34px 130px rgba(0, 0, 0, 0.58)",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: "+=720",
            pin: panel,
            pinSpacing: false,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, stage);

      return () => ctx.revert();
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => media.revert();
  }, [liteMode, reduceMotion]);

  return (
    <div ref={stageRef} className="umano-final-stack">
      <div ref={panelRef} className="umano-final-panel">
        <UmanoFAQ />
      </div>
      <UmanoFooter />
    </div>
  );
}

function UmanoContact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || reduceMotion) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(section, {
          transformOrigin: "top center",
          willChange: "transform, border-radius, box-shadow",
        });

        gsap.to(section, {
          scale: 0.92,
          y: -72,
          borderBottomLeftRadius: 42,
          borderBottomRightRadius: 42,
          boxShadow: "0 26px 110px rgba(0, 0, 0, 0.5)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=620",
            pin: true,
            pinSpacing: false,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => media.revert();
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} id="contato" className="umano-contact-section">
      <div className="umano-contact-card" data-slot="contact-bg">
        <div className="umano-contact-orbit" />
        <Reveal className="umano-contact-content">
          <p>Pronto para escalar?</p>
          <h2>Plugue a HAKI na sua operação e comece com fluxo claro.</h2>
          <span>Sem formulário. Chame direto e a gente entende volume, gargalo e melhor plano.</span>
          <a href={specialistWhatsappHref} target="_blank" rel="noreferrer">
            Falar com Erick agora
          </a>
        </Reveal>

        <motion.div className="umano-founder-placeholder" data-slot="founder-photo" whileHover={{ y: -8 }}>
          <span>founder-photo</span>
          <strong>Erick Filho</strong>
          <p>Espaço para foto, vídeo curto ou bastidor do Studio Haki.</p>
        </motion.div>
      </div>
    </section>
  );
}

function UmanoFooter() {
  return (
    <footer className="umano-footer">
      <div className="umano-footer-grid">
        <div className="umano-footer-brand">
          <Image src="/brand/assets/haki-logo-transparent.png" alt="HAKI" width={1570} height={393} />
          <p>Infraestrutura criativa para agências e negócios digitais.</p>
        </div>
        <div className="umano-footer-links">
          {[
            ["Soluções", "#solucoes"],
            ["Processo", "#processo"],
            ["Planos", "#planos"],
            ["Cases", "#cases"],
            ["FAQ", "#faq"],
            ["Contato", "#planos"],
          ].map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <a className="umano-footer-cta" href={specialistWhatsappHref} target="_blank" rel="noreferrer">
          Falar no WhatsApp
        </a>
      </div>
      <strong>studiohaki.com</strong>
      <div className="umano-footer-bottom">
        <span>© 2026 HAKI Studio.</span>
        <span>Termos de uso · Privacidade</span>
      </div>
    </footer>
  );
}

function About() {
  const aboutBullets = [
    ["Operação", "Eu entro como uma extensão criativa da sua agência, sem criar mais uma camada de gestão."],
    ["Velocidade", "Meu foco é manter a demanda andando com prazo claro, prioridade e previsibilidade."],
    ["Parceria", "Não busco relação transacional. A ideia é construir um fluxo onde os dois lados crescem."],
  ];

  return (
    <section id="sobre" className="container-haki border-b border-white/[0.08] py-28">
      <div className="grid items-center gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <div className="relative min-h-[540px] overflow-hidden rounded-2xl border hairline bg-white/[0.018] p-6 shadow-panel">
            <Image src="/assets/hero/grid-background.svg" alt="" fill className="object-cover opacity-35" />
            <Image src="/assets/hero/red-glow.svg" alt="" width={760} height={760} className="absolute -left-28 -top-24 w-[82%] opacity-70 mix-blend-screen" />

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border hairline bg-black/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-haki-muted backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-haki-red shadow-[0_0_16px_rgba(255,15,51,0.8)]" />
              Founder profile
            </div>

            <div className="absolute inset-x-6 bottom-6 overflow-hidden rounded-xl border hairline bg-black/55 p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-haki-red">Erick Filho</p>
                  <h3 className="mt-3 text-4xl font-medium leading-none tracking-[-0.07em] text-haki-white md:text-5xl">
                    Web designer e operador criativo.
                  </h3>
                </div>
                <Image src="/brand/assets/haki-symbol-transparent.png" alt="" width={460} height={393} className="w-16 shrink-0 opacity-90" />
              </div>
              <div className="mt-10 grid grid-cols-3 gap-2">
                {["LP", "ADS", "VSL"].map((item) => (
                  <div key={item} className="rounded-md border hairline bg-white/[0.035] px-3 py-4 text-center font-mono text-xs text-haki-muted">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-2xl border hairline bg-white/[0.018] p-8 md:p-12">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Sobre nós</p>
            <h2 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-6xl">
              Por trás da HAKI está Erick Filho.
            </h2>
            <p className="mt-7 text-lg leading-8 text-haki-muted">
              Eu criei a HAKI para plugar um estúdio criativo dentro da operação de agências e negócios digitais que precisam de consistência, prazo e execução sem depender de freelancers soltos.
            </p>
            <p className="mt-5 leading-7 text-haki-muted">
              Minha função é transformar demanda em fluxo: landing pages, criativos e vídeos organizados em uma rotina clara, com acompanhamento e entregas que não quebram o ritmo do seu time.
            </p>

            <div className="mt-10 space-y-4">
              {aboutBullets.map(([title, text]) => (
                <div key={title} className="flex gap-4 rounded-xl border hairline bg-black/28 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-haki-red/45 bg-haki-red/10 text-haki-red">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 12.5 10.1 16.5 18.5 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.04em] text-haki-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-haki-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const [activeTab, setActiveTab] = useState<keyof typeof portfolio>("Landing pages");
  const items = portfolio[activeTab];

  return (
    <section id="cases" className="container-haki border-b border-white/[0.08] py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Portfolio</p>
        <h2 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-6xl">
          Trabalhos separados por tipo de demanda.
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-7 text-haki-muted">
          Por enquanto, com cases genéricos. Depois, substituímos pelos seus projetos reais e pelos designs finais.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-full border hairline bg-white/[0.018] p-2">
          {(Object.keys(portfolio) as Array<keyof typeof portfolio>).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                activeTab === tab
                  ? "bg-haki-red text-white shadow-red-soft"
                  : "text-haki-muted hover:bg-white/[0.04] hover:text-haki-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.62, ease: [0.23, 1, 0.32, 1] }}
        className="mt-12 grid gap-4 md:grid-cols-3"
      >
        {items.map(([title, description, tag], index) => (
          <motion.article
            key={title}
            whileHover={{ y: -8, borderColor: "rgba(255,15,51,0.5)" }}
            transition={{ duration: 0.35 }}
            className="group overflow-hidden rounded-xl border hairline bg-white/[0.022] transition-colors"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.08] bg-haki-ink">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,15,51,0.24),transparent_36%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_30%)]" />
              <div className="absolute inset-x-6 bottom-6 rounded-lg border hairline bg-black/45 p-4 backdrop-blur-xl">
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-haki-muted">Case 0{index + 1}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-haki-red shadow-[0_0_18px_rgba(255,15,51,0.75)]" />
                </div>
                <span className="text-2xl font-medium tracking-[-0.06em] text-haki-white">{title}</span>
              </div>
            </div>
            <div className="p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-haki-red">{tag}</span>
              <p className="mt-4 text-sm leading-6 text-haki-muted">{description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="container-haki border-b border-white/[0.08] py-28">
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-haki-red/35 bg-[radial-gradient(circle_at_50%_0%,rgba(255,15,51,0.2),transparent_34%),rgba(255,255,255,0.018)] px-6 py-12 text-center shadow-red-soft md:px-14 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Contato</p>
            <h2 className="mx-auto text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-7xl">
              Quer plugar a HAKI na sua operação?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-7 text-haki-muted">
              Chame para entender qual plano faz sentido para sua demanda, volume e momento da operação.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              ["WhatsApp", specialistWhatsappLabel, specialistWhatsappHref],
              ["Email", "contato@studiohaki.com", "mailto:contato@studiohaki.com"],
              ["Briefing", "Enviar demanda inicial", briefingHref()],
            ].map(([label, value, href], index) => (
              <a
                key={label}
                href={href}
                target={label === "WhatsApp" ? "_blank" : undefined}
                rel={label === "WhatsApp" ? "noreferrer" : undefined}
                className={`group rounded-xl border p-6 transition duration-500 hover:-translate-y-1 ${
                  index === 0 ? "border-haki-red/55 bg-haki-red/10" : "hairline bg-black/30"
                }`}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-haki-red">{label}</span>
                <strong className="mx-auto mt-8 block max-w-[13rem] text-xl font-medium leading-tight tracking-[-0.04em] text-haki-white">
                  {value}
                </strong>
                <span className="mx-auto mt-8 grid h-10 w-10 place-items-center rounded-full border border-haki-red/40 text-haki-red transition-transform duration-500 group-hover:translate-x-1">
                  {"->"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ContactScreen() {
  return (
    <section id="contato" className="border-b border-white/[0.08] bg-[#2d2836] px-4 py-16 md:px-8 md:py-20">
      <div>
        <div className="relative mx-auto min-h-[740px] max-w-[1760px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#030306] px-5 pb-12 pt-6 text-center shadow-[0_34px_120px_rgba(0,0,0,0.48)] md:min-h-[860px] md:px-20 md:pb-20 md:pt-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.055),transparent_25%),radial-gradient(circle_at_50%_82%,rgba(95,82,122,0.32),transparent_34%),linear-gradient(90deg,transparent_0,rgba(255,255,255,0.04)_49.8%,rgba(255,255,255,0.04)_50.2%,transparent_50.5%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[52%] h-[920px] w-[1680px] -translate-x-1/2 rounded-[50%] border border-white/[0.09] bg-[radial-gradient(circle_at_50%_10%,transparent_0%,transparent_42%,rgba(48,43,58,0.36)_74%,rgba(48,43,58,0.62)_100%)] md:top-[48%]" />
          <div className="pointer-events-none absolute inset-x-[15%] top-[86px] hidden h-[420px] bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:160px_100%] opacity-35 md:block" />
          <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:74px_74px] [mask-image:radial-gradient(circle_at_24%_20%,#000_0%,transparent_28%)]" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <Image src="/brand/assets/haki-logo-transparent.png" alt="HAKI" width={1570} height={393} className="h-8 w-auto md:h-9" />
            <div className="hidden rounded-full border border-white/[0.08] bg-white/[0.035] p-1 text-sm text-haki-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl lg:flex">
              {["Home", "Planos", "Produto", "Contato", "Sobre"].map((item) => (
                <span
                  key={item}
                  className={`rounded-full px-5 py-3 transition ${
                    item === "Contato" ? "bg-white/[0.095] text-haki-white shadow-[0_0_28px_rgba(255,255,255,0.08)]" : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href="mailto:contato@studiohaki.com?subject=Quero%20plugar%20a%20HAKI%20na%20minha%20opera%C3%A7%C3%A3o"
              className="rounded-xl border border-white/[0.1] bg-white/[0.075] px-5 py-3 text-sm font-medium text-haki-white backdrop-blur-xl transition duration-500 hover:-translate-y-0.5 hover:border-haki-red/45 hover:bg-haki-red/15"
            >
              Contato
            </a>
          </div>

          <div className="relative z-10 mx-auto mt-28 max-w-3xl md:mt-36">
            <div className="mx-auto flex w-fit overflow-hidden rounded-full border border-white/[0.08] bg-[#171322]/80 p-1 text-xs text-haki-white shadow-[0_0_34px_rgba(130,104,255,0.18)] backdrop-blur-xl">
              <span className="flex items-center gap-2 rounded-full bg-white/[0.055] px-3 py-2">
                <svg className="h-4 w-4 text-haki-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13v-1a7 7 0 0 1 14 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M5 13.5c0-1.1.9-2 2-2h1v5H7a2 2 0 0 1-2-2v-1ZM19 13.5c0-1.1-.9-2-2-2h-1v5h1a2 2 0 0 0 2-2v-1Z" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                Suporte direto
              </span>
              <span className="flex items-center gap-2 px-3 py-2 text-haki-muted">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m12 4 8 4-8 4-8-4 8-4Z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m4 12 8 4 8-4M4 16l8 4 8-4" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                Studio Haki
              </span>
            </div>

            <h2 className="mx-auto mt-7 text-balance text-[clamp(3rem,6vw,5.9rem)] font-medium leading-[0.96] tracking-[-0.075em] text-haki-white">
              Vamos conversar?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-haki-muted md:text-lg">
              Quer previsibilidade criativa na sua operação? Me chama direto e eu te ajudo a entender o melhor formato para sua demanda.
            </p>

            <div className="mx-auto mt-12 max-w-2xl">
              <a
                href="mailto:contato@studiohaki.com?subject=Quero%20plugar%20a%20HAKI%20na%20minha%20opera%C3%A7%C3%A3o"
                className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-[#24202e]/95 px-6 py-5 text-base font-semibold text-haki-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.34)] transition duration-500 hover:-translate-y-1 hover:border-haki-red/50 hover:bg-haki-red/20"
              >
                Falar com Erick agora
                <span className="transition-transform duration-500 group-hover:translate-x-1">{"->"}</span>
              </a>

              <div className="mt-8 flex items-center justify-center gap-5 text-haki-muted">
                <span className="h-px flex-1 bg-white/[0.08]" />
                {["X", "IG", "IN"].map((item) => (
                  <a key={item} href="#" className="font-mono text-xs transition hover:text-haki-white">
                    {item}
                  </a>
                ))}
                <span className="h-px flex-1 bg-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="cta" className="container-haki py-24">
      <Reveal>
        <div className="grid overflow-hidden rounded-xl border hairline bg-white/[0.018] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="p-8 md:p-14">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-haki-red">Pronto para escalar?</p>
            <h2 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-haki-white md:text-6xl">
              Plugue a HAKI na sua operação e comece hoje.
            </h2>
            <p className="mt-6 max-w-lg leading-7 text-haki-muted">
              Integramos com seu fluxo atual e entregamos criatividade com velocidade e previsibilidade.
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden">
            <Image src="/assets/hero/grid-background.svg" alt="" fill className="object-cover opacity-55" />
            <Image src="/assets/hero/connection-lines.svg" alt="" width={960} height={420} className="absolute right-[-8%] top-20 w-[82%] opacity-70" />
            <div className="absolute left-[34%] top-[28%] grid h-36 w-36 place-items-center rounded-xl border hairline bg-black/60 shadow-red-soft">
              <Image src="/brand/assets/haki-symbol-transparent.png" alt="" width={460} height={393} className="w-20" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const footerLinks = [
    ["Soluções", "#solucoes"],
    ["Processo", "#processo"],
    ["Planos", "#planos"],
    ["Cases", "#cases"],
    ["Sobre", "#sobre"],
    ["Contato", "#contato"],
  ];

  return (
    <footer className="container-haki border-t border-white/[0.08] py-12">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1fr_0.8fr]">
        <Image src="/brand/assets/haki-logo-transparent.png" alt="HAKI" width={1570} height={393} className="h-8 w-fit" />
        <p className="max-w-xs text-sm leading-6 text-haki-muted">Infraestrutura criativa para agências e negócios digitais.</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-haki-muted md:justify-self-end">
          {footerLinks.map(([item, href]) => (
            <a key={item} href={href} className="transition hover:text-haki-white">
              {item}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-haki-muted">
        <span>© 2026 HAKI Studio. Todos os direitos reservados.</span>
        <span>Termos de uso · Privacidade</span>
      </div>
    </footer>
  );
}

export default function Home() {
  const liteMode = useLightweightExperience();

  return (
    <main className={`noise min-h-screen bg-haki-black ${liteMode ? "performance-lite" : ""}`}>
      <SmoothScroll disabled={liteMode} />
      <HakiPreloader disabled={liteMode} />
      <UmanoNav liteMode={liteMode} />
      <UmanoHero liteMode={liteMode} />
      <UmanoLogoStrip />
      <StickyManifesto liteMode={liteMode} />
      <HowItWorksRail liteMode={liteMode} />
      <UmanoPlans />
      <WaveLensBridge disabled={liteMode} />
      <UmanoCases liteMode={liteMode} />
      <UmanoFinalStack liteMode={liteMode} />
    </main>
  );
}

