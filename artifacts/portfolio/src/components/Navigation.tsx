import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const isHome = location === "/";

  const handleScrollTo = (id: string) => {
    close();
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const projects = [
    { name: "MzaziTube", path: "/projects/mzazitube" },
    { name: "Mzazi Music", path: "/projects/mzazi-music" },
    { name: "MzaziSports", path: "/projects/mzazisports" },
    { name: "MovieBox", path: "/projects/moviebox" },
    { name: "WhatsApp Bots", path: "/projects/whatsapp-bots" },
    { name: "AI Chat", path: "/projects/ai-chat" },
    { name: "Game Hosting Panel", path: "/projects/game-hosting" },
    { name: "WhatsApp Bot Dev Guide", path: "/projects/bot-guide" },
  ];

  return (
    <>
      <button
        onClick={toggle}
        className="fixed top-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-all duration-500 flex ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-md bg-card h-full border-r border-border p-8 overflow-y-auto transition-transform duration-500 delay-100 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Main</h2>
            <nav className="flex flex-col gap-4 mb-12">
              <button onClick={() => handleScrollTo("home")} className="text-4xl font-display font-bold text-left hover:text-primary transition-colors">Home</button>
              <button onClick={() => handleScrollTo("about")} className="text-4xl font-display font-bold text-left hover:text-primary transition-colors">About</button>
              <button onClick={() => handleScrollTo("skills")} className="text-4xl font-display font-bold text-left hover:text-primary transition-colors">Skills</button>
              <button onClick={() => handleScrollTo("contact")} className="text-4xl font-display font-bold text-left hover:text-primary transition-colors">Contact</button>
            </nav>

            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
              Projects <ArrowRight size={16} />
            </h2>
            <nav className="flex flex-col gap-3 pb-20">
              {projects.map((p) => (
                <Link key={p.path} href={p.path} onClick={close}>
                  <div className="group flex items-center justify-between py-2 border-b border-border/50 cursor-pointer">
                    <span className="text-lg font-medium group-hover:text-primary transition-colors">{p.name}</span>
                    <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
