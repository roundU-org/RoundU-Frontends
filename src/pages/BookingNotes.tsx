import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";

const BookingNotes = () => {
  const navigate = useNavigate();
  const { selectedProvider, selectedDate, selectedTime, dispatch } = useApp();
  const [notes, setNotes] = useState("");

  if (!selectedProvider || !selectedDate || !selectedTime) {
    navigate("/booking/date", { replace: true });
    return null;
  }

  const handleNext = () => {
    dispatch({ type: "SET_NOTES", notes });
    navigate("/booking/payment");
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-24">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Step 3 of 3</p>
          <h1 className="text-lg font-bold text-foreground">Add Notes</h1>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-4">
        <p className="text-xs text-muted-foreground">
          Help your provider understand the job better (optional).
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Switchboard isn't working in the kitchen..."
          rows={6}
          className="w-full p-4 rounded-2xl bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />

        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <h3 className="text-xs font-bold text-foreground mb-3">Booking Summary</h3>
          <SummaryRow label="Provider" value={selectedProvider.name} />
          <SummaryRow label="Date" value={selectedDate} />
          <SummaryRow label="Time" value={selectedTime} />
          <SummaryRow label="Rate" value={`₹${selectedProvider.pricePerHr}/hr`} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-card border-t border-border">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:bg-secondary active:scale-[0.98] transition-all"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-xs font-semibold text-foreground">{value}</span>
  </div>
);

export default BookingNotes;
