import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data";

const accentMap = {
  signal: { text: "text-signal", border: "border-signal/30", glow: "rgba(94,234,212,0.18)" },
  violet: { text: "text-violet", border: "border-violet/30", glow: "rgba(167,139,250,0.18)" },
  amber: { text: "text-amber", border: "border-amber/30", glow: "rgba(251,191,36,0.18)" },
};

function ProjectCard({ project, i, featured }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const accent = accentMap[project.accent];

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={`glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[80px] pointer-events-none"
        style={{ background: accent.glow }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display font-semibold text-2xl md:text-3xl text-text">{project.name}</h3>
              {featured && (
                <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${accent.border} ${accent.text}`}>
                  Flagship
                </span>
              )}
            </div>
            <p className={`mt-1.5 text-sm font-medium ${accent.text}`}>{project.tagline}</p>
          </div>
        </div>

        <p className="text-muted text-sm md:text-[15px] leading-relaxed mb-5">{project.description}</p>

        <div className={`grid gap-2.5 mb-6 ${featured ? "sm:grid-cols-2" : ""}`}>
          {project.highlights.map((h, idx) => (
            <div key={idx} className="flex gap-2.5 text-sm text-text/85 leading-relaxed">
              <span className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full ${accent.text.replace("text", "bg")}`} />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-line text-muted">
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} source on GitHub`}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-text hover:border-white/25 transition-colors"
              >
                <FaGithub size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium border ${accent.border} ${accent.text} hover:bg-white/5 transition-colors`}
              >
                Live demo <HiOutlineArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-signal">Projects</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mt-3 text-text">
            Systems, not screenshots.
          </h2>
          <p className="text-muted mt-3 max-w-xl">
            Three shipped MERN products — from a multi-tenant schooling platform to
            real-time chat with AI replies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} featured={p.id === "eduhome"} />
          ))}
        </div>
      </div>
    </section>
  );
}
