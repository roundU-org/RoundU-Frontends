import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ShieldCheck, CheckCircle2, ChevronDown, Building2, CreditCard } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const DigiLockerKYC = () => {
  const navigate = useNavigate();
  const { user, providerRegistrationDraft, dispatch } = useApp();
  const { kyc } = providerRegistrationDraft;

  const [activeStep, setActiveStep] = useState<number>(kyc.aadhaarVerified ? (kyc.panVerified ? 3 : 2) : 1);

  // Aadhaar State
  const [aadhaar, setAadhaar] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [showAadhaarOtp, setShowAadhaarOtp] = useState(false);

  // PAN State
  const [pan, setPan] = useState('');

  // Bank State
  const [accNum, setAccNum] = useState('');
  const [accNumConfirm, setAccNumConfirm] = useState('');
  const [ifsc, setIfsc] = useState('');

  const verifyAadhaar = () => {
    if (aadhaar.length < 12) {
      toast.error('Enter valid 12-digit Aadhaar');
      return;
    }
    if (!showAadhaarOtp) {
      toast.success('OTP sent to Aadhaar linked mobile');
      setShowAadhaarOtp(true);
      return;
    }
    if (aadhaarOtp.length < 6) {
      toast.error('Enter valid 6-digit OTP');
      return;
    }
    dispatch({ type: 'UPDATE_KYC', patch: { aadhaarVerified: true } });
    toast.success('Aadhaar Verified Successfully');
    setActiveStep(2);
  };

  const verifyPan = () => {
    if (pan.length < 10) {
      toast.error('Enter valid 10-character PAN');
      return;
    }
    dispatch({ type: 'UPDATE_KYC', patch: { panVerified: true } });
    toast.success('PAN Verified Successfully');
    setActiveStep(3);
  };

  const verifyBank = () => {
    if (accNum.length < 8) {
      toast.error('Enter valid Account Number');
      return;
    }
    if (accNum !== accNumConfirm) {
      toast.error('Account numbers do not match');
      return;
    }
    if (ifsc.length < 11) {
      toast.error('Enter valid IFSC code');
      return;
    }
    dispatch({ type: 'UPDATE_KYC', patch: { bankVerified: true } });
    toast.success('Bank Account Verified Successfully (Penny drop test completed)');
  };

  const allVerified = kyc.aadhaarVerified && kyc.panVerified && kyc.bankVerified;

  const handleNext = () => {
    navigate('/provider/video-portfolio');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft size={22} className="text-foreground" strokeWidth={2.5} />
        </button>
        <h1 className="text-[17px] font-bold text-foreground mx-auto flex items-center justify-center gap-2">
          Verify Identity <ShieldCheck size={18} className="text-success" />
        </h1>
        <span className="text-xs font-semibold text-muted-foreground mr-1">Step 3 of 6</span>
      </div>

      <div className="flex-1 p-5 pb-28 space-y-5 overflow-y-auto">
        <div className="mb-2 animate-fade-in text-center">
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            We verify every provider through DigiLocker to ensure customer safety. This takes 2 minutes.
          </p>
        </div>

        {/* STEP 1: AADHAAR */}
        <div className={`rounded-2xl border transition-all duration-300 ${activeStep === 1 ? 'bg-card border-primary ring-1 ring-primary/20 shadow-md' : 'bg-muted/30 border-border'}`}>
          <div 
            onClick={() => setActiveStep(1)}
            className="p-4 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${kyc.aadhaarVerified ? 'bg-success text-success-foreground' : (activeStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}`}>
                {kyc.aadhaarVerified ? <CheckCircle2 size={16} /> : '1'}
              </div>
              <div>
                <h3 className={`font-bold ${activeStep === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>Aadhaar Verification</h3>
                {kyc.aadhaarVerified && <p className="text-[11px] text-success font-semibold">Verified successfully</p>}
              </div>
            </div>
            {!kyc.aadhaarVerified && <ChevronDown size={20} className={activeStep === 1 ? 'rotate-180 transition-transform text-foreground' : 'text-muted-foreground'} />}
          </div>

          {activeStep === 1 && !kyc.aadhaarVerified && (
            <div className="p-4 pt-0 border-t border-border animate-fade-in-up">
              <p className="text-xs text-muted-foreground mb-3">Enter your 12-digit Aadhaar number to fetch details via DigiLocker.</p>
              <input 
                type="number" 
                placeholder="Aadhaar Number" 
                value={aadhaar}
                disabled={showAadhaarOtp}
                onChange={(e) => setAadhaar(e.target.value)}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary text-foreground mb-3"
              />
              {showAadhaarOtp && (
                <input 
                  type="number" 
                  placeholder="6-digit OTP" 
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary text-foreground mb-3"
                />
              )}
              <button 
                onClick={verifyAadhaar}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all"
              >
                {showAadhaarOtp ? 'Verify OTP' : 'Send OTP'}
              </button>
            </div>
          )}
        </div>

        {/* STEP 2: PAN */}
        <div className={`rounded-2xl border transition-all duration-300 ${activeStep === 2 ? 'bg-card border-primary ring-1 ring-primary/20 shadow-md' : 'bg-muted/30 border-border'}`}>
          <div 
            onClick={() => { if (kyc.aadhaarVerified) setActiveStep(2) }}
            className={`p-4 flex items-center justify-between ${kyc.aadhaarVerified ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${kyc.panVerified ? 'bg-success text-success-foreground' : (activeStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}`}>
                {kyc.panVerified ? <CheckCircle2 size={16} /> : '2'}
              </div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold ${activeStep === 2 ? 'text-foreground' : 'text-muted-foreground'}`}>PAN Verification</h3>
                <CreditCard size={14} className="text-muted-foreground" />
              </div>
            </div>
            {!kyc.panVerified && <ChevronDown size={20} className={activeStep === 2 ? 'rotate-180 transition-transform text-foreground' : 'text-muted-foreground'} />}
          </div>

          {activeStep === 2 && !kyc.panVerified && (
            <div className="p-4 pt-0 border-t border-border animate-fade-in-up">
              <p className="text-xs text-muted-foreground mb-3">Enter 10-character PAN (e.g. ABCDE1234F) for identity match.</p>
              <input 
                type="text" 
                placeholder="PAN Number" 
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary text-foreground mb-3 uppercase"
                maxLength={10}
              />
              <button 
                onClick={verifyPan}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all"
              >
                Verify PAN
              </button>
            </div>
          )}
        </div>

        {/* STEP 3: BANK DETAILS */}
        <div className={`rounded-2xl border transition-all duration-300 ${activeStep === 3 ? 'bg-card border-primary ring-1 ring-primary/20 shadow-md' : 'bg-muted/30 border-border'}`}>
          <div 
            onClick={() => { if (kyc.panVerified) setActiveStep(3) }}
            className={`p-4 flex items-center justify-between ${kyc.panVerified ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${kyc.bankVerified ? 'bg-success text-success-foreground' : (activeStep === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}`}>
                {kyc.bankVerified ? <CheckCircle2 size={16} /> : '3'}
              </div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold ${activeStep === 3 ? 'text-foreground' : 'text-muted-foreground'}`}>Bank Account</h3>
                <Building2 size={14} className="text-muted-foreground" />
              </div>
            </div>
            {!kyc.bankVerified && <ChevronDown size={20} className={activeStep === 3 ? 'rotate-180 transition-transform text-foreground' : 'text-muted-foreground'} />}
          </div>

          {activeStep === 3 && !kyc.bankVerified && (
            <div className="p-4 pt-0 border-t border-border animate-fade-in-up">
              <p className="text-xs text-muted-foreground mb-3">Where should we send your earnings? (Penny drop verification)</p>
              
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={user.name}
                  disabled
                  className="w-full bg-muted border border-border rounded-xl p-3 text-sm focus:outline-none text-muted-foreground"
                />
                <input 
                  type="number" 
                  placeholder="Bank Account Number" 
                  value={accNum}
                  onChange={(e) => setAccNum(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary text-foreground"
                />
                <input 
                  type="number" 
                  placeholder="Confirm Account Number" 
                  value={accNumConfirm}
                  onChange={(e) => setAccNumConfirm(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary text-foreground"
                />
                <input 
                  type="text" 
                  placeholder="IFSC Code" 
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary text-foreground uppercase"
                />
              </div>

              <button 
                onClick={verifyBank}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all"
              >
                Verify Bank Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Continue button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
        <button
          onClick={handleNext}
          disabled={!allVerified}
          className={`w-full max-w-[390px] mx-auto pointer-events-auto flex items-center justify-center gap-2 py-4 rounded-2xl transition-all shadow-lg ${
            allVerified 
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
              : 'bg-muted text-muted-foreground cursor-not-allowed opacity-80 shadow-none'
          }`}
        >
          <span className="text-[15px] font-bold">Continue to Portfolio</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DigiLockerKYC;
