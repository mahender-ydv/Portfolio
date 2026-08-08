import { profile } from "../data";

export default function Footer() {
  return (
    <footer className="relative px-6 md:px-12 py-8 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
        <span>&copy; {new Date().getFullYear()} {profile.name}. Built with the MERN stack.</span>
        <span>Designed &amp; developed from scratch.</span>
      </div>
    </footer>
  );
}
