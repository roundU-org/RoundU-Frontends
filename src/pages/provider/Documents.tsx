import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronRight, FileText, Landmark, UserCheck } from "lucide-react";
import ProviderBottomNav from "@/components/ProviderBottomNav";
import { toast } from "sonner";

const Documents = () => {
  const navigate = useNavigate();

  const docs = [
    { id: "aadhaar", label: "Aadhaar Card", status: "verified", icon: UserCheck, color: "text-blue-600", bg: "bg-blue-100" },
    { id: "pan", label: "PAN Card", status: "verified", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-100" },
    { id: "bank", label: "Bank Account Details", status: "verified", icon: Landmark, color: "text-emerald-600", bg: "bg-emerald-100" },
    { id: "license", label: "Professional License", status: "pending", icon: CheckCircle2, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  const handleDocClick = (label: string) => {
    toast.info(`Viewing ${label}`);
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-24">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 bg-white sticky top-0 z-10 border-b border-border shadow-sm">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground leading-tight">Documents & KYC</h1>
          <p className="text-xs text-muted-foreground">Verification status of your profile</p>
        </div>
      </div>

      <div className="p-5 flex-1 space-y-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-500/30">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-900">KYC Verified</p>
            <p className="text-[10px] text-emerald-700 leading-relaxed">Your profile is fully verified. You are eligible to receive high-value job requests.</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Identity & Finance</p>
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            {docs.map((doc, idx) => (
              <button 
                key={doc.id}
                onClick={() => handleDocClick(doc.label)}
                className={`w-full p-4 flex items-center gap-4 active:bg-input transition-colors ${idx !== docs.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl ${doc.bg} ${doc.color} flex items-center justify-center shrink-0`}>
                  <doc.icon size={22} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-foreground">{doc.label}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {doc.status === "verified" ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-orange-600 flex items-center gap-0.5">
                        <AlertCircle size={10} /> Under Review
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground/40" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-2xl border border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-2">
            <AlertCircle size={12} /> Privacy Note
          </p>
          <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed">
            Your documents are encrypted and stored securely. They are only used for mandatory verification required by government regulations.
          </p>
        </div>
      </div>

      <ProviderBottomNav />
    </div>
  );
};

export default Documents;
