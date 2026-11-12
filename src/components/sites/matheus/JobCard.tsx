"use client";

import { useId, useState } from "react";
import type { Job } from "./content";

export function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <article className="job reveal" id={job.id} data-job="" data-open={open ? "1" : "0"}>
      <p className="job__when">
        <b>{job.when}</b>
        {job.where}
      </p>
      <h3>
        <button
          type="button"
          className="job__toggle"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>
            {job.role} <span className="job__at">— {job.company}</span>
          </span>
          <span className="job__chev" aria-hidden />
          <span className="job__sr">{open ? "Ocultar detalhes" : "Mostrar detalhes"}</span>
        </button>
      </h3>
      <div className="job__body" id={bodyId}>
        <p className="job__lede">{job.lede}</p>
        <ul className="job__points">
          {job.points.map((point, i) => (
            <li key={i}>
              {point.before ? `${point.before} ` : null}
              {point.strong ? <strong>{point.strong}</strong> : null}
              {point.after}
            </li>
          ))}
        </ul>
        <div className="s-chips">
          {job.chips.map((chip) => (
            <span key={chip} className="s-chip">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
