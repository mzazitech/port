import { usePwaInstall } from "@/hooks/use-pwa-install";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import { useEffect, useState } from "react";

export function PwaPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePwaInstall();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled && !dismissed) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isInstallable, isInstalled, dismissed]);

  if (!visible || isInstalled || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm w-[calc(100%-48px)] bg-primary text-primary-foreground p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">
      <button 
        onClick={() => setDismissed(true)}
        className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X size={20} />
      </button>
      
      <div className="flex gap-4 items-start">
        <div className="bg-primary-foreground/10 p-3 flex-shrink-0">
          <Download size={24} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl mb-1">Install Mzazi Tech</h3>
          <p className="text-sm opacity-90 mb-4 font-medium">
            Get the full app experience directly on your device.
          </p>
          <Button 
            variant="secondary" 
            onClick={async () => {
              const accepted = await promptInstall();
              if (accepted) setVisible(false);
            }}
            className="w-full font-bold uppercase tracking-wider text-xs h-10 rounded-none bg-primary-foreground text-primary hover:bg-white"
          >
            Install Now
          </Button>
        </div>
      </div>
    </div>
  );
}
