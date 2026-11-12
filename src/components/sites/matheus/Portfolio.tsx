import Image from "next/image";
import Link from "next/link";
import { about, creds, headline, jobs, nav, profile, skills, stats } from "./content";
import { Cursor } from "./Cursor";
import { ArrowIcon } from "./icons";
import { JobCard } from "./JobCard";
import { MaskWords } from "./MaskWords";
import { NavDrawer } from "./NavDrawer";
import { Portrait } from "./Portrait";
import { projectHref, projectNumber, projects } from "./projects";
import { SiteMotion } from "./SiteMotion";
import { ThemeToggle } from "./ThemeToggle";

function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="section__head reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede ? <p>{lede}</p> : null}
    </div>
  );
}

export function Portfolio() {
  return (
    <>
      <Cursor />
      <SiteMotion>
        <header className="bar" data-site-bar="">
          <a className="mark" aria-label="Topo da página" href="#top">
            {profile.initials}
          </a>
          <nav>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
          <a className="bar__cta" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
            <span className="long"> ↗</span>
          </a>
          <NavDrawer />
        </header>

        <section className="hero" id="top" data-hero="">
          <div className="hero__grid" data-hero-grid="" aria-hidden>
            <div className="hero__lines" data-hero-lines="" />
            <div className="hero__glow" data-hero-glow="" />
          </div>
          <div className="hero__light" data-hero-light="" aria-hidden />
          <div className="wrap hero__inner" data-hero-inner="">
            <p className="eyebrow hero__eyebrow" data-intro="eyebrow">
              {profile.location}
            </p>
            <h1 className="name">
              <span className="name__line">
                <span>{profile.firstName}</span>
              </span>
              <span className="name__line">
                <span>{profile.lastName}</span>
              </span>
            </h1>
            <p className="headline">
              {headline.map((segment, i) => (
                <span key={i}>
                  {segment.bold ? (
                    <b>
                      <MaskWords text={segment.text} />
                    </b>
                  ) : (
                    <MaskWords text={segment.text} />
                  )}
                  {i < headline.length - 1 ? " " : null}
                </span>
              ))}
            </p>
            <div className="hero__actions" data-intro="actions">
              <a className="cta" href="#work">
                <span className="cta__fill" aria-hidden />
                <span className="cta__text">Ver projetos</span>
                <span className="cta__icon" aria-hidden>
                  <ArrowIcon />
                </span>
              </a>
              <a className="ghost" href="#desk">
                <span className="ghost__dot" aria-hidden />
                Disponível para projetos freelance
                <span className="ghost__badge">aberto</span>
              </a>
            </div>
            <ul className="s-stats" data-intro="stats">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <b>
                    <span data-count={stat.value}>{stat.value}</span>
                    {stat.suffix}
                  </b>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap">
            <SectionHead eyebrow={about.eyebrow} title={about.title} />
            <div className="about__grid">
              <Portrait />
              <div>
                <p className="about__lede reveal">{about.lede}</p>
                <div className="about__notes reveal">
                  {about.notes.map((note) => (
                    <p key={note}>{note}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="skills" id="skills" data-skills="">
          <div className="wrap">
            <SectionHead eyebrow="Habilidades" title="Com o que eu construo" />
            <div className="skills__grid" data-reveal-group="">
              {skills.map((group) => (
                <div key={group.title} className="skillgroup">
                  <h3>{group.title}</h3>
                  <div className="s-tools">
                    {group.tools.map((tool) =>
                      tool.icon ? (
                        <span key={tool.name} className="s-tool reveal-item">
                          <Image src={tool.icon} alt="" width={30} height={30} unoptimized />
                          {tool.name}
                        </span>
                      ) : (
                        <span key={tool.name} className="s-tool s-tool--text reveal-item">
                          {tool.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap xp__grid">
            <aside className="xp__index">
              <SectionHead eyebrow="Experiência" title="Por onde passei" />
              <ol className="xp__list" aria-label="Experiências">
                {jobs.map((job, i) => (
                  <li key={job.id}>
                    <a className="xp__item" href={`#${job.id}`} data-xp-item="" data-on={i === 0 ? "1" : "0"}>
                      <span className="xp__bullet" aria-hidden />
                      <span>
                        <b>{job.company}</b>
                        <span>
                          {job.role} · {job.year}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
            <div className="xp__detail">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="wrap">
            <SectionHead
              eyebrow="Projetos"
              title="Projetos profissionais, freelance e acadêmicos"
              lede="Uma seleção do que construí no trabalho, como freelancer, na faculdade e como voluntário."
            />
            <div className="cases">
              {projects.map((project) => {
                const href = projectHref(project);
                const thumb = project.screenshots[0];
                return (
                  <article key={project.slug} className="case reveal">
                    <Link
                      className={thumb ? "case__shot" : "case__shot case__shot--none"}
                      href={href}
                      tabIndex={-1}
                      aria-hidden
                    >
                      {thumb ? (
                        <Image src={thumb} alt="" width={1600} height={900} sizes="(max-width: 860px) 100vw, 560px" />
                      ) : (
                        <span>{project.name}</span>
                      )}
                    </Link>
                    <div className="case__body">
                      <p className="case__no">
                        {projectNumber(project)} · {project.category}
                      </p>
                      <h3>{project.name}</h3>
                      <p className="case__tag">{project.tagline}</p>
                      <p className="case__lede">{project.summary ?? project.lede}</p>
                      {project.badge ? <p className="case__award">🎓 {project.badge}</p> : null}
                      {project.stack.length > 0 ? (
                        <div className="s-chips">
                          {project.stack.map((tech) => (
                            <span key={tech} className="s-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <Link className="case__go" href={href}>
                        Ver detalhes <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <SectionHead eyebrow="Trajetória" title="Formação, cursos e serviços" />
            <div className="creds">
              {creds.map((group) => (
                <div key={group.title} className="cred reveal">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <b>{item.title}</b>
                        {item.lines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="closer" id="contact" data-closer="">
          <div className="closer__field" data-closer-field="" aria-hidden />
          <div className="wrap closer__inner">
            <h2>
              <span>Vamos construir</span> <span>algo juntos.</span>
            </h2>
            <p>
              Estou disponível para projetos freelance, oportunidades de trabalho ou apenas para trocar ideias
              sobre desenvolvimento web.
            </p>
            <a className="closer__mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="closer__links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub <span aria-hidden>↗</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden>↗</span>
              </a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                Instagram <span aria-hidden>↗</span>
              </a>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </div>
            <div className="door" id="desk">
              <div className="door__copy">
                <p className="door__title">Precisa de um sistema ou de uma landing page?</p>
                <p>
                  Desenvolvo <b>aplicações web full stack</b>, <b>APIs em C#/.NET</b>, sistemas sob medida e
                  landing pages para empresas e pequenos negócios.
                </p>
                <p>Do front-end à API em produção.</p>
              </div>
              <div className="door__go">
                <a href={`mailto:${profile.email}?subject=Projeto%20freelance`}>
                  Enviar e-mail <span aria-hidden>→</span>
                </a>
                <p className="door__note">{profile.location}</p>
              </div>
            </div>
          </div>
        </section>

        <a className="totop" href="#top" aria-label="Voltar ao topo">
          <span aria-hidden>↑</span>
        </a>

        <footer className="foot">
          <div className="wrap">
            <span>Matheus Oliveira · Vitória, ES</span>
            <span>© 2026 Matheus Oliveira.</span>
          </div>
        </footer>
      </SiteMotion>
    </>
  );
}
