"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { categories, projects, type Category } from "@/data/projects";

const filters = ["All", ...categories] as const;
type Filter = "All" | Category;

export default function ProjectBrowser() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="inline-flex flex-wrap gap-1 rounded-xl border border-trace bg-layer p-1"
      >
        {filters.map((name) => {
          const on = name === filter;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(name)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                on ? "bg-pad text-mask" : "text-haze hover:text-silk"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
