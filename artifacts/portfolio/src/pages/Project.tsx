import { useParams, Link } from "wouter";
import { ArrowLeft, Code2, Layers, Cpu, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const projectsData: Record<string, any> = {
  "mzazi-music": {
    title: "Mzazi Music",
    description: "A fast, lightweight music streaming interface offering 30-second previews of millions of tracks. Users can build queues, discover new artists, and experience fluid audio playback.",
    tags: ["Frontend", "Audio API", "State Management", "UI Design"],
    icon: <Smartphone size={48} className="text-primary" />,
    features: [
      "Instant 30-second track previews",
      "Dynamic play queue management",
      "Artist and album discovery engine",
      "Custom audio player controls"
    ],
    ctaText: "Listen Now",
    ctaLink: "#"
  },
  "mzazisports": {
    title: "MzaziSports",
    description: "Live football scores, real-time standings, and instant match updates. Designed for the obsessed fan who needs data without the bloat of traditional sports media sites.",
    tags: ["WebSockets", "Data Visualization", "React", "Live Data"],
    icon: <Layers size={48} className="text-primary" />,
    features: [
      "Real-time match event updates",
      "Live league standings across top tiers",
      "Historical match data and head-to-head",
      "Low-bandwidth mode for mobile users"
    ],
    ctaText: "View Live Scores",
    ctaLink: "#"
  },
  "moviebox": {
    title: "MovieBox",
    description: "A cinematic database explorer. Search through thousands of movies, watch high-quality trailers, and read detailed cast and crew information in a highly visual interface.",
    tags: ["TMDB API", "CSS Grid", "Video Embedding", "React Router"],
    icon: <Monitor size={48} className="text-primary" />,
    features: [
      "Comprehensive movie search engine",
      "Integrated HD trailer playback",
      "Detailed cast, crew, and review data",
      "Responsive poster-grid layouts"
    ],
    ctaText: "Explore Movies",
    ctaLink: "#"
  },
  "whatsapp-bots": {
    title: "WhatsApp Bots Suite",
    description: "A comprehensive lineup of automation bots deployed on WhatsApp. Including business workflow managers, AI assistants, crypto/forex signal providers, and bulk messaging systems.",
    tags: ["Node.js", "Baileys", "WhatsApp API", "Automation"],
    icon: <Cpu size={48} className="text-primary" />,
    features: [
      "Business Workflow Bot: Auto-replies, catalog management, order taking",
      "AI Assistant Bot: GPT-powered conversational agent directly in chat",
      "Crypto/Forex Bot: Real-time price alerts and market signals",
      "Bulk Messaging: Campaign distribution to opt-in subscriber lists"
    ],
    ctaText: "Hire a Bot",
    ctaLink: "https://wa.me/254741388986?text=Hello%20Mzazi%20Tech,%20I'm%20interested%20in%20your%20WhatsApp%20Bots"
  },
  "ai-chat": {
    title: "AI Chat Assistant",
    description: "A standalone conversational AI interface leveraging large language models to provide contextual answers, code generation, and creative writing assistance.",
    tags: ["LLM Integration", "Stream Processing", "UI/UX", "React"],
    icon: <Terminal size={48} className="text-primary" />,
    features: [
      "Context-aware conversational memory",
      "Syntax-highlighted code blocks",
      "Streaming response generation",
      "Custom system prompts for specialized tasks"
    ],
    ctaText: "Chat with AI",
    ctaLink: "#"
  },
  "game-hosting": {
    title: "Game Hosting Panel",
    description: "A custom control panel and storefront for purchasing and managing private game servers. Built for the local gaming community to deploy servers with zero technical knowledge.",
    tags: ["Full Stack", "Docker", "Stripe API", "Dashboard"],
    icon: <Server size={48} className="text-primary" />,
    features: [
      "One-click server deployment for popular titles",
      "Real-time resource monitoring (CPU/RAM)",
      "Automated billing and subscription management",
      "Web-based console and file management"
    ],
    ctaText: "View Plans",
    ctaLink: "#"
  },
  "bot-guide": {
    title: "WhatsApp Bot Dev Guide",
    description: "An open-source technical article and starter kit for developers looking to build their own WhatsApp bots using Node.js and the Baileys library.",
    tags: ["Technical Writing", "Open Source", "Tutorial", "Node.js"],
    icon: <Code2 size={48} className="text-primary" />,
    features: [
      "Step-by-step setup and authentication flow",
      "Handling incoming message events",
      "Sending text, media, and interactive buttons",
      "Deploying the bot to a cloud server"
    ],
    ctaText: "Read the Guide",
    ctaLink: "#"
  }
};

import { Terminal, Server, Monitor } from "lucide-react";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Project not found.</p>
        <Link href="/">
          <Button variant="outline" className="rounded-none font-bold uppercase tracking-widest border-2">
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/project-code.png" 
            alt="Project visualization" 
            className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12">
              <ArrowLeft size={16} /> Back to Portfolio
            </button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
            <div className="p-4 border-2 border-primary bg-card/50 backdrop-blur shrink-0">
              {project.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-wide mb-6 text-primary border-b border-border pb-4">Overview</h2>
              <p className="text-xl leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-wide mb-6 text-primary border-b border-border pb-4">Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 p-4 border border-border bg-card">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 border border-border bg-card sticky top-32">
              <h3 className="text-lg font-display font-bold uppercase tracking-wide mb-6 text-primary">Live Access</h3>
              <p className="text-muted-foreground mb-8">
                Experience the live version or get in touch for a custom implementation.
              </p>
              
              {project.ctaLink !== "#" ? (
                <a href={project.ctaLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button className="w-full h-14 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-white hover:text-background transition-colors">
                    {project.ctaText}
                  </Button>
                </a>
              ) : (
                <Button variant="outline" className="w-full h-14 rounded-none border-2 border-border text-foreground font-bold uppercase tracking-widest pointer-events-none opacity-50">
                  Internal Showcase
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
