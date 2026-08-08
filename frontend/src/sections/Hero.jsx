import { motion } from "framer-motion";
import { HiOutlineArrowDown, HiOutlineMail, HiOutlineDownload } from "react-icons/hi";
import { metrics, profile } from "../data";
import { useCountUp } from "../hooks/useCountUp";
import Magnetic from "../components/Magnetic";

function RevealLine({ text, delay = 0, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={`block overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MetricCard({ m, i }) {
  const { ref, value } = useCountUp(m.to, { duration: 1400 + i * 150, decimal: m.decimal });
  const display = m.decimal ? (value / 10).toFixed(1) : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="glass rounded-2xl p-4 flex flex-col gap-1 min-w-[150px]"
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{m.label}</span>
      <span className="font-display text-2xl md:text-3xl font-semibold text-text">
        {display}
        <span className="text-signal">{m.suffix}</span>
      </span>
      <span className="text-[11px] text-muted">{m.note}</span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-xs text-muted">Open to full-time opportunities</span>
          </motion.div>

          <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-text">
            <RevealLine text={profile.name} delay={0.1} />
            <RevealLine text="builds MERN systems" delay={0.28} className="text-gradient" />
            <RevealLine text="that hold up in production." delay={0.46} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 text-muted text-base md:text-lg max-w-xl leading-relaxed"
          >
            Full Stack Developer working across the MongoDB, Express, React and Node
            stack — shipping multi-tenant platforms, real-time systems, and
            performance-tuned apps with Redis caching and 500+ DSA problems of
            problem-solving behind every architecture decision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-signal text-ink px-6 py-3 text-sm font-medium hover:bg-signal-dim transition-colors"
              >
                View Projects <HiOutlineArrowDown />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-text hover:border-white/25 transition-colors"
              >
                <HiOutlineMail /> Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-muted hover:text-text hover:border-white/25 transition-colors"
              >
                <HiOutlineDownload /> Resume
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-strong rounded-3xl p-5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
                Live impact / prod metrics
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-signal/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-violet/60" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m, i) => (
                <MetricCard key={m.label} m={m} i={i} />
              ))}
            </div>
            <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-signal/60 to-transparent animate-scan" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
