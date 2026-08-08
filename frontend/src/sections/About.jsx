import { motion } from "framer-motion";
import { profile, extras } from "../data";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.4fr_0.6fr] gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-signal">About</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mt-3 text-text leading-tight">
            From database schema
            <br /> to pixel-perfect UI.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-muted leading-relaxed text-base md:text-lg">{profile.summary}</p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {extras.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <h3 className="font-display font-medium text-text mb-1.5">{e.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{e.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
