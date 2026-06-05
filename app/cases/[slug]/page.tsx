import Image from "next/image";
import Link from "next/link";

type ProjectVideo = {
  src: string;
  label: string;
  client: string;
};

type Project = {
  title: string;
  description: string;
  scope: string;
  art?: string;
  logo?: string;
  note?: string;
  videos?: ProjectVideo[];
};

const projects: Record<string, Project> = {
  "agencia-astronauta": {
    title: "Agencia Astronauta",
    description: "Landing pages, criativos e pecas de lancamento para campanhas de alta demanda.",
    scope: "LPs / Criativos / Lancamento",
  },
  upshare: {
    title: "Upshare",
    description: "Agencia nos Estados Unidos que atende o nicho de restaurantes com conteudo, presenca digital e criativos recorrentes.",
    scope: "US / Restaurantes / Social",
    art: "/assets/cases/upshare-main.svg",
    logo: "Upshare",
    note: "Agencia americana especializada em restaurantes.",
  },
  vibefor: {
    title: "Vibefor",
    description: "Agencia focada em medicos, com criativos, presenca digital e materiais para captacao de pacientes.",
    scope: "Medicos / Saude / Captacao",
    art: "/assets/cases/vibefor-main.svg",
    logo: "Vibefor",
    note: "Agencia especializada em marketing medico.",
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
  inplexo: {
    title: "Inplexo",
    description: "Projeto focado em landing page, com estrutura visual para apresentar oferta, prova e conversao.",
    scope: "Landing Page / Conversao",
    art: "/assets/cases/inplexo-main.svg",
    logo: "Inplexo",
    note: "Cliente com projeto focado em landing page.",
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug] ?? projects["agencia-astronauta"];

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-8 text-[#f7f7f2]">
      <Link
        href="/#cases"
        className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/70 transition hover:border-[#ff0f33] hover:text-white"
      >
        Voltar para cases
      </Link>

      <section className="mx-auto grid min-h-[78vh] max-w-6xl content-center gap-10">
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.08em] text-[#ff0f33]">{project.scope}</p>
          <h1 className="max-w-5xl text-[clamp(2.9rem,7.6vw,7.6rem)] font-black leading-[0.88] tracking-[-0.085em]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/62">{project.description}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-[34px] border border-white/10 bg-[#101012]">
            {project.art ? (
              <Image
                src={project.art}
                alt={`Arte principal do projeto ${project.title}`}
                width={1633}
                height={1846}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <span className="text-sm font-bold uppercase tracking-[0.08em] text-white/42">Espaco para midia do projeto</span>
            )}
          </div>

          {project.logo ? (
            <aside className="flex min-h-[240px] flex-col justify-between rounded-[30px] border border-white/10 bg-white/[0.035] p-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#ff0f33]">Agencia</span>
                <strong className="mt-4 block text-4xl font-black tracking-[-0.08em]">{project.logo}</strong>
              </div>
              <p className="max-w-[20ch] text-base leading-relaxed text-white/58">{project.note}</p>
            </aside>
          ) : null}
        </div>
      </section>

      {project.videos?.length ? (
        <section className="mx-auto max-w-6xl pb-20">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#ff0f33]">Videos do projeto</span>
            <h2 className="mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-black tracking-[-0.08em] text-white">
              Edicoes entregues para a operacao da Vibefor.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/58">
              Selecao de videos publicados para clientes da area medica, mantendo ritmo, consistencia e presenca digital.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {project.videos.map((video, index) => (
              <article
                key={video.src}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.26)]"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#ff0f33]">
                      {String(index + 1).padStart(2, "0")} / {video.label}
                    </span>
                    <strong className="mt-2 block text-xl font-black tracking-[-0.06em] text-white">{video.client}</strong>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#101012]">
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
    </main>
  );
}
