"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { FileText, FolderKanban, House, Mail, UserRound } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { site } from "@/data/site";

type DockItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
  match?: string; // pathname that marks this item as the current page
};

const BASE = 44;
const PEAK = 62;
const REACH = 130;

function buildItems(): DockItem[] {
  const { github, email, linkedin, resume } = site.links;
  const items: DockItem[] = [
    { label: "Home", href: "/", icon: <House />, match: "/" },
    { label: "About", href: "/#about", icon: <UserRound /> },
    { label: "Projects", href: "/projects", icon: <FolderKanban />, match: "/projects" },
  ];
  if (resume) items.push({ label: "Resume", href: resume, icon: <FileText />, external: true });
  if (email) items.push({ label: "Email", href: `mailto:${email}`, icon: <Mail />, external: true });
  if (linkedin)
    items.push({ label: "LinkedIn", href: linkedin, icon: <LinkedinIcon />, external: true });
  if (github) items.push({ label: "GitHub", href: github, icon: <GithubIcon />, external: true });
  return items;
}

function DockButton({
  item,
  pointerX,
  current,
}: {
  item: DockItem;
  pointerX: MotionValue<number>;
  current: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(pointerX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - box.left - box.width / 2 : Infinity;
  });
  const target = useTransform(distance, [-REACH, 0, REACH], [BASE, PEAK, BASE]);
  const size = useSpring(target, { mass: 0.1, stiffness: 180, damping: 14 });

  const face = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={`group relative flex items-center justify-center rounded-full border transition-colors ${
        current
          ? "border-pad/60 bg-pad/15 text-pad"
          : "border-trace bg-mask/60 text-silk hover:border-pad/50 hover:text-pad"
      }`}
    >
      <span className="h-[42%] w-[42%] [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md border border-trace bg-layer px-2 py-1 text-xs whitespace-nowrap text-silk opacity-0 transition-opacity group-hover:opacity-100"
      >
        {item.label}
      </span>
    </motion.div>
  );

  if (item.external) {
    const newTab = item.href.startsWith("http");
    return (
      <a
        href={item.href}
        aria-label={item.label}
        className="rounded-full"
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {face}
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={current ? "page" : undefined}
      className="rounded-full"
    >
      {face}
    </Link>
  );
}

export default function Dock() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(Infinity);
  const items = buildItems();

  return (
    <nav
      aria-label="Site"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      onPointerMove={(e) => {
        // Magnify for a mouse only; touch and reduced-motion get a plain bar.
        if (e.pointerType === "mouse" && !reduceMotion) pointerX.set(e.clientX);
      }}
      onPointerLeave={() => pointerX.set(Infinity)}
    >
      <div className="flex h-[62px] items-end gap-2.5 rounded-[22px] border border-trace bg-layer/75 px-2.5 pb-2 shadow-[0_18px_40px_-18px_rgba(3,8,20,0.9)] backdrop-blur-md sm:gap-3">
        {items.map((item) => (
          <DockButton
            key={item.label}
            item={item}
            pointerX={pointerX}
            current={item.match === pathname}
          />
        ))}
      </div>
    </nav>
  );
}
