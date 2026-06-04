import Link from "next/link";
import Image from "next/image";

const projects = {
  "agencia-astronauta": {
    title: "Agência Astronauta",
    description: "Landing pages, criativos e peças de lançamento para campanhas de alta demanda.",
    scope: "LPs / Criativos / Lançamento",
  },
  upshare: {
    title: "Upshare",
    description: "Agencia nos Estados Unidos que atende o nicho de restaurantes com conteudo, presenca digital e criativos recorrentes.",
    scope: "US / Restaurantes / Social",
    art: "/assets/cases/upshare-main.svg",
    logo: "Upshare",
    note: "Agencia americana especializada em restaurantes.",
  },
  "engage-digital": {
    title: "Engage Digital",
    description: "Operação mensal com criativos, landing pages e materiais de suporte para funis de performance.",
    scope: "Funil / Criativos / Performance",
  },
  "criarte-propaganda": {
    title: "Criarte Propaganda",
    description: "Pacotes de social media e assets comerciais para clientes locais com ritmo de entrega recorrente.",
    scope: "Social / Conteúdo / Entrega",
  },
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects] ?? projects["agencia-astronauta"];

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
            {"art" in project ? (
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

          {"logo" in project ? (
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
    </main>
  );
}
