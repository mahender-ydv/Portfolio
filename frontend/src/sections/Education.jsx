import { motion } from "framer-motion";
import { education } from "../data";

export default function Education() {
  return (
    <section id="education" className="relative py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-signal"
        >
          Education
        </motion.span>

        <div className="grid sm:grid-cols-2 gap-5 mt-6">
          {education.map((ed, i) => (
            <motion.div
              key={ed.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-display font-medium text-text">{ed.degree}</h3>
                <p className="text-sm text-muted mt-1">{ed.school}</p>
              </div>
              <span className="font-mono text-xs text-signal shrink-0">{ed.period}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
