import { Crown, Check } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

const tiers = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/mo",
    features: ["Basic booking", "Standard support", "Up to 3 bookings/mo"],
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹199",
    period: "/mo",
    features: ["Priority booking", "10% off all services", "24/7 chat support", "Unlimited bookings"],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹499",
    period: "/mo",
    features: ["Everything in Pro", "Free emergency calls", "Dedicated manager", "Family plan (4 users)"],
    highlight: false,
  },
];

const Subscription = () => (
  <div className="min-h-full flex flex-col bg-background pb-24">
    <div className="px-5 pt-6 pb-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <Crown size={20} className="text-accent" />
        <h1 className="text-2xl font-extrabold text-foreground">Subscription</h1>
      </div>
      <p className="text-xs text-muted-foreground">Choose the plan that's right for you.</p>
    </div>

    <div className="flex-1 px-5 space-y-3 overflow-y-auto">
      {tiers.map((t) => (
        <div
          key={t.id}
          className={`relative rounded-2xl p-5 shadow-card border ${
            t.highlight ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border"
          }`}
        >
          {t.highlight && (
            <span className="absolute top-4 right-4 text-[10px] font-extrabold px-2 py-1 rounded-md bg-accent text-accent-foreground tracking-wider">
              POPULAR
            </span>
          )}
          <h3 className={`text-lg font-extrabold ${t.highlight ? "" : "text-foreground"}`}>{t.name}</h3>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-3xl font-extrabold ${t.highlight ? "" : "text-foreground"}`}>{t.price}</span>
            <span className={`text-xs ${t.highlight ? "opacity-70" : "text-muted-foreground"}`}>{t.period}</span>
          </div>
          <div className="mt-4 space-y-2">
            {t.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                  t.highlight ? "bg-accent" : "bg-primary/10"
                }`}>
                  <Check size={10} className={t.highlight ? "text-accent-foreground" : "text-primary"} strokeWidth={3} />
                </div>
                <span className={`text-xs ${t.highlight ? "" : "text-foreground"}`}>{f}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.success(`Subscribed to ${t.name}!`)}
            className={`w-full mt-5 py-3 rounded-xl font-bold text-sm active:scale-[0.98] transition-all ${
              t.highlight
                ? "bg-accent text-accent-foreground hover:opacity-90"
                : "bg-primary text-primary-foreground hover:bg-secondary"
            }`}
          >
            {t.id === "free" ? "Current Plan" : "Upgrade"}
          </button>
        </div>
      ))}
    </div>

    <BottomNav />
  </div>
);

export default Subscription;
