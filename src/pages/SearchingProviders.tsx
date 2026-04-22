import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

/**
 * 🎨 DESIGN SYSTEM & SPEC-DRIVEN
 */

const SECONDARY_STATUS_MESSAGES = [
  "Scanning your area...",
  "Matching best experts...",
  "Checking availability...",
  "Almost there...",
  "Verifying credentials...",
  "Calculating distance..."
];

const INITIALS_POOL = ["RK", "VM", "AS", "PL", "SN", "TR", "MB"];

interface ProviderDot {
  id: number;
  initials: string;
  angle: number;
  distance: number;
  startTime: number;
  duration: number;
}

const SearchingProviders = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [dots, setDots] = useState<ProviderDot[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [isLongWait, setIsLongWait] = useState(false);
  
  const nextId = useRef(0);
  const startTime = useRef(Date.now());

  // Logic: Success transition (Simulated)
  useEffect(() => {
    const successTimer = setTimeout(() => {
      navigate(`/providers/${serviceId}`);
    }, 8500);

    const longWaitTimer = setTimeout(() => {
      setIsLongWait(true);
    }, 5000);

    return () => {
      clearTimeout(successTimer);
      clearTimeout(longWaitTimer);
    };
  }, [navigate, serviceId]);

  // Logic: Status Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % SECONDARY_STATUS_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Logic: Progress Dots Walking
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDotIndex((prev) => (prev + 1) % 5);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Logic: Provider Spawning
  useEffect(() => {
    const spawn = () => {
      const id = ++nextId.current;
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 110; // 100-210px
      const duration = 2200 + Math.random() * 1200; // 2200-3400ms
      const initials = INITIALS_POOL[Math.floor(Math.random() * INITIALS_POOL.length)];
      
      const newDot: ProviderDot = {
        id,
        initials,
        angle,
        distance,
        startTime: Date.now(),
        duration
      };

      setDots((prev) => [...prev, newDot]);
      setFoundCount((prev) => prev + 1);

      // Cleanup dot after it finishes its drift
      setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== id));
      }, duration + 500);
    };

    // Pre-spawn
    spawn();
    const t1 = setTimeout(spawn, 300);
    const t2 = setTimeout(spawn, 600);

    // Continuous spawn
    const interval = setInterval(spawn, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col font-['DM_Sans',sans-serif] overflow-hidden select-none">
      
      {/* Top Bar */}
      <div className="px-5 pt-6 pb-2 flex items-center gap-4 relative z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 active:scale-90 transition-transform"
        >
          <ArrowLeft size={20} className="text-[#152E4B]" />
        </button>
        <h1 className="text-[17px] font-[600] text-[#030916]">Finding your specialist</h1>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative min-h-[340px] flex items-center justify-center">
        
        {/* SVG Map Canvas */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg 
            width="380" 
            height="340" 
            viewBox="0 0 380 340" 
            className="w-full h-full max-w-md"
          >
            {/* Background */}
            <rect width="380" height="340" fill="#E8EEF5" />
            
            {/* Grid Lines */}
            <g stroke="#D5DFE8" strokeWidth="0.5">
              {[...Array(13)].map((_, i) => (
                <line key={`v-${i}`} x1={i * 30 + 10} y1="0" x2={i * 30 + 10} y2="340" />
              ))}
              {[...Array(12)].map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 30 + 10} x2="380" y2={i * 30 + 10} />
              ))}
            </g>

            {/* Buildings (Rounded Rects) */}
            <rect x="40" y="50" width="30" height="20" rx="4" fill="#D8E3EC" />
            <rect x="280" y="80" width="45" height="30" rx="6" fill="#CDD9E4" />
            <rect x="60" y="240" width="40" height="40" rx="8" fill="#D8E3EC" />
            <rect x="300" y="220" width="25" height="40" rx="5" fill="#CDD9E4" />
            <rect x="150" y="280" width="60" height="25" rx="6" fill="#D8E3EC" />
            <rect x="100" y="100" width="30" height="30" rx="6" fill="#CDD9E4" opacity="0.6" />

            {/* Road Paths */}
            <path d="M0,170 Q190,170 380,170" stroke="#C8D6E2" strokeWidth="4" fill="none" />
            <path d="M190,0 Q190,170 190,340" stroke="#C8D6E2" strokeWidth="4" fill="none" />
            <path d="M50,0 C80,150 300,190 330,340" stroke="#C8D6E2" strokeWidth="3" fill="none" opacity="0.5" />

            {/* Ripple Rings */}
            <circle cx="190" cy="170" r="0" fill="none" stroke="#152E4B" strokeWidth="1.5">
               <animate attributeName="r" from="0" to="200" dur="3s" begin="0s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1" />
               <animate attributeName="opacity" from="0.5" to="0" dur="3s" begin="0s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="170" r="0" fill="none" stroke="#152E4B" strokeWidth="1">
               <animate attributeName="r" from="0" to="200" dur="3s" begin="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1" />
               <animate attributeName="opacity" from="0.35" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="190" cy="170" r="0" fill="none" stroke="#F59E0B" strokeWidth="0.8">
               <animate attributeName="r" from="0" to="200" dur="3s" begin="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1" />
               <animate attributeName="opacity" from="0.3" to="0" dur="3s" begin="2s" repeatCount="indefinite" />
            </circle>

            {/* Center Pin */}
            <circle cx="190" cy="170" r="18" fill="rgba(21,46,75,0.08)" />
            <g className="animate-pin-pulse">
               <circle cx="190" cy="170" r="12" fill="white" stroke="#152E4B" strokeWidth="1.5" />
               <path d="M190,175 L186,169 A4,4 0 1,1 194,169 Z" fill="#152E4B" transform="translate(0, -2)" />
               <circle cx="190" cy="168.5" r="1.5" fill="white" />
            </g>
          </svg>
        </div>

        {/* Found Counter Badge (Top Right) */}
        <div className="absolute top-4 right-4 bg-white border border-[#152E4B1A] py-1.5 px-3.5 rounded-[10px] shadow-sm z-10 animate-fade-in">
           <span className="text-[11px] font-[500] text-[#152E4B]">{foundCount} found nearby</span>
        </div>

        {/* Floating Provider Dots Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
          {dots.map((dot) => (
            <div 
              key={dot.id}
              className="absolute animate-provider-dot"
              style={{
                '--angle': `${dot.angle}rad`,
                '--dist': `${dot.distance}px`,
                '--duration': `${dot.duration}ms`,
                top: `50%`,
                left: `50%`,
                transform: `rotate(${dot.angle}rad) translateX(${dot.distance}px)`
              } as any}
            >
              <div className="w-[30px] h-[30px] rounded-full bg-white border border-[#152E4B2E] flex items-center justify-center shadow-sm -rotate-dot">
                 <span className="text-[9px] font-[600] text-[#152E4B]">{dot.initials}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="bg-white rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] px-6 pt-3 pb-8 relative z-20 transition-transform">
        <div className="w-[36px] h-1.5 bg-[#E1E8EF] rounded-full mx-auto mb-6" />
        
        <div className="flex flex-col items-center text-center">
          
          {foundCount >= 3 && (foundCount % 3 === 0 || foundCount % 3 === 1) && (
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] px-4 py-1.5 rounded-full mb-4 animate-badge-up">
              <span className="text-[13px] font-[600] text-[#166534]">{foundCount} professionals found</span>
            </div>
          )}

          <h2 className="text-[18px] font-[600] text-[#030916] mb-1.5">Finding nearby professionals</h2>
          
          <div className="h-6 flex items-center justify-center overflow-hidden w-full relative">
             <p 
               key={statusIndex + (isLongWait ? 'wait' : '')} 
               className="text-[13px] text-[#7A8BA0] font-[400] animate-status-fade absolute"
             >
                {isLongWait ? "Still searching for the best providers near you..." : SECONDARY_STATUS_MESSAGES[statusIndex]}
             </p>
          </div>

          {/* Animated Progress Dots */}
          <div className="flex gap-2.5 my-6">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-[7px] h-[7px] rounded-full transition-all duration-300 ${i === activeDotIndex ? 'bg-[#F59E0B] scale-[1.35]' : 'bg-[#D1DCE8]'}`} 
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="w-full bg-[#F5F8FB] rounded-[12px] p-3 flex justify-between items-center mb-6">
            <TrustIndicator label="Verified pros" />
            <TrustIndicator label="Fast response" />
            <TrustIndicator label="Trusted service" />
          </div>

          <button 
            onClick={() => navigate(-1)}
            className="text-[14px] font-[600] text-[#7A8BA0] hover:text-[#152E4B] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pin-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        .animate-pin-pulse {
          animation: pin-pulse 2s ease-in-out infinite;
        }
        
        .animate-provider-dot {
          animation: provider-drift var(--duration) cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes provider-drift {
          0% { 
            transform: rotate(var(--angle)) translateX(var(--dist)) scale(0);
            opacity: 0;
          }
          15% {
            transform: rotate(var(--angle)) translateX(var(--dist)) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle)) translateX(0px) scale(0.6);
            opacity: 0;
          }
        }
        
        .-rotate-dot {
          transform: rotate(calc(-1 * var(--angle)));
        }

        @keyframes badge-up {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-badge-up {
          animation: badge-up 0.5s ease-out;
        }

        @keyframes status-fade {
          0% { opacity: 0; transform: translateY(8px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .animate-status-fade {
          animation: status-fade 1.8s ease-in-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const TrustIndicator = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-4 h-4 rounded-full bg-[#152E4B] flex items-center justify-center">
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="text-[11px] font-[500] text-[#152E4B]">{label}</span>
  </div>
);

export default SearchingProviders;
