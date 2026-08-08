import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let raf;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let cx = tx;
    let cy = ty;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3,
    dur: 6 + Math.random() * 10,
    fx: (Math.random() - 0.5) * 60,
    fy: (Math.random() - 0.5) * 60,
    delay: Math.random() * 6,
    color: ["#5EEAD4", "#A78BFA", "#FBBF24"][i % 3],
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-ink" />

      {/* Cursor-follow glow */}
      <div
        ref={glowRef}
        className="hidden md:block absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #5EEAD4, transparent 70%)" }}
      />

      {/* Static ambient orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet/10 blur-[120px] animate-drift-slow" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-signal/10 blur-[140px] animate-drift-slower" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-amber/5 blur-[130px] animate-drift-slow" />

      {/* Floating particles for cinematic depth */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.35,
            boxShadow: `0 0 8px ${p.color}`,
            "--fx": `${p.fx}px`,
            "--fy": `${p.fy}px`,
            "--fdur": `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="noise-overlay" />
    </div>
  );
}
