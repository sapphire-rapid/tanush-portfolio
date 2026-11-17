import type { Metadata } from "next";
import ContactCard from "@/components/ContactCard";
import ProjectBrowser from "@/components/ProjectBrowser";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: `Edge AI, computer vision and embedded projects by ${site.name}.`,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8">
      <h1 className="font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.03em]">
        Projects
      </h1>
      <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-haze">
        Each card shows the path a signal takes through the system, from the
        input on the left to the decision on the right.
      </p>
      <div className="mt-10">
        <ProjectBrowser />
      </div>
      <div className="pt-24">
        <ContactCard />
      </div>
    </div>
  );
}
