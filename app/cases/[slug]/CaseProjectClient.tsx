"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type ProjectCase = {
  title: string;
  agency: string;
  client: string;
  description: string;
  scope: string;
  bannerNote: string;
  metrics: [string, string][];
};

type MediaItem = {
  id: string;
  type: "video" | "post" | "carousel";
  title: string;
  label: string;
  format: string;
  span?: "wide";
  videoSrc?: string;
};

const mediaItems: MediaItem[] = [
  { id: "reel-01", type: "video", title: "Reel de abertura", label: "Video", format: "9:16" },
  { id: "reel-02", type: "video", title: "Oferta principal", label: "Video", format: "9:16" },
  { id: "post-01", type: "post", title: "Post de prova", label: "Post", format: "1:1" },
  { id: "post-02", type: "post", title: "Post de dor", label: "Post", format: "1:1" },
  { id: "post-03", type: "post", title: "Post de promessa", label: "Post", format: "1:1" },
  { id: "carousel-01", type: "carousel", title: "Carrossel de autoridade", label: "Carrossel", format: "5 telas", span: "wide" },
  { id: "reel-03", type: "video", title: "Corte de expert", label: "Video", format: "9:16" },
  { id: "reel-04", type: "video", title: "Criativo de trafego", label: "Video", format: "9:16" },
  { id: "post-04", type: "post", title: "Anuncio estatico", label: "Post", format: "1:1" },
  { id: "carousel-02", type: "carousel", title: "Carrossel de objeções", label: "Carrossel", format: "6 telas", span: "wide" },
  { id: "reel-05", type: "video", title: "Reel de bastidor", label: "Video", format: "9:16" },
  { id: "reel-06", type: "video", title: "Reel de prova", label: "Video", format: "9:16" },
  { id: "post-05", type: "post", title: "Post institucional", label: "Post", format: "1:1" },
  { id: "post-06", type: "post", title: "Post de chamada", label: "Post", format: "1:1" },
  { id: "reel-07", type: "video", title: "Reel de conversao", label: "Video", format: "9:16" },
  { id: "post-07", type: "post", title: "Feed educativo", label: "Post", format: "1:1" },
  { id: "carousel-03", type: "carousel", title: "Sequencia de venda", label: "Carrossel", format: "7 telas", span: "wide" },
  { id: "reel-08", type: "video", title: "Corte final", label: "Video", format: "9:16" },
  { id: "post-08", type: "post", title: "Post de fechamento", label: "Post", format: "1:1" },
  { id: "post-09", type: "post", title: "Ultima chamada", label: "Post", format: "1:1" },
];

export default function CaseProjectClient({ project }: { project: ProjectCase }) {
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const videoItems = useMemo(() => mediaItems.filter((item) => item.type === "video"), []);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.body.classList.add("case-player-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("case-player-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeVideo]);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      setIsPlaying((current) => !current);
      return;
    }

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const openFullscreen = () => {
    const player = playerRef.current;

    if (player?.requestFullscreen) {
      void player.requestFullscreen();
    }
  };

  return (
    <main className="case-project-page">
      <nav className="case-project-nav" aria-label="Navegacao do projeto">
        <Link href="/#cases" data-cursor="action">
          Voltar para cases
        </Link>
        <div>
          <a href="#midias" data-cursor="action">Midias</a>
          <a href="#resultados" data-cursor="action">Resultados</a>
          <a href="/#planos" data-cursor="action">Planos</a>
        </div>
      </nav>

      <section className="case-project-hero">
        <div className="case-project-hero-copy">
          <span>{project.scope}</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>

        <div className="case-project-banner" aria-label="Banner do projeto">
          <div className="case-project-brand-row">
            <div>
              <small>Agencia</small>
              <strong>{project.agency}</strong>
            </div>
            <i aria-hidden="true" />
            <div>
              <small>Cliente</small>
              <strong>{project.client}</strong>
            </div>
          </div>
          <p>{project.bannerNote}</p>
        </div>
      </section>

      <section id="midias" className="case-project-media-section">
        <div className="case-project-section-head">
          <span>Arquivo de entregas</span>
          <h2>20 espacos para posts, reels e carrosseis.</h2>
          <p>
            Troque cada placeholder pelos arquivos finais. Videos abrem em um player limpo, com controles
            personalizados e opcao de tela cheia.
          </p>
        </div>

        <div className="case-project-media-grid">
          {mediaItems.map((item, index) => {
            const isVideo = item.type === "video";
            const cardContent = (
              <>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="case-media-frame">
                  {item.type === "carousel" ? (
                    <div className="case-carousel-stack" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                  ) : null}
                  {isVideo ? <b aria-hidden="true">Play</b> : null}
                </div>
                <div className="case-media-meta">
                  <strong>{item.title}</strong>
                  <em>{item.label} / {item.format}</em>
                </div>
              </>
            );

            return isVideo ? (
              <button
                key={item.id}
                type="button"
                className={`case-media-card is-${item.type} ${item.span === "wide" ? "is-wide" : ""}`}
                onClick={() => setActiveVideo(item)}
                data-cursor="action"
                aria-label={`Abrir player: ${item.title}`}
              >
                {cardContent}
              </button>
            ) : (
              <article
                key={item.id}
                className={`case-media-card is-${item.type} ${item.span === "wide" ? "is-wide" : ""}`}
                aria-label={item.title}
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      </section>

      <section id="resultados" className="case-project-results">
        <div>
          <span>Resultado da operacao</span>
          <h2>Menos tempo preso em producao solta, mais consistencia para vender.</h2>
        </div>
        <div className="case-project-metrics">
          {project.metrics.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-project-cta">
        <p>Quer montar uma esteira assim para sua agencia?</p>
        <Link href="/#planos" data-cursor="action">
          Plugar HAKI
        </Link>
      </section>

      {activeVideo ? (
        <div className="case-player-modal" role="dialog" aria-modal="true" aria-label={`Player de ${activeVideo.title}`}>
          <button
            type="button"
            className="case-player-backdrop"
            onClick={() => setActiveVideo(null)}
            aria-label="Fechar player"
          />
          <div ref={playerRef} className="case-player-shell">
            <div className="case-player-topbar">
              <div>
                <span>{activeVideo.label}</span>
                <strong>{activeVideo.title}</strong>
              </div>
              <button type="button" onClick={() => setActiveVideo(null)} data-cursor="action">
                Fechar
              </button>
            </div>

            <button type="button" className="case-player-stage" onClick={togglePlayback} data-cursor="action">
              {activeVideo.videoSrc ? (
                <video ref={videoRef} src={activeVideo.videoSrc} playsInline />
              ) : (
                <div className="case-player-placeholder">
                  <span>{isPlaying ? "Pausar preview" : "Reproduzir preview"}</span>
                  <p>Substitua por um arquivo de video do projeto.</p>
                </div>
              )}
              <i aria-hidden="true">{isPlaying ? "Pause" : "Play"}</i>
            </button>

            <div className="case-player-controls">
              <button type="button" onClick={togglePlayback} data-cursor="action">
                {isPlaying ? "Pausar" : "Play"}
              </button>
              <button type="button" onClick={openFullscreen} data-cursor="action">
                Tela cheia
              </button>
              <span>{videoItems.findIndex((item) => item.id === activeVideo.id) + 1}/{videoItems.length}</span>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
