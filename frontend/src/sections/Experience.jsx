import { motion } from "framer-motion";
import { experience } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-signal">Experience</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mt-3 text-text">
            Where the work happens.
          </h2>
        </motion.div>

        <div className="space-y-8">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-6 md:p-10 grid md:grid-cols-[0.3fr_0.7fr] gap-8"
            >
              <div>
                <h3 className="font-display font-semibold text-xl text-text">{job.role}</h3>
                <p className="text-signal mt-1">{job.company}</p>
                <p className="font-mono text-xs text-muted mt-3">{job.period}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {job.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-line text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-3.5">
                {job.points.map((p, idx) => (
                  <li key={idx} className="flex gap-3 text-sm md:text-[15px] text-muted leading-relaxed">
                    <span className="text-signal mt-1.5 shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
