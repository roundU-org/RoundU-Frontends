import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, MoreHorizontal, MessageCircleQuestion, BellRing } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const PendingApproval = () => {
  const navigate = useNavigate();
  const { providerRegistrationDraft } = useApp();
  const { kyc } = providerRegistrationDraft;

  // We'll add a secret simulation feature for demo purposes: 
  // clicking the clock 5 times automatically "approves" the application.
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks >= 5) {
      toast.success("Application Approved (Simulation)!");
      setTimeout(() => navigate('/provider'), 1000);
    }
  }, [clicks, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-6 text-center">
      
      <div 
        className="relative mb-8 mt-12 cursor-pointer"
        onClick={() => setClicks(c => c + 1)}
      >
        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
          <Clock size={48} className="text-accent" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-sm">
          <MoreHorizontal size={16} className="text-muted-foreground animate-bounce" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-foreground mb-3 animate-fade-in-up">
        Under Review
      </h1>
      
      <p className="text-sm text-muted-foreground leading-relaxed max-w-[300px] mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Our team reviews every application within 24-48 hours. We'll send you a push notification when you are approved!
      </p>

      {/* Checklist */}
      <div className="w-full max-w-[320px] bg-card border border-border rounded-2xl p-5 mb-10 animate-fade-in-up shadow-sm text-left" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Verification Steps</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-success" />
            <span className="text-sm font-semibold text-foreground">Aadhaar verified</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-success" />
            <span className="text-sm font-semibold text-foreground">PAN verified</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-success" />
            <span className="text-sm font-semibold text-foreground">Bank account verified</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-success" />
            <span className="text-sm font-semibold text-foreground">Video uploaded</span>
          </div>
          
          <div className="h-px bg-border my-2" />
          
          <div className="flex items-center gap-3">
            <div className="w-[18px] h-[18px] rounded-full border-2 border-accent border-r-transparent animate-spin flex-shrink-0" />
            <span className="text-sm font-bold text-accent">Admin review (pending)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[320px] gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors">
          <BellRing size={16} className="text-primary" />
          <span className="text-sm font-bold text-primary">Notify me when ready</span>
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border hover:bg-muted transition-colors">
          <MessageCircleQuestion size={16} className="text-muted-foreground" />
          <span className="text-sm font-bold text-foreground">Contact Support</span>
        </button>
      </div>

      <p className="text-xs text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        You can close the app and come back later.
      </p>
      
    </div>
  );
};

export default PendingApproval;
