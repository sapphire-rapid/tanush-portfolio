import type { Metadata } from "next";
import "./globals.css";
import Dock from "@/components/Dock";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-pad focus:px-3 focus:py-2 focus:text-mask"
        >
          Skip to content
        </a>
        <main id="main" className="flex-1">
          {children}
        </main>
        {/* bottom padding keeps the last line clear of the dock */}
        <footer className="mx-auto w-full max-w-6xl px-5 pt-16 pb-28 text-sm text-haze sm:px-8">
          Designed and built by {site.name}, with help from coding agents.
        </footer>
        <Dock />
      </body>
    </html>
  );
}
