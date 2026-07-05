import { useState } from "react";
import { ArrowRight, Code, Terminal, Monitor, Smartphone, Server, Send, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-center pt-20 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/90 z-10" />
          <img 
            src="/images/hero-bg.png" 
            alt="Abstract architectural background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="space-y-6">
            <p className="stagger-1 text-primary font-bold tracking-widest uppercase text-sm md:text-base border-l-2 border-primary pl-4">
              Mzazi Tech
            </p>
            <h1 className="stagger-2 text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase leading-[0.9] tracking-tighter text-foreground">
              Dominic <br />
              <span className="text-muted-foreground">Mokua</span> <br />
              <span className="text-primary">Kerubo</span>
            </h1>
            <p className="stagger-3 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mt-8 font-medium">
              Frontend Developer & Founder of Mzazi Tech. Building robust digital products against the odds.
            </p>
            
            <div className="stagger-4 flex flex-wrap gap-4 pt-8">
              <Button size="lg" className="rounded-none h-14 px-8 text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-white hover:text-background transition-colors" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-sm font-bold uppercase tracking-widest border-2 border-border hover:border-primary hover:text-primary transition-colors bg-transparent" asChild>
                <button onClick={() => document.querySelector('.fixed.top-6.right-6')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}>
                  View Projects
                </button>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-4">The Hustle</h2>
              <div className="w-20 h-2 bg-primary mb-8"></div>
            </div>
            
            <div className="prose prose-invert max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed text-foreground font-medium">
                I built Mzazi Tech from zero budget and borrowed laptops in university computer labs.
              </p>
              <p className="text-lg leading-relaxed">
                As a self-taught BCOM student at the Co-operative University of Kenya, the path to software engineering wasn't laid out for me. I had to carve it myself. "Mzazi" means "parent" in Swahili — a name chosen because the core mission of my work is to nurture others, build tools that empower, and grow a community.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-border/50">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Timeline</h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-1 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {[
                  { year: "2021", text: "Discovered coding on a borrowed laptop. Hours spent in computer labs learning the fundamentals." },
                  { year: "2022", text: "Shipped first freelance websites. Turned theory into real-world value for early clients." },
                  { year: "2023", text: "Launched WhatsApp bots. Grew a massive user community relying on automation tools." },
                  { year: "2024+", text: "Expanded to full-stack development, private game server hosting, and AI tooling integrations." }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-3 h-3 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 border border-border bg-background/50 backdrop-blur-sm group-hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <time className="font-display font-bold text-primary text-xl">{item.year}</time>
                      </div>
                      <div className="text-muted-foreground">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] w-full border border-border bg-background p-4 hidden lg:block">
            <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 -z-10" />
            <img 
              src="/images/about-img.png" 
              alt="Coding setup" 
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute bottom-8 left-0 -translate-x-8 bg-primary text-primary-foreground p-6 max-w-xs shadow-2xl">
              <p className="font-display font-bold text-xl uppercase leading-tight">
                "Mzazi means parent. I build to nurture and empower."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-4 text-center">Toolkit</h2>
            <div className="w-20 h-2 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "HTML/CSS", icon: <Monitor size={32} /> },
              { name: "JavaScript", icon: <Code size={32} /> },
              { name: "React", icon: <Terminal size={32} /> },
              { name: "Node.js", icon: <Server size={32} /> },
              { name: "Responsive", icon: <Smartphone size={32} /> },
              { name: "Git/GitHub", icon: <Code size={32} /> },
              { name: "UI/UX", icon: <Monitor size={32} /> },
              { name: "SEO", icon: <Terminal size={32} /> }
            ].map((skill, i) => (
              <div key={i} className="group p-8 border border-border bg-card flex flex-col items-center justify-center text-center gap-4 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  {skill.icon}
                </div>
                <h3 className="font-display font-bold text-xl">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-4">Let's Build</h2>
            <div className="w-20 h-2 bg-primary mb-12"></div>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-md">
              Looking for a robust digital solution, a custom WhatsApp bot, or a frontend engineer? Let's talk.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-background border border-border flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</h4>
                  <a href="mailto:mzazitechinc@gmail.com" className="block text-xl font-display font-medium hover:text-primary transition-colors">mzazitechinc@gmail.com</a>
                  <a href="mailto:dominicmokua001@gmail.com" className="block text-xl font-display font-medium hover:text-primary transition-colors">dominicmokua001@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-background border border-border flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Location</h4>
                  <p className="text-xl font-display font-medium">Nairobi, Kenya</p>
                  <p className="text-muted-foreground">Available Worldwide (Remote)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-background p-8 md:p-12 border border-border relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -z-10" />
            
            {formStatus === "success" ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Message Sent</h3>
                <p className="text-muted-foreground mb-8">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button 
                  onClick={() => setFormStatus("idle")}
                  variant="outline" 
                  className="rounded-none font-bold uppercase tracking-widest"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full h-14 bg-card border border-border px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full h-14 bg-card border border-border px-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea 
                    required 
                    className="w-full h-32 bg-card border border-border p-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full h-14 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest text-lg hover:bg-white hover:text-background transition-colors"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-border bg-background">
        <p className="text-muted-foreground font-medium">
          © {new Date().getFullYear()} Mzazi Tech. Crafted with purpose.
        </p>
      </footer>
    </div>
  );
}
