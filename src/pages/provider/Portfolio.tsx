import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Image as ImageIcon } from "lucide-react";
import ProviderBottomNav from "@/components/ProviderBottomNav";
import { toast } from "sonner";

const Portfolio = () => {
  const navigate = useNavigate();

  const mockPortfolio = [
    { id: 1, title: "AC Repair", date: "22 Oct 2023", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" },
    { id: 2, title: "Electrical Wiring", date: "15 Oct 2023", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop" },
    { id: 3, title: "Switchboard Fix", date: "10 Oct 2023", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop" },
    { id: 4, title: "Fan Installation", date: "05 Oct 2023", image: "https://images.unsplash.com/photo-1591130901921-3f0652bb3915?w=400&h=300&fit=crop" },
    { id: 5, title: "Heater Repair", date: "01 Oct 2023", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop" },
    { id: 6, title: "Kitchen Lighting", date: "28 Sep 2023", image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop" },
  ];

  const handleUpload = () => {
    toast.info("Upload functionality coming soon!");
  };

  return (
    <div className="min-h-full flex flex-col bg-background pb-24">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 bg-white sticky top-0 z-10 border-b border-border shadow-sm">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-input border border-border flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground leading-tight">My Portfolio</h1>
          <p className="text-xs text-muted-foreground">Showcase your best work</p>
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {mockPortfolio.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm group active:scale-[0.98] transition-transform">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleUpload}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center active:scale-90 transition-transform z-20"
      >
        <Plus size={28} />
      </button>

      <ProviderBottomNav />
    </div>
  );
};

export default Portfolio;
