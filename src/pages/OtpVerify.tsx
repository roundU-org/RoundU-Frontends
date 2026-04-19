import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const OtpVerify = () => {
  const navigate = useNavigate();
  const { phone, dispatch } = useApp();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!phone) navigate("/login", { replace: true });
    refs.current[0]?.focus();
  }, [phone, navigate]);

  const handleChange = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < 3) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    if (otp.join("").length < 4) {
      toast.error("Enter the 4-digit code");
      return;
    }
    dispatch({ type: "SET_AUTH", value: true });
    toast.success("Verified successfully");
    navigate("/role", { replace: true });
  };

  return (
    <div className="min-h-full flex flex-col px-6 py-8 bg-background">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center text-foreground active:scale-95"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="mt-10 mb-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-foreground leading-tight">Verify your number</h1>
        <p className="text-muted-foreground mt-3 text-sm">
          We sent a 4-digit code to <span className="font-semibold text-foreground">+91 {phone}</span>
        </p>
      </div>

      <div className="flex gap-3 justify-center mb-6 animate-fade-in-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
        {otp.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            className="w-14 h-16 text-center text-2xl font-extrabold rounded-2xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mb-6">
        Didn't get a code? <button className="font-semibold text-primary">Resend</button>
      </p>

      <button
        onClick={handleVerify}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-secondary active:scale-[0.98] transition-all"
      >
        Verify & Continue
      </button>

      <div className="mt-8 flex items-center gap-2 justify-center text-xs text-muted-foreground">
        <ShieldCheck size={14} className="text-success" />
        Secured with end-to-end encryption
      </div>
    </div>
  );
};

export default OtpVerify;
