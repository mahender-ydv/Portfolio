import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API_BASE}/api/contact`, form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.45fr_0.55fr] gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-signal">Contact</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mt-3 text-text leading-tight">
            Let's build something
            <br /> that ships.
          </h2>
          <p className="text-muted mt-4 max-w-sm leading-relaxed">
            Open to full-time roles and freelance MERN work. Reach out directly or
            send a message — it lands straight in my inbox.
          </p>

          <div className="mt-8 space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-text/90 hover:text-signal transition-colors">
              <span className="glass w-9 h-9 rounded-full flex items-center justify-center"><HiOutlineMail /></span>
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm text-text/90 hover:text-signal transition-colors">
              <span className="glass w-9 h-9 rounded-full flex items-center justify-center"><HiOutlinePhone /></span>
              {profile.phone}
            </a>
            <div className="flex items-center gap-3 text-sm text-text/90">
              <span className="glass w-9 h-9 rounded-full flex items-center justify-center"><HiOutlineLocationMarker /></span>
              {profile.location}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <a href={profile.github} target="_blank" rel="noreferrer" className="glass w-11 h-11 rounded-full flex items-center justify-center hover:border-signal/40 hover:text-signal transition-colors">
              <FaGithub size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="glass w-11 h-11 rounded-full flex items-center justify-center hover:border-signal/40 hover:text-signal transition-colors">
              <FaLinkedin size={18} />
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-strong rounded-3xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-muted">Name</label>
            <input
              id="name" name="name" required value={form.name} onChange={handleChange}
              placeholder="Your name"
              className="mt-2 w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:border-signal/50 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted">Email</label>
            <input
              id="email" name="email" type="email" required value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              className="mt-2 w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:border-signal/50 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-muted">Message</label>
            <textarea
              id="message" name="message" required rows={4} value={form.message} onChange={handleChange}
              placeholder="What are you building?"
              className="mt-2 w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:border-signal/50 outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-signal text-ink font-medium py-3.5 text-sm hover:bg-signal-dim transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✓" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-signal text-sm text-center">Thanks — I'll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="text-amber text-sm text-center">
              Couldn't send right now — email me directly at {profile.email}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
