"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/repertoire", label: "Repertoire" },
  { href: "/members", label: "Members" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
  // Performances archived for now — code kept in src/app/_performances_archived.
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // On the home hero (top, not scrolled) the bar is transparent with white text
  // so it blends into the image. Once scrolled — or on the white inner pages —
  // it uses dark text; scrolling adds a frosted bar.
  const onHome = pathname === "/";
  const light = onHome && !scrolled;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "border-violet/10 bg-ink/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3" aria-label="NYU Mariachi Violetas home">
          <Image src="/images/logo/nyu_logo.png" alt="NYU" width={44} height={44} className="h-10 w-auto" priority />
          <span className={`font-display text-xl tracking-tight ${light ? "text-white" : "text-bone"}`}>Mariachi</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`group relative text-sm uppercase tracking-widest transition-colors ${
                  light ? "text-white/80 hover:text-white" : "text-bone-dim hover:text-bone"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    light ? "bg-white" : "bg-gold"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`h-px w-6 transition-all ${open ? "translate-y-[3px] rotate-45" : ""} ${light && !open ? "bg-white" : "bg-bone"}`} />
          <span className={`h-px w-6 transition-all ${open ? "-translate-y-[3px] -rotate-45" : ""} ${light && !open ? "bg-white" : "bg-bone"}`} />
        </button>
      </nav>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink md:hidden"
          >
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-bone"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
