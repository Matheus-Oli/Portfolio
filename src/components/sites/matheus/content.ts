const ICONS = "/sites/matheus/icons";

export const profile = {
  initials: "MO",
  firstName: "Matheus",
  lastName: "Oliveira",
  location: "Vitória, ES — Brasil",
  email: "matheus.oliveira.do.nasc@gmail.com",
  phone: "(27) 98170-9551",
  phoneHref: "tel:+5527981709551",
  github: "https://github.com/Matheus-Oli",
  linkedin: "https://www.linkedin.com/in/matheus-oliveira-do-nascimento/",
  instagram: "https://www.instagram.com/matheus._.oli/",
};

export const nav = [
  { href: "#about", label: "Sobre" },
  { href: "#skills", label: "Habilidades" },
  { href: "#experience", label: "Experiência" },
  { href: "#work", label: "Projetos" },
  { href: "#contact", label: "Contato" },
];

export type HeadlineSegment = { text: string; bold?: boolean };

export const headline: HeadlineSegment[] = [
  { text: "Desenvolvedor full stack criando" },
  { text: "aplicações em Angular e C#/.NET", bold: true },
  { text: "do front-end à produção." },
];

export const stats = [
  { value: 21, suffix: "", label: "Anos" },
  { value: 10, suffix: "+", label: "Tecnologias" },
  { value: 2, suffix: "+", label: "Anos de experiência" },
  { value: 10, suffix: "", label: "Projetos" },
];

export const about = {
  eyebrow: "Sobre",
  title: "Olá!",
  lede: "Sou Matheus Oliveira, desenvolvedor web full stack apaixonado por criar soluções inovadoras e eficientes, do front-end à API em produção.",
  notes: [
    "Formado em Análise e Desenvolvimento de Sistemas pela FAESA e Técnico em Desenvolvimento de Sistemas pelo SENAI-ES.",
    "Desde abril de 2024 trabalho na VilaInfo no Hospital Questiona, plataforma que prepara alunos para vestibulares, construindo funcionalidades do front-end em Angular à API em C#/.NET, até a produção.",
    "Também atuo como freelancer, criando sistemas sob medida e landing pages para pequenos negócios.",
  ],
  portrait: "/sites/matheus/photos/matheus.jpg",
  portraitAlt: "Matheus Oliveira",
  portraitBack: "/sites/matheus/photos/turma-senai.jpg",
  portraitBackAlt: "Turma de formandos do SENAI-ES",
  portraitCaption: "Turma SENAI-ES",
};

export type Tool = { name: string; icon?: string };
export type SkillGroup = { title: string; tools: Tool[] };

export const skills: SkillGroup[] = [
  {
    title: "Linguagens",
    tools: [
      { name: "JavaScript", icon: `${ICONS}/javascript-original.svg` },
      { name: "TypeScript", icon: `${ICONS}/typescript-original.svg` },
      { name: "C#", icon: `${ICONS}/csharp-original.svg` },
      { name: "Python", icon: `${ICONS}/python-original.svg` },
    ],
  },
  {
    title: "Frontend",
    tools: [
      { name: "HTML", icon: `${ICONS}/html5-original.svg` },
      { name: "CSS", icon: `${ICONS}/css3-original.svg` },
      { name: "Angular", icon: `${ICONS}/angular-original.svg` },
      { name: "React", icon: `${ICONS}/react-original.svg` },
      { name: "Sass", icon: `${ICONS}/sass-original.svg` },
      { name: "Next.js", icon: `${ICONS}/nextjs-original.svg` },
    ],
  },
  {
    title: "Backend",
    tools: [
      { name: ".NET", icon: `${ICONS}/dot-net-original.svg` },
      { name: "ASP.NET Core Web API", icon: `${ICONS}/dotnetcore-original.svg` },
      { name: "Entity Framework", icon: `${ICONS}/entityframeworkcore-original.svg` },
      { name: "Swagger", icon: `${ICONS}/swagger-original.svg` },
      { name: "Express.js", icon: `${ICONS}/express-original.svg` },
      { name: "Node.js", icon: `${ICONS}/nodejs-original.svg` },
    ],
  },
  {
    title: "Banco de dados",
    tools: [
      { name: "MySQL", icon: `${ICONS}/mysql-original.svg` },
      { name: "PostgreSQL", icon: `${ICONS}/postgresql-original.svg` },
      { name: "Supabase", icon: `${ICONS}/supabase-original.svg` },
    ],
  },
  {
    title: "Ferramentas",
    tools: [
      { name: "Git", icon: `${ICONS}/git-original.svg` },
      { name: "Figma", icon: `${ICONS}/figma-original.svg` },
      { name: "Docker", icon: `${ICONS}/docker-original.svg` },
      { name: "Postman", icon: `${ICONS}/postman-original.svg` },
    ],
  },
  {
    title: "DevOps & Cloud",
    tools: [
      { name: "GitHub Actions", icon: `${ICONS}/githubactions-original.svg` },
      { name: "Azure DevOps", icon: `${ICONS}/azuredevops-original.svg` },
      { name: "AWS", icon: `${ICONS}/amazonwebservices-original-wordmark.svg` },
    ],
  },
];

export type JobPoint = { before?: string; strong?: string; after?: string };
export type Job = {
  id: string;
  company: string;
  role: string;
  year: string;
  when: string;
  where: string;
  lede: string;
  points: JobPoint[];
  chips: string[];
};

export const jobs: Job[] = [
  {
    id: "job-vilainfo",
    company: "VilaInfo",
    role: "Desenvolvedor Full Stack",
    year: "2024",
    when: "Abr 2024 – presente",
    where: "Hospital Questiona",
    lede: "Plataforma de estudos que prepara alunos para o ENEM e outros vestibulares.",
    points: [
      { before: "Construo funcionalidades de ponta a ponta, do", strong: "front-end em Angular", after: " à API em C#/.NET." },
      { before: "Levo as entregas", strong: "até a produção", after: ", em uma plataforma em constante mudança." },
      { before: "Trabalho em time com", strong: "Scrum e code review", after: ", versionando tudo com Git." },
    ],
    chips: ["Angular", "TypeScript", "C#", ".NET", "REST API", "Node.js", "PostgreSQL", "AWS", "Azure", "Figma", "Git"],
  },
  {
    id: "job-freelance",
    company: "Freelancer",
    role: "Desenvolvedor Full Stack",
    year: "Atual",
    when: "Freelance",
    where: "Remoto",
    lede: "Sistemas sob medida para pequenos negócios.",
    points: [
      { strong: "Money Route:", after: " plataforma de controle financeiro, com front-end em Angular e API em C#/.NET." },
      { before: "Infraestrutura com", strong: "Supabase, Render e Vercel", after: "." },
    ],
    chips: ["Angular", "C#", ".NET", "Supabase", "Render", "Vercel"],
  },
  {
    id: "job-tcc",
    company: "FAESA · TCC",
    role: "Projeto em equipe",
    year: "2025",
    when: "TCC FAESA",
    where: "Vitória, ES",
    lede: "Totem de autoatendimento para a cantina Maria Bonita, desenvolvido em equipe.",
    points: [
      { before: "Sistema de", strong: "autoatendimento e administração", after: " do totem da cantina." },
      { before: "Protótipo no", strong: "Figma", after: " e implementação com Express, Supabase e TypeScript." },
    ],
    chips: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
];

export type CredItem = { title: string; lines: string[] };
export type CredGroup = { title: string; items: CredItem[] };

export const creds: CredGroup[] = [
  {
    title: "Formação",
    items: [
      { title: "Análise e Desenvolvimento de Sistemas", lines: ["FAESA", "2023 – 2025 · Concluído"] },
      { title: "Técnico em Desenvolvimento de Sistemas", lines: ["SENAI-ES", "2021 – 2023 · Concluído"] },
      { title: "Ensino Médio", lines: ["SESI", "Concluído"] },
    ],
  },
  {
    title: "Certificações & cursos",
    items: [
      { title: "Full Stack Web com Node, JavaScript e TypeScript", lines: ["Udemy · 2026 · Em andamento"] },
      { title: "Claude 101", lines: ["Anthropic · Mai/2026"] },
      { title: "Python: Orientação a Objetos, Estruturas de Dados e Interface Gráfica", lines: ["Bradesco · 2025"] },
      { title: "Modelagem de Dados", lines: ["MySQL e PostgreSQL · 2025"] },
      { title: "Tecnologia da Informação e Comunicação", lines: ["2021"] },
    ],
  },
  {
    title: "Serviços",
    items: [
      { title: "Aplicações Web Full Stack", lines: ["Do front-end à API em produção"] },
      { title: "APIs em C#/.NET", lines: ["ASP.NET Core Web API"] },
      { title: "Sistemas Sob Medida", lines: ["Para empresas e pequenos negócios"] },
      { title: "Landing Pages", lines: ["Para pequenos negócios"] },
    ],
  },
];
