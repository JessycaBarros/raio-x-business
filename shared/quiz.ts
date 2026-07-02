// Quiz profile types and scoring logic

export const PROFILES = [
  "visibilidade",
  "autoridade",
  "conteudo_sem_venda",
  "funil",
  "trafego_organico",
  "anuncio_ineficiente",
  "estrutura",
] as const;

export type ProfileType = (typeof PROFILES)[number];

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  scores: Partial<Record<ProfileType, number>>;
}

export interface QuizAnswers {
  [questionId: number]: string; // option id
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export interface QuizSubmission {
  answers: QuizAnswers;
  lead: LeadData;
}

export interface QuizResult {
  profile: ProfileType;
  title: string;
  subtitle: string;
  description: string;
  notionTemplateUrl: string;
}

export const PROFILE_INFO: Record<ProfileType, { title: string; subtitle: string; description: string }> = {
  visibilidade: {
    title: "Você Precisa de Visibilidade",
    subtitle: "Seu negócio não tem um problema de vendas. Tem um problema de alcance.",
    description: "Poucas pessoas certas conhecem sua empresa. Seu potencial está sendo desperdiçado porque você simplesmente não está sendo vista pelas pessoas que precisam do que você oferece.",
  },
  autoridade: {
    title: "Você Tem Visibilidade, Mas Não Gera Autoridade",
    subtitle: "As pessoas conhecem você. Mas ainda não enxergam valor suficiente para comprar.",
    description: "Você está presente, mas seu conteúdo não constrói a percepção de que você é a melhor escolha. Falta estratégia para transformar atenção em confiança.",
  },
  conteudo_sem_venda: {
    title: "Seu Conteúdo Não Leva à Venda",
    subtitle: "Você publica. As pessoas assistem. Mas ninguém compra.",
    description: "Seu conteúdo gera engajamento, mas não gera desejo. Falta uma sequência estratégica que conduza a audiência da curiosidade até a decisão de compra.",
  },
  funil: {
    title: "Você Precisa de um Funil",
    subtitle: "Hoje você publica de forma isolada. Mas clientes compram quando percorrem uma sequência.",
    description: "Cada conteúdo que você publica está solto. Não existe uma jornada clara que leve a pessoa do primeiro contato até a compra. Você precisa de um sistema.",
  },
  trafego_organico: {
    title: "Você Precisa Começar a Anunciar",
    subtitle: "Seu negócio depende apenas do alcance orgânico. Isso torna suas vendas imprevisíveis.",
    description: "Você está limitada ao que o algoritmo entrega. Sem tráfego pago, suas vendas ficam reféns da sorte. É hora de criar previsibilidade com anúncios estratégicos.",
  },
  anuncio_ineficiente: {
    title: "O Problema Não É o Anúncio",
    subtitle: "Você já anuncia. Mas está tentando resolver com tráfego um problema que acontece antes do clique.",
    description: "Seu investimento em anúncios não está retornando porque o problema está na oferta, no criativo, no perfil ou no atendimento. Não adianta aumentar orçamento sem corrigir a base.",
  },
  estrutura: {
    title: "Você Precisa de Estrutura",
    subtitle: "Você vende. Mas sua operação está limitando seu crescimento.",
    description: "O marketing funciona, mas você está perdendo oportunidades por falta de organização, automação e processos. É hora de estruturar para escalar.",
  },
};

// Quiz questions with scoring
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Em qual momento está seu negócio?",
    subtitle: "Identifique sua maturidade atual",
    options: [
      {
        id: "1a",
        text: "Ainda não vendo de forma consistente",
        scores: { visibilidade: 3, trafego_organico: 2, funil: 1 },
      },
      {
        id: "1b",
        text: "Já vendo, mas meu faturamento oscila",
        scores: { funil: 2, conteudo_sem_venda: 2, trafego_organico: 1 },
      },
      {
        id: "1c",
        text: "Tenho vendas recorrentes, mas quero crescer",
        scores: { anuncio_ineficiente: 2, autoridade: 2, estrutura: 1 },
      },
      {
        id: "1d",
        text: "Quero escalar meu negócio",
        scores: { estrutura: 3, anuncio_ineficiente: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "Qual dessas frases mais representa sua realidade?",
    subtitle: "Seja honesta com o momento atual",
    options: [
      {
        id: "2a",
        text: "Meu Instagram não gera clientes",
        scores: { visibilidade: 2, conteudo_sem_venda: 2, funil: 1 },
      },
      {
        id: "2b",
        text: "Tenho poucos seguidores qualificados",
        scores: { visibilidade: 3, trafego_organico: 2 },
      },
      {
        id: "2c",
        text: "As pessoas chegam no meu perfil e não compram",
        scores: { autoridade: 3, conteudo_sem_venda: 2 },
      },
      {
        id: "2d",
        text: "Já tentei anúncios e não deram certo",
        scores: { anuncio_ineficiente: 3, funil: 1 },
      },
      {
        id: "2e",
        text: "Tenho muitas conversas, mas poucas vendas",
        scores: { funil: 2, conteudo_sem_venda: 2, estrutura: 1 },
      },
      {
        id: "2f",
        text: "Não sei qual é meu verdadeiro problema",
        scores: { visibilidade: 1, autoridade: 1, conteudo_sem_venda: 1, funil: 1, trafego_organico: 1, anuncio_ineficiente: 1, estrutura: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "Quando alguém entra no seu Instagram...",
    subtitle: "O que acontece com quem te encontra?",
    options: [
      {
        id: "3a",
        text: "Nem sempre entende o que vendo",
        scores: { autoridade: 3, visibilidade: 1 },
      },
      {
        id: "3b",
        text: "Entende, mas não interage",
        scores: { conteudo_sem_venda: 3, autoridade: 1 },
      },
      {
        id: "3c",
        text: "Interage, mas não chama no WhatsApp",
        scores: { funil: 3, conteudo_sem_venda: 1 },
      },
      {
        id: "3d",
        text: "Chama, mas não compra",
        scores: { estrutura: 2, funil: 2, anuncio_ineficiente: 1 },
      },
      {
        id: "3e",
        text: "Compra uma vez e some",
        scores: { estrutura: 3, funil: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "Sobre anúncios pagos...",
    subtitle: "Qual sua relação com tráfego pago?",
    options: [
      {
        id: "4a",
        text: "Nunca anunciei",
        scores: { trafego_organico: 3, visibilidade: 1 },
      },
      {
        id: "4b",
        text: "Só impulsiono posts de vez em quando",
        scores: { trafego_organico: 2, anuncio_ineficiente: 2 },
      },
      {
        id: "4c",
        text: "Já fiz campanhas, mas sem resultado consistente",
        scores: { anuncio_ineficiente: 3, funil: 1 },
      },
      {
        id: "4d",
        text: "Tenho gestor de tráfego ou faço sozinha com estratégia",
        scores: { estrutura: 2, autoridade: 1, funil: 1 },
      },
    ],
  },
  {
    id: 5,
    question: "Hoje você sente que seu conteúdo...",
    subtitle: "Avalie o impacto real do que você publica",
    options: [
      {
        id: "5a",
        text: "Não atrai pessoas novas",
        scores: { visibilidade: 3, trafego_organico: 1 },
      },
      {
        id: "5b",
        text: "Atrai pessoas, mas não as certas",
        scores: { autoridade: 2, conteudo_sem_venda: 2 },
      },
      {
        id: "5c",
        text: "Gera curtidas e salvamentos, mas não vendas",
        scores: { conteudo_sem_venda: 3, funil: 1 },
      },
      {
        id: "5d",
        text: "Gera seguidores, mas poucos viram clientes",
        scores: { funil: 3, conteudo_sem_venda: 1 },
      },
      {
        id: "5e",
        text: "Gera clientes de forma consistente",
        scores: { estrutura: 3 },
      },
    ],
  },
  {
    id: 6,
    question: "Se pudesse resolver apenas UM problema hoje, qual seria?",
    subtitle: "Escolha o que mais te incomoda agora",
    options: [
      {
        id: "6a",
        text: "Atrair mais clientes",
        scores: { visibilidade: 2, trafego_organico: 2 },
      },
      {
        id: "6b",
        text: "Crescer no Instagram com qualidade",
        scores: { visibilidade: 2, autoridade: 2 },
      },
      {
        id: "6c",
        text: "Vender mais com o que já tenho",
        scores: { conteudo_sem_venda: 2, funil: 2 },
      },
      {
        id: "6d",
        text: "Organizar meu marketing e vendas",
        scores: { estrutura: 3, funil: 1 },
      },
      {
        id: "6e",
        text: "Fazer meus anúncios funcionarem de verdade",
        scores: { anuncio_ineficiente: 3, trafego_organico: 1 },
      },
    ],
  },
];

// Calculate profile based on answers
export function calculateProfile(answers: QuizAnswers): ProfileType {
  const scores: Record<ProfileType, number> = {
    visibilidade: 0,
    autoridade: 0,
    conteudo_sem_venda: 0,
    funil: 0,
    trafego_organico: 0,
    anuncio_ineficiente: 0,
    estrutura: 0,
  };

  for (const questionId of Object.keys(answers)) {
    const qId = parseInt(questionId);
    const optionId = answers[qId];
    const question = QUIZ_QUESTIONS.find((q) => q.id === qId);
    if (!question) continue;
    const option = question.options.find((o) => o.id === optionId);
    if (!option) continue;
    for (const [profile, score] of Object.entries(option.scores)) {
      scores[profile as ProfileType] += score;
    }
  }

  // Find the profile with the highest score
  let maxProfile: ProfileType = "visibilidade";
  let maxScore = 0;
  for (const [profile, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxProfile = profile as ProfileType;
    }
  }

  return maxProfile;
}
