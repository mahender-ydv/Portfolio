import { skills } from "../data";

const allSkills = Object.values(skills).flat();
// Duplicate the list so the CSS animation loops seamlessly
const loop = [...allSkills, ...allSkills];

export default function TechMarquee() {
  return (
    <div className="relative py-6 border-y border-line overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="font-mono text-sm md:text-base text-muted/70 px-6 whitespace-nowrap flex items-center gap-6"
          >
            {skill}
            <span className="text-signal/40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
