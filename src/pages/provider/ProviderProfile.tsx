import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Briefcase, Wallet, LogOut, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

const ProviderProfile = () => {
  const navigate = useNavigate();
  const { user, dispatch, completedJobs } = useApp();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-8">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-foreground">Provider Profile</h1>
      </div>

      <div className="px-5 flex-1 space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary mx-auto flex items-center justify-center text-primary-foreground text-xl font-extrabold">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <h2 className="text-base font-bold text-foreground mt-3">{user.name}</h2>
          <p className="text-xs text-muted-foreground">+91 {user.phone || "—"}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star size={14} className="text-accent fill-accent" />
            <span className="text-sm font-bold text-foreground">4.8</span>
            <span className="text-xs text-muted-foreground">({completedJobs.length} jobs)</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <Item icon={Briefcase} label="My Jobs" onClick={() => navigate("/provider")} />
          <Item icon={Wallet} label="Earnings" onClick={() => navigate("/provider/earnings")} last />
        </div>

        <button
          onClick={logout}
          className="w-full py-3.5 rounded-2xl bg-card border border-destructive/30 text-destructive font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
};

const Item = ({ icon: Icon, label, onClick, last }: any) => (
  <button onClick={onClick} className={`w-full px-4 py-3.5 flex items-center gap-3 active:bg-input transition-colors ${last ? "" : "border-b border-border"}`}>
    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon size={16} className="text-primary" />
    </div>
    <span className="flex-1 text-left text-sm font-semibold text-foreground">{label}</span>
    <ChevronRight size={16} className="text-muted-foreground" />
  </button>
);

export default ProviderProfile;
