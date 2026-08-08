import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX, HiOutlineDownload } from "react-icons/hi";
import { profile } from "../data";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl"
      >
        <nav
          className={`glass-strong relative flex items-center justify-between rounded-full px-5 transition-all duration-500 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <a
            href="#hero"
            className="font-display font-semibold tracking-tight text-sm md:text-base text-text px-2"
          >
            MY<span className="text-signal">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`relative z-10 px-3.5 py-1.5 text-sm rounded-full transition-colors duration-300 font-body whitespace-nowrap ${
                    active === link.href ? "text-ink" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </a>
                {active === link.href && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-signal"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center whitespace-nowrap rounded-full bg-signal text-ink text-sm font-medium px-4 py-1.5 hover:bg-signal-dim transition-colors"
          >
            Let's talk
          </a>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 whitespace-nowrap rounded-full glass text-sm font-medium px-4 py-1.5 ml-2 text-text hover:border-white/25 transition-colors"
          >
            <HiOutlineDownload /> Resume
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-text p-2"
          >
            {open ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm glass-strong rounded-3xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      active === link.href ? "bg-signal text-ink" : "text-muted hover:text-text hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium text-muted hover:text-text hover:bg-white/5 transition-colors"
                >
                  <HiOutlineDownload /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
