import CaseProjectClient, { type ProjectCase } from "./CaseProjectClient";

const projects: Record<string, ProjectCase> = {
  "agencia-astronauta": {
    title: "Agencia Astronauta",
    agency: "Astronauta",
    client: "Marca cliente",
    description: "Landing pages, criativos e pecas de lancamento para campanhas de alta demanda.",
    scope: "LPs / Criativos / Lancamento",
    bannerNote: "Banner para imagem principal com logo da agencia e logo da empresa.",
    metrics: [
      ["38h", "economizadas em criacao e revisao"],
      ["R$ 7.840", "preservados em producao avulsa"],
      ["4.7/5", "satisfacao media com o design"],
    ],
  },
  "resolve-digital": {
    title: "Resolve Digital",
    agency: "Resolve",
    client: "Petcare local",
    description: "Esteira criativa para nicho pet e veterinario, com volume recorrente e visual consistente.",
    scope: "Social / Web / Recorrencia",
    bannerNote: "Banner para campanha com marca da agencia e cliente final.",
    metrics: [
      ["31h", "economizadas no mes"],
      ["R$ 6.420", "preservados em demandas soltas"],
      ["4.8/5", "aprovacao visual do cliente"],
    ],
  },
  "engage-digital": {
    title: "Engage Digital",
    agency: "Engage",
    client: "Performance client",
    description: "Operacao mensal com criativos, landing pages e materiais de suporte para funis de performance.",
    scope: "Funil / Criativos / Performance",
    bannerNote: "Banner para identidade do funil e logos da entrega.",
    metrics: [
      ["46h", "economizadas por ciclo"],
      ["R$ 9.180", "preservados em retrabalho"],
      ["4.6/5", "satisfacao do time interno"],
    ],
  },
  "criarte-propaganda": {
    title: "Criarte Propaganda",
    agency: "Criarte",
    client: "Comercio local",
    description: "Pacotes de social media e assets comerciais para clientes locais com ritmo de entrega recorrente.",
    scope: "Social / Conteudo / Entrega",
    bannerNote: "Banner para imagem do projeto e assinatura das marcas.",
    metrics: [
      ["24h", "economizadas por pacote"],
      ["R$ 4.960", "preservados em operacao"],
      ["4.9/5", "satisfacao do cliente final"],
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug] ?? projects["agencia-astronauta"];

  return <CaseProjectClient project={project} />;
}
