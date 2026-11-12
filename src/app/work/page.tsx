import type { Metadata } from "next";
import Link from "next/link";
import { DocFoot, DocShell } from "@/components/sites/matheus/DocShell";
import { ArrowIcon } from "@/components/sites/matheus/icons";
import { MaskWords } from "@/components/sites/matheus/MaskWords";
import { projectHref, projectNumber, projects } from "@/components/sites/matheus/projects";

const LEDE = "Cada projeto com a sua própria página: link próprio, indexável e legível sem JavaScript.";

export const metadata: Metadata = {
  title: "Projetos — Matheus Oliveira",
  description: LEDE,
};

export default function WorkPage() {
  return (
    <DocShell back={{ href: "/#work", label: "Projetos" }}>
      <div className="doc">
        <p className="doc__meta reveal reveal--sm">{projects.length} projetos</p>
        <h1>
          <MaskWords text="Projetos" className="mask" />
        </h1>
        <p className="doc__lede reveal reveal--sm">{LEDE}</p>
        <div className="doc__list">
          {projects.map((project) => (
            <Link key={project.slug} className="doc__row reveal" href={projectHref(project)}>
              <span className="doc__rowno">
                {projectNumber(project)}
                {project.year ? ` / ${project.year}` : null}
              </span>
              <span>
                <h2>{project.name}</h2>
                <p>{project.tagline}</p>
              </span>
              <span className="doc__rowgo" aria-hidden>
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
        <DocFoot back={{ href: "/", label: "Início" }} />
      </div>
    </DocShell>
  );
}
