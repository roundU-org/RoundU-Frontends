import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Shield, Crosshair, Wifi } from "lucide-react";

const Location = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-10 bg-background">
      <div className="relative mb-12 animate-fade-in">
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-primary/10 animate-pulse-ring" />
        <div className="absolute inset-0 w-32 h-32 rounded-full bg-primary/5 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
        <div className="relative w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-dot">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-card">
            <MapPin className="text-primary-foreground" size={32} />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-foreground mb-2">Detecting your location</h2>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Finding the best professionals near you
      </p>

      <div className="w-full max-w-xs mb-10">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          {progress < 100 ? `${progress}% — Pinpointing...` : "Location found!"}
        </p>
      </div>

      <div className="flex gap-6 mb-8">
        {[
          { icon: Shield, label: "Secure" },
          { icon: Crosshair, label: "Precise" },
          { icon: Wifi, label: "Real-time" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center">
              <item.icon className="text-primary" size={18} />
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/home", { replace: true })}
        disabled={progress < 100}
        className="w-full max-w-xs py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50"
      >
        Find Services
      </button>
    </div>
  );
};

export default Location;
