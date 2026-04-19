import { useState } from "react";
import { Heart, Check, ChevronRight, Sparkles, Car, Home, Shield, Clock, Star } from "lucide-react";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

interface PlanService {
  icon: typeof Heart;
  label: string;
  qty: number;
  unit: string;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  savings: string;
  services: PlanService[];
  extras: string[];
  highlight: boolean;
  badge?: string;
  color: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic Care",
    tagline: "Essential home maintenance",
    price: "₹499",
    period: "/month",
    savings: "Save ₹200",
    services: [
      { icon: Sparkles, label: "House Cleaning", qty: 1, unit: "session" },
      { icon: Car, label: "Car Wash", qty: 1, unit: "wash" },
    ],
    extras: [
      "Priority booking slots",
      "WhatsApp support",
    ],
    highlight: false,
    color: "#152E4B",
  },
  {
    id: "standard",
    name: "Home Care Plus",
    tagline: "Most popular for families",
    price: "₹999",
    period: "/month",
    savings: "Save ₹600",
    services: [
      { icon: Sparkles, label: "Deep House Cleaning", qty: 2, unit: "sessions" },
      { icon: Car, label: "Car Wash & Interior", qty: 1, unit: "wash" },
      { icon: Home, label: "Kitchen Deep Clean", qty: 1, unit: "session" },
    ],
    extras: [
      "10% off additional bookings",
      "Dedicated cleaner assigned",
      "Flexible rescheduling",
      "24/7 chat support",
    ],
    highlight: true,
    badge: "BEST VALUE",
    color: "#152E4B",
  },
  {
    id: "premium",
    name: "Premium Estate",
    tagline: "Complete home management",
    price: "₹1,999",
    period: "/month",
    savings: "Save ₹1,500",
    services: [
      { icon: Sparkles, label: "Full House Cleaning", qty: 4, unit: "sessions" },
      { icon: Car, label: "Car Wash & Detailing", qty: 2, unit: "washes" },
      { icon: Home, label: "Kitchen Deep Clean", qty: 2, unit: "sessions" },
      { icon: Shield, label: "Pest Control", qty: 1, unit: "treatment" },
    ],
    extras: [
      "20% off all additional services",
      "Same-day emergency booking",
      "Dedicated account manager",
      "Family plan (4 members)",
      "Free rescheduling anytime",
    ],
    highlight: false,
    badge: "PREMIUM",
    color: "#A95D06",
  },
];

const HomeCare = () => {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="min-h-full flex flex-col bg-[#F5F6FA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#152E4B] to-[#1C3D63] px-5 pt-7 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={20} className="text-[#F59E0B]" fill="currentColor" />
            <h1 className="text-2xl font-extrabold text-white">Home Care Plans</h1>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Bundled services delivered to your door. Save up to 40% vs individual bookings.
          </p>

          {/* Stats bar */}
          <div className="flex gap-4 mt-5 bg-white/10 rounded-xl p-3">
            <div className="flex items-center gap-2 flex-1">
              <Clock size={14} className="text-amber-400" />
              <div>
                <p className="text-white font-bold text-[13px]">Scheduled</p>
                <p className="text-white/50 text-[10px]">Auto-booking</p>
              </div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="flex items-center gap-2 flex-1">
              <Star size={14} className="text-amber-400" fill="currentColor" />
              <div>
                <p className="text-white font-bold text-[13px]">Top Rated</p>
                <p className="text-white/50 text-[10px]">Vetted pros only</p>
              </div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="flex items-center gap-2 flex-1">
              <Shield size={14} className="text-amber-400" />
              <div>
                <p className="text-white font-bold text-[13px]">Insured</p>
                <p className="text-white/50 text-[10px]">₹5L coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="flex-1 px-5 -mt-3 space-y-4 overflow-y-auto">
        {plans.map((plan) => {
          const isActive = selected === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                plan.highlight
                  ? isActive
                    ? "border-[#152E4B] shadow-[0_4px_30px_rgba(21,46,75,0.15)] bg-white"
                    : "border-[#152E4B]/30 bg-white shadow-md"
                  : isActive
                    ? "border-[#152E4B] shadow-lg bg-white"
                    : "border-[#E8EBF0] bg-white"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[9px] font-extrabold tracking-[0.15em] uppercase ${
                  plan.id === "premium"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-[#152E4B] text-white"
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-5">
                {/* Plan header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#030916]">{plan.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{plan.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl font-extrabold text-[#030916]">{plan.price}</span>
                      <span className="text-[11px] text-gray-400">{plan.period}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {plan.savings}
                    </span>
                  </div>
                </div>

                {/* Services included */}
                <div className="bg-[#F5F6FA] rounded-xl p-3.5 mb-4">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2.5">
                    Services Included
                  </p>
                  <div className="space-y-2.5">
                    {plan.services.map((svc, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          <svc.icon size={16} className="text-[#152E4B]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-bold text-[#030916]">{svc.label}</p>
                        </div>
                        <span className="text-[12px] font-extrabold text-[#152E4B] bg-[#152E4B]/10 px-2 py-0.5 rounded-md">
                          {svc.qty}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div className="space-y-2 mb-4">
                  {plan.extras.map((extra, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className="text-[12px] text-gray-600">{extra}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success(`Subscribed to ${plan.name}!`);
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-[14px] transition-all active:scale-[0.97] flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? "bg-[#152E4B] text-white hover:bg-[#1C3D63] shadow-md"
                      : isActive
                        ? "bg-[#152E4B] text-white hover:bg-[#1C3D63]"
                        : "bg-[#F5F6FA] text-[#152E4B] border border-[#E8EBF0] hover:bg-[#E8EBF0]"
                  }`}
                >
                  {plan.id === "basic" ? "Get Started" : plan.id === "standard" ? "Subscribe Now" : "Go Premium"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Bottom note */}
        <div className="text-center py-4">
          <p className="text-[11px] text-gray-400 leading-relaxed px-4">
            All plans auto-renew monthly. Cancel anytime from Settings. Services are scheduled based on your preferred day.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeCare;
