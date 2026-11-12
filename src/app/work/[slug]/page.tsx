import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocFoot, DocShell } from "@/components/sites/matheus/DocShell";
import { MaskWords } from "@/components/sites/matheus/MaskWords";
import { getProject, projects } from "@/components/sites/matheus/projects";
import { RichText } from "@/components/sites/matheus/RichText";
import { Shots } from "@/components/sites/matheus/Shots";

type Props = { params: Promise<{ slug: string }> };

// Only slugs listed in projects.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.lede,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const meta = [project.year, project.category, project.company].filter(Boolean).join(" · ");
  const sections = [
    { title: "O que faz", items: project.points },
    { title: "Minha atuação", items: project.role ?? [] },
  ].filter((section) => section.items.length > 0);

  return (
    <DocShell back={{ href: "/work", label: "Todos os projetos" }}>
      <article className="doc">
        <p className="doc__meta reveal reveal--sm">
          {meta}
        </p>
        <h1>
          <MaskWords text={project.name} className="mask" />
        </h1>
        <p className="doc__tag reveal reveal--sm">{project.tagline}</p>
        <p className="doc__lede reveal reveal--sm">{project.lede}</p>
        {project.screenshots.length > 0 ? (
          <div className="reveal">
            <Shots images={project.screenshots} name={project.name} />
          </div>
        ) : null}
        <div className="doc__body">
          <div className="doc__sections">
            {sections.map((section) => (
              <section key={section.title} className="reveal">
                <h2>{section.title}</h2>
                <ul className="doc__points">
                  {section.items.map((point) => (
                    <li key={point}>
                      <RichText text={point} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <aside className="doc__side reveal">
            <h2>Construído com</h2>
            <div className="s-chips">
              {project.stack.map((tech) => (
                <span key={tech} className="s-chip">
                  {tech}
                </span>
              ))}
            </div>
            {project.links.length > 0 ? (
              <div className="doc__links">
                {project.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
        <DocFoot back={{ href: "/work", label: "Voltar para todos os projetos" }} />
      </article>
    </DocShell>
  );
}
