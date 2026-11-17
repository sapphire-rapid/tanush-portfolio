"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

const TILT = 7; // degrees at the card edge

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol
      aria-label="Signal path"
      className="flex flex-wrap items-center gap-y-2 rounded-xl border border-trace bg-mask/70 px-3 py-4"
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-1.5 h-px w-4 bg-pad/70 sm:w-6" />}
          <span className="flex items-center gap-1.5 text-[13px] text-silk">
            <span aria-hidden="true" className="h-2 w-2 rounded-full border border-pad bg-mask" />
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    ry.set(px * TILT * 2);
    rx.set(-py * TILT * 2);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="h-full [perspective:1100px]">
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY }}
        className="flex h-full flex-col gap-4 rounded-2xl border border-trace bg-layer p-5 transition-[border-color,box-shadow] duration-200 hover:border-pad/45 hover:shadow-[0_24px_50px_-28px_rgba(240,197,107,0.45)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl leading-snug font-semibold tracking-tight">
            {project.title}
          </h3>
          <span className="shrink-0 rounded-full border border-trace px-2.5 py-0.5 text-xs text-haze">
            {project.category}
          </span>
        </div>

        <p className="text-[15px] leading-relaxed text-haze">{project.summary}</p>

        <Pipeline steps={project.pipeline} />

        <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-trace/50 px-2 py-0.5 text-xs text-silk/90">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="text-xs text-haze">{project.status}</span>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-silk px-3 py-1.5 text-sm font-medium text-mask transition-colors hover:bg-pad"
            >
              {project.link.label}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.article>
    </div>
  );
}
