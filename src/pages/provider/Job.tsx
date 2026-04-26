import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Phone, Navigation, Play, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { getServiceById } from "@/data/mockData";
import { toast } from "sonner";

const Job = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { providerRequests, dispatch } = useApp();
  const job = providerRequests.find((r) => r.id === id);

  if (!job) {
    navigate("/provider", { replace: true });
    return null;
  }
  const service = getServiceById(job.serviceId);

  const startJob = () => {
    dispatch({ type: "UPDATE_REQUEST", id: job.id, patch: { status: "in_progress" } });
    toast.success("Job started");
  };
  const completeJob = () => {
    dispatch({ type: "COMPLETE_REQUEST", id: job.id });
    toast.success("Job completed!");
    navigate("/provider", { replace: true });
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-28">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate("/provider")} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-foreground">Active Job</h1>
      </div>

      <div className="px-5 flex-1 space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {job.customerName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-foreground">{job.customerName}</p>
              <p className="text-xs text-muted-foreground">{service?.label}</p>
            </div>
            <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Phone size={16} className="text-primary-foreground" />
            </button>
          </div>

          <div className="h-px bg-border my-4" />
          <Row icon={MapPin} text={job.address} />
          <Row icon={Calendar} text={job.date} />
          <Row icon={Clock} text={job.time} />
          {job.notes && (
            <>
              <div className="h-px bg-border my-3" />
              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Notes</p>
              <p className="text-xs text-foreground">{job.notes}</p>
            </>
          )}
        </div>

        <button className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-3 shadow-card active:scale-[0.98]">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Navigation size={18} className="text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">Open Navigation</p>
            <p className="text-[10px] text-muted-foreground">Get directions to customer</p>
          </div>
        </button>

        <div className="bg-input border border-border rounded-2xl p-3 text-center">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Earnings</p>
          <p className="text-2xl font-extrabold text-primary mt-0.5">₹{job.price}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-card border-t border-border">
        {job.status === "accepted" && (
          <button
            onClick={startJob}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:bg-secondary active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Play size={16} /> Start Job
          </button>
        )}
        {job.status === "in_progress" && (
          <button
            onClick={completeJob}
            className="w-full py-4 rounded-2xl bg-success text-success-foreground font-bold text-sm active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} /> Complete Job
          </button>
        )}
      </div>
    </div>
  );
};

const Row = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 py-1">
    <Icon size={14} className="text-primary" />
    <span className="text-xs text-foreground">{text}</span>
  </div>
);

export default Job;
