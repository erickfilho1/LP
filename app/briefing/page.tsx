"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ProfileId = "agencia" | "info" | "outro";

const profileOptions: Array<{
  id: ProfileId;
  title: string;
  description: string;
  icon: "agency" | "info" | "other";
}> = [
  {
    id: "agencia",
    title: "Agência de marketing",
    description: "Preciso absorver volume recorrente de clientes sem travar minha equipe.",
    icon: "agency",
  },
  {
    id: "info",
    title: "Operação de infoproduto",
    description: "Tenho lançamento, expert, criativos e páginas para rodar com previsibilidade.",
    icon: "info",
  },
  {
    id: "outro",
    title: "Outro tipo de operação",
    description: "Quero explicar meu cenário e entender se a HAKI consegue plugar no fluxo.",
    icon: "other",
  },
];

const demandOptions = ["Artes", "Vídeos", "Landing pages", "Sites", "Lançamentos", "Social media", "Design system"];

const planHighlights: Record<string, { label: string; detail: string }> = {
  Essencial: { label: "Plano Essencial", detail: "Artes recorrentes para manter a operação em movimento." },
  Growth: { label: "Plano Growth", detail: "Artes, vídeos e LPs para agências em crescimento." },
  Scale: { label: "Plano Scale", detail: "Tudo do Growth com prioridade para alto volume." },
  Enterprise: { label: "Plano Enterprise", detail: "Tudo incluso com fluxo dedicado e operação personalizada." },
};

function getPlanHighlight(plan: string) {
  const highlights: Record<string, { label: string; detail: string }> = {
    Essencial: { label: "Plano Essencial", detail: "Artes recorrentes para manter a opera\u00e7\u00e3o em movimento." },
    Growth: { label: "Plano Growth", detail: "Artes, v\u00eddeos e LPs para ag\u00eancias em crescimento." },
    Scale: { label: "Plano Scale", detail: "Tudo do Growth com prioridade para alto volume." },
    Enterprise: { label: "Plano Enterprise", detail: "Tudo incluso com fluxo dedicado e opera\u00e7\u00e3o personalizada." },
  };

  return highlights[plan] || { label: plan, detail: "Vamos entender o volume e indicar o melhor encaixe." };
}

function BriefingIcon({ type }: { type: "agency" | "info" | "other" | "check" }) {
  if (type === "agency") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V7.8L12 4l8 3.8V20" />
        <path d="M8 11h1.8M8 15h1.8M14.2 11H16M14.2 15H16M11 20v-4h4v4" />
      </svg>
    );
  }

  if (type === "info") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6.5h14v11H5z" />
        <path d="M8 10h5M8 13h8M15.5 6.5V4.8M8.5 6.5V4.8M12 17.5v1.7" />
      </svg>
    );
  }

  if (type === "other") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
        <path d="M7.5 7.5h9v9h-9z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4 4L19 6.5" />
    </svg>
  );
}

function BriefingFallback() {
  return (
    <main className="briefing-page">
      <div className="briefing-loading">
        <Image src="/brand/assets/haki-symbol-transparent.png" alt="" width={120} height={104} priority />
        <span>Carregando briefing</span>
      </div>
    </main>
  );
}

function BriefingFlow() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plano") || "Plano a definir";
  const planData = getPlanHighlight(selectedPlan);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<ProfileId | "">("");
  const [demands, setDemands] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");

  const profileLabel = profileOptions.find((item) => item.id === profile)?.title || "Não informado";
  const canContinue = step === 0 ? Boolean(profile) : step === 1 ? demands.length > 0 : name.trim().length > 1;

  const whatsappHref = useMemo(() => {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "";
    const message = [
      "Olá, Eric! Quero plugar a HAKI na minha operação.",
      "",
      `Plano escolhido: ${selectedPlan}`,
      `Perfil: ${profileLabel}`,
      `Demandas: ${demands.length ? demands.join(", ") : "Ainda não definido"}`,
      `Nome: ${name || "Não informado"}`,
      company ? `Empresa: ${company}` : "",
      contact ? `Contato: ${contact}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(message);
    return number ? `https://wa.me/${number}?text=${encoded}` : `https://api.whatsapp.com/send?text=${encoded}`;
  }, [company, contact, demands, name, profileLabel, selectedPlan]);

  const toggleDemand = (item: string) => {
    setDemands((current) => (current.includes(item) ? current.filter((demand) => demand !== item) : [...current, item]));
  };

  const nextStep = () => {
    if (canContinue) {
      setStep((current) => Math.min(current + 1, 2));
    }
  };

  return (
    <main className="briefing-page">
      <nav className="briefing-nav" aria-label="Briefing HAKI">
        <Link href="/" aria-label="Voltar para a landing page">
          <Image src="/brand/assets/haki-logo-transparent.png" alt="HAKI" width={1570} height={393} priority />
        </Link>
        <span>Briefing operacional</span>
      </nav>

      <section className="briefing-shell">
        <div className="briefing-copy">
          <div className="briefing-copy-safe">
            <p>Entrada r&aacute;pida</p>
            <h1>Briefing r&aacute;pido para plugar a HAKI.</h1>
            <div className="briefing-selected-plan">
              <small>Plano escolhido</small>
              <strong>{planData.label}</strong>
              <span>{planData.detail}</span>
            </div>
            <span>Responda tr&ecirc;s passos e a mensagem chega pronta no meu WhatsApp.</span>
          </div>
          <p className="briefing-kicker">Entrada rápida</p>
          <h1 className="briefing-title">Briefing rápido para plugar a HAKI.</h1>
          <div className="briefing-selected-plan">
            <small>Plano escolhido</small>
            <strong>{planData.label}</strong>
            <span>{planData.detail}</span>
          </div>
          <span className="briefing-note">Responda três passos e a mensagem chega pronta no meu WhatsApp.</span>
          <p>Entrada rápida</p>
          <h1>Vamos entender seu fluxo antes de falar de execução.</h1>
          <span>
            Você escolheu <strong>{selectedPlan}</strong>. Responda três passos e a mensagem chega pronta no meu WhatsApp.
          </span>
        </div>

        <div className="briefing-panel">
          <div className="briefing-progress" aria-label={`Etapa ${step + 1} de 3`}>
            {[0, 1, 2].map((item) => (
              <i key={item} className={step === item ? "is-active" : ""} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="profile"
                className="briefing-step"
                initial={{ opacity: 0, x: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="briefing-step-heading">
                  <small>Etapa 01</small>
                  <h2>Você opera como?</h2>
                </div>
                <div className="briefing-options">
                  {profileOptions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`briefing-option ${profile === item.id ? "is-selected" : ""}`}
                      onClick={() => setProfile(item.id)}
                    >
                      <span>
                        <BriefingIcon type={item.icon} />
                      </span>
                      <strong>{item.title}</strong>
                      <em>{item.description}</em>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <motion.div
                key="demands"
                className="briefing-step"
                initial={{ opacity: 0, x: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="briefing-step-heading">
                  <small>Etapa 02</small>
                  <h2>O que precisa entrar no fluxo?</h2>
                </div>
                <div className="briefing-demand-grid">
                  {demandOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`briefing-demand ${demands.includes(item) ? "is-selected" : ""}`}
                      onClick={() => toggleDemand(item)}
                    >
                      <BriefingIcon type="check" />
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {step === 2 ? (
              <motion.div
                key="identity"
                className="briefing-step"
                initial={{ opacity: 0, x: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="briefing-step-heading">
                  <small>Etapa 03</small>
                  <h2>Para quem eu envio o retorno?</h2>
                </div>
                <div className="briefing-fields">
                  <label>
                    Seu nome
                    <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex: Eric" />
                  </label>
                  <label>
                    Empresa ou operação
                    <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Ex: Agência X" />
                  </label>
                  <label>
                    WhatsApp ou e-mail
                    <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Opcional, mas ajuda no retorno" />
                  </label>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="briefing-actions">
            <button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
              Voltar
            </button>
            {step < 2 ? (
              <button type="button" className="is-primary" onClick={nextStep} disabled={!canContinue}>
                Continuar
              </button>
            ) : (
              <a className={`briefing-submit ${canContinue ? "" : "is-disabled"}`} href={canContinue ? whatsappHref : undefined} target="_blank" rel="noreferrer">
                Enviar para o WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BriefingPage() {
  return (
    <Suspense fallback={<BriefingFallback />}>
      <BriefingFlow />
    </Suspense>
  );
}
