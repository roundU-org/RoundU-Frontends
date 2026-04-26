import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar, Wallet, Building2, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getServiceById } from "@/data/mockData";
import EmptyState from "@/components/EmptyState";
import ProviderBottomNav from "@/components/ProviderBottomNav";
import { toast } from "sonner";

const Earnings = () => {
  const navigate = useNavigate();
  const { completedJobs } = useApp();
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("weekly");

  const total = completedJobs.reduce((s, j) => s + j.price, 0);
  const thisWeek = completedJobs.filter((j) => Date.now() - new Date(j.date).getTime() < 7 * 86400000);
  const thisMonth = completedJobs.filter((j) => Date.now() - new Date(j.date).getTime() < 30 * 86400000);
  const weekTotal = thisWeek.reduce((s, j) => s + j.price, 0);
  const monthTotal = thisMonth.reduce((s, j) => s + j.price, 0);

  const withdrawBalance = () => {
    if (total === 0) {
      toast.error("No balance to withdraw");
      return;
    }
    toast.success(`₹${total} withdrawn to your bank account successfully!`);
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-8">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-foreground">Earnings</h1>
      </div>

      <div className="px-5 space-y-3">
        <div className="bg-primary rounded-2xl p-5 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <p className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold">Available Balance</p>
          <p className="text-3xl font-extrabold text-primary-foreground mt-1">₹{total}</p>
          
          <button 
            onClick={withdrawBalance}
            className="w-full mt-4 bg-white text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Building2 size={16} /> Withdraw to Bank
          </button>
        </div>

        <div className="bg-input rounded-xl p-1 flex">
          <button 
            onClick={() => setTimeRange("daily")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${timeRange === 'daily' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setTimeRange("weekly")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${timeRange === 'weekly' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange("monthly")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${timeRange === 'monthly' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            Monthly
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Completed Jobs" value={String(completedJobs.length)} />
          <Stat label={timeRange === "monthly" ? "This Month" : timeRange === "weekly" ? "This Week" : "Today"} value={`₹${timeRange === "monthly" ? monthTotal : timeRange === "weekly" ? weekTotal : "0"}`} />
        </div>
      </div>

      <div className="px-5 mt-6 flex-1 overflow-y-auto">
        <h2 className="text-sm font-bold text-foreground mb-3">Completed Jobs</h2>
        {completedJobs.length === 0 ? (
          <EmptyState icon={Wallet} title="No earnings yet" description="Completed jobs will appear here." />
        ) : (
          <div className="space-y-2">
            {completedJobs.map((j) => {
              const s = getServiceById(j.serviceId);
              return (
                <div key={j.id} className="bg-card border border-border rounded-2xl p-3 flex items-center gap-3 shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    {s && <s.icon size={16} className="text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{j.customerName}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar size={10} /> {j.date}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-success">+₹{j.price}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ProviderBottomNav />
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card border border-border rounded-2xl p-3 shadow-card">
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
    <p className="text-lg font-extrabold text-foreground mt-0.5">{value}</p>
  </div>
);

export default Earnings;
