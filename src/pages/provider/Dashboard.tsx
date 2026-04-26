import { useNavigate } from "react-router-dom";
import { Bell, Wallet, User, MapPin, Calendar, Clock, Check, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getServiceById } from "@/data/mockData";
import EmptyState from "@/components/EmptyState";
import { Inbox } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { providerRequests, completedJobs, dispatch, user } = useApp();
  const pending = providerRequests.filter((r) => r.status === "pending");
  const accepted = providerRequests.filter((r) => r.status === "accepted" || r.status === "in_progress");
  const earnings = completedJobs.reduce((s, j) => s + j.price, 0);

  return (
    <div className="min-h-full flex flex-col bg-background pb-6">
      <div className="px-5 pt-6 pb-4 flex items-center justify-between animate-fade-in">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Provider Dashboard</p>
          <h1 className="text-xl font-extrabold text-foreground mt-0.5">Hi, {user.name.split(" ")[0]}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/provider/profile")}
            className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center"
          >
            <User size={18} className="text-foreground" />
          </button>
          <button className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center relative">
            <Bell size={18} className="text-foreground" />
            {pending.length > 0 && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />}
          </button>
        </div>
      </div>

      <div className="px-5 grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => navigate("/provider/earnings")}
          className="bg-primary rounded-2xl p-4 text-left active:scale-[0.98] shadow-card"
        >
          <Wallet size={18} className="text-accent mb-2" />
          <p className="text-[10px] text-primary-foreground/70 uppercase tracking-wider font-semibold">Earnings</p>
          <p className="text-xl font-extrabold text-primary-foreground">₹{earnings}</p>
        </button>
        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <Inbox size={18} className="text-primary mb-2" />
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Requests</p>
          <p className="text-xl font-extrabold text-foreground">{pending.length}</p>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto space-y-5">
        {accepted.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-foreground mb-3">Active Job</h2>
            {accepted.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/provider/job/${r.id}`)}
                className="w-full bg-primary rounded-2xl p-4 text-left active:scale-[0.98] shadow-card mb-2"
              >
                <p className="text-xs text-primary-foreground/70">In progress</p>
                <p className="text-base font-bold text-primary-foreground mt-0.5">{r.customerName}</p>
                <p className="text-xs text-primary-foreground/70 mt-1">{getServiceById(r.serviceId)?.label}</p>
              </button>
            ))}
          </div>
        )}

        <div>
          <h2 className="text-sm font-bold text-foreground mb-3">Incoming Requests</h2>
          {pending.length === 0 ? (
            <EmptyState icon={Inbox} title="No new requests" description="New jobs will appear here." />
          ) : (
            <div className="space-y-3">
              {pending.map((r) => {
                const service = getServiceById(r.serviceId);
                return (
                  <div key={r.id} className="bg-card border border-border rounded-2xl p-4 shadow-card">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                        {service && <service.icon size={18} className="text-primary-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground">{r.customerName}</p>
                        <p className="text-[10px] text-muted-foreground">{service?.label} · ₹{r.price}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {r.address}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {r.date}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {r.time}</span>
                        </div>
                        {r.notes && <p className="text-[11px] text-foreground mt-2 italic">"{r.notes}"</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          dispatch({ type: "REJECT_REQUEST", id: r.id });
                          toast("Request rejected");
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-input border border-border text-foreground text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
                      >
                        <X size={14} /> Reject
                      </button>
                      <button
                        onClick={() => {
                          dispatch({ type: "ACCEPT_REQUEST", id: r.id });
                          toast.success("Job accepted!");
                          navigate(`/provider/job/${r.id}`);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Check size={14} /> Accept
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
