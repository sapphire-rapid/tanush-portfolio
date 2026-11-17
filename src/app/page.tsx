import Link from "next/link";
import Bento from "@/components/Bento";
import ContactCard from "@/components/ContactCard";
import ProjectCard from "@/components/ProjectCard";
import SignalTrace from "@/components/SignalTrace";
import { featuredProjects } from "@/data/projects";
import { experience, site } from "@/data/site";

const shell = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const sectionTitle = "font-display text-3xl font-semibold tracking-tight sm:text-4xl";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden">
        <div className={`${shell} relative z-10 pt-20`}>
          <p className="text-lg text-haze">Hi, I&apos;m {site.name}.</p>
          <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            I put machine learning on microcontrollers.
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-haze">
            MTech AI student at Amrita with an electronics degree from VIT. I work
            where sensors, firmware and models meet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-pad px-5 py-2.5 font-medium text-mask transition-colors hover:bg-silk"
            >
              See my projects
            </Link>
            <Link
              href="/#about"
              className="rounded-xl border border-trace px-5 py-2.5 font-medium text-silk transition-colors hover:border-pad/60 hover:text-pad"
            >
              About me
            </Link>
          </div>
        </div>

        <div className="relative mt-10 h-40 w-full sm:h-52 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <SignalTrace className="h-full w-full" />
        </div>
        <p className={`${shell} mt-3 flex justify-between text-sm text-haze`}>
          <span>What the sensor sees</span>
          <span>What the chip decides</span>
        </p>
      </section>

      <section id="about" aria-labelledby="about-heading" className={`${shell} pt-24`}>
        <h2 id="about-heading" className={sectionTitle}>
          About
        </h2>
        <div className="mt-8">
          <Bento />
        </div>
      </section>

      <section aria-labelledby="projects-heading" className={`${shell} pt-24`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="projects-heading" className={sectionTitle}>
            Selected projects
          </h2>
          <Link
            href="/projects"
            className="text-pad underline decoration-pad/40 underline-offset-4 hover:decoration-pad"
          >
            All projects
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-heading" className={`${shell} pt-24`}>
        <h2 id="experience-heading" className={sectionTitle}>
          Experience
        </h2>
        <ul className="mt-8 max-w-3xl divide-y divide-trace border-y border-trace">
          {experience.map((item) => (
            <li
              key={item.role}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-medium text-silk">{item.role}</p>
                <p className="text-sm text-haze">{item.org}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-haze">{item.detail}</p>
              </div>
              {item.period && (
                <p className="shrink-0 rounded-full bg-trace/50 px-3 py-1 text-xs text-silk">
                  {item.period}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className={`${shell} pt-24`}>
        <ContactCard />
      </div>
    </>
  );
}
