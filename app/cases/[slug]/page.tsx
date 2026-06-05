import Image from "next/image";
import Link from "next/link";
import { createWhatsappHref } from "../../whatsapp";

type ProjectVideo = {
  src: string;
  label: string;
  client: string;
};

type Project = {
  slug: string;
  title: string;
  description: string;
  scope: string;
  art?: string;
  logo?: string;
  note?: string;
  location: string;
  since: string;
  deliverables: string;
  deliveredCount: string;
  cadence: string;
  focus: string;
  summary: string;
  ctaLabel: string;
  videos?: ProjectVideo[];
};

const projects: Project[] = [
  {
    slug: "agencia-astronauta",
    title: "Agencia Astronauta",
    description: "Landing pages, criativos e pecas de lancamento para campanhas de alta demanda.",
    scope: "LPs / Criativos / Lancamento",
    location: "Brasil",
    since: "Desde 2024",
    deliverables: "Landing pages, criativos de ads e pecas de lancamento",
    deliveredCount: "40+ entregas",
    cadence: "Fluxo recorrente",
    focus: "Campanhas de alta demanda",
    summary: "Operacao criativa continua para campanhas, paginas e materiais de lancamento com ritmo previsivel.",
    ctaLabel: "Plugar a HAKI em projetos de lancamento",
  },
  {
    slug: "upshare",
    title: "Upshare",
    description: "Agencia nos Estados Unidos que atende o nicho de restaurantes com conteudo, presenca digital e criativos recorrentes.",
    scope: "US / Restaurantes / Social",
    art: "/assets/cases/upshare-main.svg",
    logo: "Upshare",
    note: "Agencia americana especializada em restaurantes.",
    location: "Estados Unidos",
    since: "Desde 2025",
    deliverables: "Social media, criativos recorrentes e pecas de posicionamento",
    deliveredCount: "30+ criativos",
    cadence: "Entrega semanal",
    focus: "Restaurantes e negocios locais",
    summary: "Suporte visual para manter frequencia, identidade e velocidade de publicacao no nicho de restaurantes.",
    ctaLabel: "Quero uma operacao criativa para minha agencia",
  },
  {
    slug: "vibefor",
    title: "Vibefor",
    description: "Agencia focada em medicos, com criativos, presenca digital e materiais para captacao de pacientes.",
    scope: "Medicos / Saude / Captacao",
    art: "/assets/cases/vibefor-main.svg",
    logo: "Vibefor",
    note: "Agencia especializada em marketing medico.",
    location: "Brasil",
    since: "Desde 2025",
    deliverables: "Criativos, videos, pecas de social e materiais para captacao",
    deliveredCount: "60+ entregas",
    cadence: "Operacao recorrente",
    focus: "Clinicas, medicos e saude",
    summary: "Fluxo criativo para uma agencia que precisa manter consistencia visual e volume para clientes da area medica.",
    ctaLabel: "Quero escalar entregas para clientes da saude",
    videos: [
      {
        src: "/videos/cases/vibefor/vibefor-video-01.mp4",
        label: "Edicao de video",
        client: "Vibefor",
      },
      {
        src: "/videos/cases/vibefor/vibefor-video-02.mp4",
        label: "Clinica IASO",
        client: "Dra Fernanda Moro",
      },
      {
        src: "/videos/cases/vibefor/vibefor-video-03.mp4",
        label: "Clinica IASO",
        client: "Edicao 01/06",
      },
      {
        src: "/videos/cases/vibefor/vibefor-video-04.mp4",
        label: "Dr Victor Trevas",
        client: "Edicao de video 02",
      },
    ],
  },
  {
    slug: "inplexo",
    title: "Inplexo",
    description: "Projeto focado em landing page, com estrutura visual para apresentar oferta, prova e conversao.",
    scope: "Landing Page / Conversao",
    art: "/assets/cases/inplexo-main.svg",
    logo: "Inplexo",
    note: "Cliente com projeto focado em landing page.",
    location: "Brasil",
    since: "Desde 2025",
    deliverables: "Landing page, estrutura de conversao e prova visual",
    deliveredCount: "1 LP principal",
    cadence: "Projeto focado",
    focus: "Apresentacao de oferta",
    summary: "Construcao de uma landing page orientada a clareza, prova e conversao sem depender de excesso visual.",
    ctaLabel: "Quero uma landing page com estrutura de venda",
  },
];

const projectMap = Object.fromEntries(projects.map((project) => [project.slug, project]));
const specialistWhatsappHref = createWhatsappHref("Ola, Eric. Quero entender como plugar a HAKI na minha operacao.");

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectMap[slug] ?? projectMap["agencia-astronauta"];

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f1ea]">
      <CaseHeader currentSlug={project.slug} />

      <section className="mx-auto flex max-w-[1180px] flex-col gap-7 px-5 pb-12 pt-7 sm:px-6 lg:px-8 lg:pb-16 lg:pt-9">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_300px] lg:items-start xl:grid-cols-[minmax(0,1.12fr)_320px]">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff2648]">{project.scope}</p>
            <h1 className="max-w-[11ch] text-[clamp(2.3rem,4.4vw,4.15rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white/90">
              {project.title}
            </h1>
            <p className="max-w-[50ch] text-[14px] leading-6 text-white/58 sm:text-[15px] sm:leading-7">{project.description}</p>
          </div>

          <aside className="rounded-[26px] border border-white/10 bg-white/[0.028] p-5 sm:p-5.5 lg:p-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Cliente</span>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <strong className="block text-[1.45rem] font-medium leading-none tracking-[-0.045em] text-white/88 sm:text-[1.55rem]">
                  {project.logo ?? project.title}
                </strong>
                <p className="mt-3 max-w-[24ch] text-[13px] leading-6 text-white/54 sm:text-[14px]">{project.note ?? project.summary}</p>
              </div>
            </div>

            <dl className="mt-5 grid gap-3.5 border-t border-white/8 pt-4.5">
              <MetaRow label="Cliente desde" value={project.since} />
              <MetaRow label="Local" value={project.location} />
              <MetaRow label="Entregas" value={project.deliveredCount} />
              <MetaRow label="Foco" value={project.focus} />
            </dl>
          </aside>
        </div>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101012] min-h-[280px] sm:min-h-[360px] lg:min-h-[500px]">
            {project.art ? (
              <Image
                src={project.art}
                alt={`Arte principal do projeto ${project.title}`}
                width={1633}
                height={1846}
                className="h-full w-full object-cover object-top"
                priority
              />
            ) : (
              <div className="grid min-h-[360px] place-items-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/36">
                Espaco principal do projeto
              </div>
            )}
          </div>

          <div className="grid gap-3.5">
            <MetricCard label="Escopo" value={project.deliverables} />
            <MetricCard label="Cadencia" value={project.cadence} />
            <MetricCard label="Resumo" value={project.summary} />
          </div>
        </section>
      </section>

      {project.videos?.length ? (
        <section className="mx-auto max-w-[1180px] px-5 pb-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex max-w-[680px] flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff2648]">Videos do projeto</span>
            <h2 className="text-[clamp(1.45rem,2.6vw,2.15rem)] font-medium leading-[1.04] tracking-[-0.045em] text-white/88">
              Edicoes entregues para a operacao da {project.title}.
            </h2>
            <p className="text-[14px] leading-6 text-white/54 sm:text-[15px] sm:leading-7">
              Selecao de videos publicados dentro do fluxo do cliente, com menor peso visual e leitura mais objetiva.
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {project.videos.map((video, index) => (
              <article
                key={video.src}
                className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
              >
                <div className="mb-2.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff2648]">
                    {String(index + 1).padStart(2, "0")} / {video.label}
                  </span>
                  <strong className="mt-1.5 block text-[0.95rem] font-medium leading-5 tracking-[-0.025em] text-white/86">
                    {video.client}
                  </strong>
                </div>

                <div className="mx-auto max-w-[190px] overflow-hidden rounded-[16px] border border-white/10 bg-[#101012]">
                  <video
                    className="aspect-[9/16] w-full bg-black object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    src={video.src}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1180px] px-5 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-5">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Proximo passo</span>
            <h3 className="mt-3 max-w-[14ch] text-[clamp(1.7rem,2.8vw,2.55rem)] font-medium leading-[1] tracking-[-0.045em] text-white/90">
              {project.ctaLabel}
            </h3>
            <p className="mt-4 max-w-[54ch] text-[14px] leading-6 text-white/56 sm:text-[15px] sm:leading-7">
              Se voce quer colocar uma operacao criativa com mais previsibilidade, prazo e consistencia dentro da sua agencia, esse e o proximo passo.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/#planos"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#ff1538] px-8 text-[15px] font-semibold text-white transition hover:bg-[#ff2a4b]"
            >
              Ver planos da HAKI
            </Link>
            <a
              href={specialistWhatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 px-8 text-[15px] font-medium text-white/82 transition hover:border-white/22 hover:text-white"
            >
              Falar com Eric
            </a>
          </div>
        </div>
      </section>

      <CaseFooter />
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">{label}</dt>
      <dd className="max-w-[18ch] text-right text-[13px] leading-6 text-white/70 sm:text-[14px]">{value}</dd>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4.5 sm:p-5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">{label}</span>
      <p className="mt-2.5 text-[14px] leading-6 text-white/68 sm:text-[15px] sm:leading-7">{value}</p>
    </article>
  );
}

function CaseHeader({ currentSlug }: { currentSlug: string }) {
  return (
    <header className="border-b border-white/8 bg-[#050505]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 px-5 text-[14px] font-medium text-white/82 transition hover:border-white/22 hover:text-white"
          >
            Voltar para home
          </Link>
        </div>

        <nav className="flex flex-wrap gap-2">
          {projects.map((project) => {
            const isCurrent = project.slug === currentSlug;

            return (
              <Link
                key={project.slug}
                href={`/cases/${project.slug}`}
                className={`inline-flex min-h-10 items-center rounded-full px-4 text-[13px] font-medium transition ${
                  isCurrent
                    ? "bg-white text-[#050505]"
                    : "border border-white/10 text-white/60 hover:border-white/18 hover:text-white"
                }`}
              >
                {project.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function CaseFooter() {
  return (
    <footer className="umano-footer">
      <div className="umano-footer-grid">
        <div className="umano-footer-brand">
          <Image src="/brand/assets/haki-logo-transparent.png" alt="HAKI" width={1570} height={393} />
          <p>Infraestrutura criativa para agencias que precisam de consistencia, velocidade e entrega recorrente.</p>
        </div>
        <div className="umano-footer-links">
          {[
            ["Home", "/"],
            ["Planos", "/#planos"],
            ["Upshare", "/cases/upshare"],
            ["Vibefor", "/cases/vibefor"],
            ["Inplexo", "/cases/inplexo"],
            ["Agencia Astronauta", "/cases/agencia-astronauta"],
          ].map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <a className="umano-footer-cta" href={specialistWhatsappHref} target="_blank" rel="noreferrer">
          Falar no WhatsApp
        </a>
      </div>
      <strong>studiohaki.com</strong>
      <div className="umano-footer-bottom">
        <span>© 2026 HAKI Studio.</span>
        <span>Cases, operacao criativa e landing pages.</span>
      </div>
    </footer>
  );
}
