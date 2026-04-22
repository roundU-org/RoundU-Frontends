import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getServiceById } from "@/data/mockData";
import EmptyState from "@/components/EmptyState";
import { Wallet } from "lucide-react";

const Earnings = () => {
  const navigate = useNavigate();
  const { completedJobs } = useApp();
  const total = completedJobs.reduce((s, j) => s + j.price, 0);
  const thisWeek = completedJobs.filter((j) => Date.now() - new Date(j.date).getTime() < 7 * 86400000);
  const weekTotal = thisWeek.reduce((s, j) => s + j.price, 0);

  return (
    <div className="min-h-full flex flex-col bg-background pb-8">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-foreground">Earnings</h1>
      </div>

      <div className="px-5 space-y-3">
        <div className="bg-primary rounded-2xl p-5 shadow-card">
          <p className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold">Total Earnings</p>
          <p className="text-3xl font-extrabold text-primary-foreground mt-1">₹{total}</p>
          <div className="flex items-center gap-1 mt-2 text-accent">
            <TrendingUp size={14} />
            <span className="text-xs font-semibold">+₹{weekTotal} this week</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Completed Jobs" value={String(completedJobs.length)} />
          <Stat label="This Week" value={`₹${weekTotal}`} />
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
