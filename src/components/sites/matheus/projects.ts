/**
 * Single source for every project: the home "Projetos" list, /work and /work/[slug] all read from here.
 * Add a project by appending an entry; its page is generated at build time from `slug`.
 * Anything marked TODO is missing information. Fill it in rather than guessing.
 */

const SHOTS = "/sites/matheus/projects";

export type ProjectCategory = "Profissional" | "Freelance" | "Acadêmico" | "Voluntariado";

/** A rich-text point: `**bold**` segments are rendered as <strong>. */
export type ProjectPoint = string;

/** A button in the "Construído com" card; rendered only when present. */
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  /** Free text, e.g. "2025" or "2024 – atual". TODO where unknown; omitted from the UI when undefined. */
  year?: string;
  category: ProjectCategory;
  /** Company or client, shown after the category in the page header. */
  company?: string;
  tagline: string;
  /** Opening paragraph of the project page (and its meta description). */
  lede: string;
  /** Shorter text for the home card; falls back to `lede`. */
  summary?: string;
  /** Public paths; the first image is the home thumbnail. */
  screenshots: string[];
  /** "O que faz": what the product does. Section hidden when empty. */
  points: ProjectPoint[];
  /** "Minha atuação": what you did on it. Section hidden when empty. */
  role?: ProjectPoint[];
  stack: string[];
  links: ProjectLink[];
  /** Small highlight shown on the home card (e.g. "TCC FAESA"). */
  badge?: string;
};

export const projects: Project[] = [
  {
    slug: "hospital-questiona",
    name: "Hospital Questiona",
    year: "2024 – atual",
    category: "Profissional",
    company: "VilaInfo",
    tagline: "Plataforma gamificada de preparação para o ENEM e vestibulares de medicina",
    lede: "Desenvolvo, como full stack, uma plataforma em que o aluno “vira médico” e salva pacientes a cada questão que acerta. O produto atende mais de 30 mil estudantes e tem um banco de mais de 35 mil questões comentadas, cronograma de estudos gerado por algoritmo, simulados, flashcards criados a partir dos erros e correção de redação por professores ou por IA.",
    summary: "Desenvolvo, como full stack, uma plataforma em que o aluno “vira médico” e salva pacientes a cada questão que acerta.",
    screenshots: [
      `${SHOTS}/hospital-questiona-login.png`,
      `${SHOTS}/hospital-questiona-home.png`,
      `${SHOTS}/hospital-questiona-redacao.png`,
    ],
    points: [],
    role: [
      "Desenvolvimento de funcionalidades de ponta a ponta, com front-end em **Angular** e APIs REST em **C#/.NET**",
      "Modelagem e consultas em **PostgreSQL** para estatísticas de desempenho e listas personalizadas",
      "Pipelines de CI/CD com **GitHub Actions** e **Azure DevOps**, com deploy via **Docker**",
      "Trabalho em time ágil (**Scrum**), com code review e pull requests",
    ],
    stack: ["Angular", "TypeScript", "C#", ".NET", "PostgreSQL", "Docker", "Azure DevOps", "GitHub Actions"],
    links: [
      { label: "Projeto", href: "https://hospital.questiona.com.br/" },
      { label: "Planos", href: "https://www.metodoquestiona.com.br/planos" },
    ],
  },
  {
    slug: "maximus",
    name: "Maximus",
    year: undefined, // TODO: ano
    category: "Profissional",
    company: "Maximus Soluções",
    tagline: "Bitbox e Porta a Porta: gestão de vendas a prazo",
    lede: "Sistemas para empresas que vendem a prazo de casa em casa. O administrador gerencia tudo pelo computador, e o vendedor trabalha pelo celular na rua: registra vendas, cobra parcelas e acompanha a rota do dia. O controle de rotas, equipes, recebimentos e folha de pagamento sai do papel.",
    summary: "Sistemas para empresas que vendem a prazo de casa em casa.",
    screenshots: [`${SHOTS}/maximus.png`],
    points: [
      "**Rotas e clientes:** clientes organizados por bairro, com o status de cada visita",
      "**Vendas e recebimentos:** venda a prazo, cobrança de parcelas e baixa de pagamentos pelo celular",
      "**Equipe:** gestão de vendedores, acompanhamento da diária e folha de pagamento",
      "**Duas versões:** painel administrativo no computador e app para os funcionários",
    ],
    role: [
      "Desenvolvimento full stack (back-end e front-end) dos produtos **Bitbox** e **Porta a Porta**",
      "Funcionalidades de ponta a ponta, tanto no painel administrativo quanto no app dos funcionários",
    ],
    stack: ["JavaScript", "Docker", "CI/CD"],
    links: [
      { label: "Projeto", href: "https://www.maximussolucoes.com.br/" },
      { label: "Instagram", href: "https://www.instagram.com/maximus.solucoes/" },
    ],
  },
  {
    slug: "money-route",
    name: "Money Route",
    year: "2025",
    category: "Freelance",
    tagline: "Saiba para onde vai cada real do seu dinheiro",
    lede: "Plataforma de controle financeiro pessoal que avisa antes de o dinheiro acabar. O usuário organiza o mês pelo Método ROUTE e pelo Saldo Zero, define tetos por categoria e acompanha seu progresso com um score de controle financeiro.",
    summary: "Plataforma de controle financeiro pessoal que avisa antes de o dinheiro acabar.",
    screenshots: [
      `${SHOTS}/money-route.png`,
      `${SHOTS}/money-route-jornada.png`,
      `${SHOTS}/money-route-administrativo.png`,
    ],
    points: [
      "**Alertas preventivos:** avisam quando um teto de gasto é ultrapassado, por exemplo “Você passou do teto de transporte”",
      "**Método Saldo Zero:** distribui toda a renda do mês entre gastos, metas e reserva",
      "**Score de controle financeiro:** acompanha a evolução do usuário no Método ROUTE",
      "**Orçamento por categoria:** progresso do mês, metas, transações e insights",
    ],
    role: [
      "Desenvolvimento full stack do produto, do zero ao deploy",
      "Front-end em **Angular** e API REST em **C#/.NET**",
      "Banco e autenticação com **Supabase**; deploy no **Render** (API) e na **Vercel** (front)",
    ],
    stack: ["Angular", "C#", ".NET", "Supabase", "Render", "Vercel"],
    links: [
      { label: "Demo", href: "https://money-route.vercel.app/" },
      { label: "Instagram", href: "https://www.instagram.com/moneyroutebr/" },
    ],
  },
  {
    slug: "maria-bonita",
    name: "Sistema de Autoatendimento Maria Bonita",
    year: undefined, // TODO: ano do TCC
    category: "Acadêmico",
    tagline: "Projeto em equipe · TCC FAESA",
    lede: "Sistema de autoatendimento e administração de totem para a cantina Maria Bonita.",
    screenshots: [`${SHOTS}/maria-bonita.png`],
    points: [
      "**Totem de autoatendimento** e painel de **administração** para a cantina.",
      "Projeto em equipe, desenvolvido como **TCC na FAESA**.",
      "Protótipo desenhado no **Figma**.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "TypeScript"],
    links: [
      { label: "Repositório", href: "https://github.com/Adrian-Quindeler/Sistema-de-Autoatendimento-MB" },
      {
        label: "Protótipo",
        href: "https://www.figma.com/design/ZmPV6JTtT03Q6Ovq0MRfp0/Maria-Bonita?node-id=43-2&t=TeYNbeOnh8ZGKUfK-1",
      },
    ],
    badge: "TCC FAESA",
  },
  {
    slug: "vilainfo",
    name: "Site VilaInfo",
    year: undefined, // TODO: ano
    category: "Profissional",
    tagline: "Soluções corporativas",
    lede: "Site institucional da VilaInfo.",
    screenshots: [`${SHOTS}/vilainfo.png`],
    points: [], // TODO: o que o site faz / o que você construiu
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    links: [{ label: "Projeto", href: "https://vilainfo.com.br/" }],
  },
  {
    slug: "folks-ecossistemas",
    name: "Folks Ecossistemas",
    year: undefined, // TODO: ano
    category: "Profissional",
    tagline: "Lagos ornamentais",
    lede: "Site institucional da Folks Ecossistema, especializada em lagos ornamentais.",
    screenshots: [`${SHOTS}/folks-ecossistemas.png`, `${SHOTS}/folks-ecossistemas-galeria.png`],
    points: [], // TODO: o que o site faz / o que você construiu
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    links: [{ label: "Projeto", href: "https://www.folksecossistemas.com.br/" }],
  },
  {
    slug: "climatizar",
    name: "Climatizar",
    year: undefined, // TODO: ano
    category: "Profissional",
    tagline: "Soluções completas em climatização",
    lede: "Site da Climatizar: instalação, manutenção, higienização e PMOC de ar-condicionado no ES.",
    screenshots: [`${SHOTS}/climatizar.png`],
    points: [
      // TODO: o que você construiu
      "Apresenta os serviços de **instalação, manutenção, higienização e PMOC** de ar-condicionado.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
    links: [{ label: "Demo", href: "https://climatizar.vercel.app/" }],
  },
  {
    slug: "elvira-sarmento",
    name: "Elvira Sarmento",
    year: undefined, // TODO: ano
    category: "Voluntariado",
    tagline: "Devocionais e estudos bíblicos",
    lede: "Landing page com devocionais diários, estudos bíblicos, mapas mentais e ensaios reflexivos da educadora cristã e escritora Elvira Sarmento.",
    screenshots: [`${SHOTS}/elvira-sarmento.png`, `${SHOTS}/elvira-sarmento-livros.png`],
    points: [
      "Reúne **devocionais diários**, **estudos bíblicos**, **mapas mentais** e **ensaios reflexivos**.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Demo", href: "https://elvira-sarmento.vercel.app/" }],
  },
  {
    slug: "pedal-cicle",
    name: "Pedal Cicle",
    year: undefined, // TODO: ano
    category: "Voluntariado",
    tagline: "Sistema de gestão",
    lede: "Sistema de gerenciamento de estoque e vendas para a empresa Pedal Cicle.",
    screenshots: [`${SHOTS}/pedal-cicle.png`],
    points: ["Gerenciamento de **estoque** e **vendas** da loja."],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Demo", href: "https://pedalcicle.vercel.app/" }],
  },
  {
    slug: "cartao-de-decisao-pibcg",
    name: "Cartão de Decisão PIBCG",
    year: undefined, // TODO: ano
    category: "Voluntariado",
    tagline: "Primeira Igreja Batista de Campo Grande (ES)",
    lede: "Digitalização de um panfleto de decisão da Primeira Igreja Batista de Campo Grande (ES).",
    screenshots: [`${SHOTS}/cartao-de-decisao.png`],
    points: ["Versão digital do **cartão de decisão** que antes era um panfleto impresso."],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Projeto", href: "https://cartao-decisao-pibcg.vercel.app/" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectHref = (project: Project) => `/work/${project.slug}`;

/** "01", "02", … in list order. */
export const projectNumber = (project: Project) => String(projects.indexOf(project) + 1).padStart(2, "0");
