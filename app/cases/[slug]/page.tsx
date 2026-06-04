import Link from "next/link";

const projects = {
  "agencia-astronauta": {
    title: "Agência Astronauta",
    description: "Landing pages, criativos e peças de lançamento para campanhas de alta demanda.",
    scope: "LPs / Criativos / Lançamento",
  },
  "resolve-digital": {
    title: "Resolve Digital",
    description: "Esteira criativa para nicho pet e veterinário, com volume recorrente e visual consistente.",
    scope: "Social / Web / Recorrência",
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

        <div className="grid min-h-[420px] place-items-center overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_65%_25%,rgba(255,15,51,.22),transparent_32%),#101012]">
          <span className="text-sm font-bold uppercase tracking-[0.08em] text-white/42">Espaço para mídia do projeto</span>
        </div>
      </section>
    </main>
  );
}
