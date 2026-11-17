import { Mail } from "lucide-react";
import { GithubIcon } from "./icons";
import { site } from "@/data/site";

export default function ContactCard() {
  const { email, github, linkedin } = site.links;
  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden rounded-3xl border border-trace bg-layer px-6 py-10 sm:px-10 sm:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-pad/15 blur-3xl"
      />
      <h2
        id="contact-heading"
        className="max-w-xl font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
      >
        Have a model that needs to fit on a chip?
      </h2>
      <p className="mt-4 max-w-xl leading-relaxed text-haze">
        I&apos;m open to research collaborations, internships and full-time roles in
        edge AI and embedded systems.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-pad px-5 py-2.5 font-medium text-mask transition-colors hover:bg-silk"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            Email me
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-colors ${
              email
                ? "border border-trace text-silk hover:border-pad/60 hover:text-pad"
                : "bg-pad text-mask hover:bg-silk"
            }`}
          >
            <GithubIcon className="h-4 w-4" />
            Find me on GitHub
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-xl border border-trace px-5 py-2.5 font-medium text-silk transition-colors hover:border-pad/60 hover:text-pad"
          >
            LinkedIn
          </a>
        )}
      </div>
    </section>
  );
}
