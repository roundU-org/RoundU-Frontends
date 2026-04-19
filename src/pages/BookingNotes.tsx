import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Square, Play, Trash2, ImagePlus, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

const BookingNotes = () => {
  const navigate = useNavigate();
  const { selectedProvider, selectedDate, selectedTime, dispatch } = useApp();
  const [notes, setNotes] = useState("");

  // Voice record state
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioBlob, setAudioBlob] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Photo state
  const [photos, setPhotos] = useState<string[]>([]);

  const addPhoto = () => {
    if (photos.length >= 2) return;
    // Mocking addition of a photo
    const mockImages = [
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop"
    ];
    setPhotos([...photos, mockImages[photos.length]]);
  };

  const removePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimer(0);
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev >= 9) {
          stopRecording();
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setAudioBlob(true);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const deleteRecording = () => {
    setAudioBlob(false);
    setTimer(0);
  };

  if (!selectedProvider || !selectedDate || !selectedTime) {
    navigate("/booking/date", { replace: true });
    return null;
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't trigger 'Enter' if the user is typing in the textarea
      if (e.key === "Enter" && document.activeElement?.tagName !== "TEXTAREA") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [notes]);

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
          rows={5}
          className="w-full p-4 rounded-2xl bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />

        {/* Voice Note Section */}
        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground">Voice Description (Optional)</h3>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">10s max</span>
          </div>

          {!isRecording && !audioBlob ? (
            <button
              onClick={startRecording}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-colors"
            >
              <Mic size={18} />
              <span className="text-[13px] font-bold">Hold to Record Voice</span>
            </button>
          ) : isRecording ? (
            <div className="w-full flex flex-col items-center justify-center gap-3 py-4 bg-red-50 rounded-xl border-2 border-red-200 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[13px] font-bold text-red-600">Recording... {timer}s</span>
              </div>
              <button 
                onClick={stopRecording}
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white"
              >
                <Square size={16} fill="white" />
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center gap-3 py-3 px-4 bg-primary/5 rounded-xl border border-primary/20">
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Play size={16} fill="white" />
              </button>
              <div className="flex-1 h-1.5 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-primary" />
              </div>
              <span className="text-[11px] font-bold text-primary">0:05 / 0:10</span>
              <button 
                onClick={deleteRecording}
                className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Photo Upload Section */}
        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground">Attach Photos (Optional)</h3>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{photos.length}/2</span>
          </div>

          <div className="flex gap-3">
            {photos.map((url, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border">
                <img src={url} alt={`Job detail ${i+1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {photos.length < 2 && (
              <button
                onClick={addPhoto}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-1.5 text-primary hover:bg-primary/5 transition-colors"
              >
                <ImagePlus size={20} />
                <span className="text-[10px] font-bold">Add Photo</span>
              </button>
            )}
          </div>
        </div>

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
