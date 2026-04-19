import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, HelpCircle, Lightbulb } from "lucide-react";
import { services, getServiceById } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

const ServiceSelection = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  
  const service = getServiceById(serviceId || "");
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  if (!service) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-lg font-bold text-foreground mb-2">Service not found</h2>
        <button onClick={() => navigate("/home")} className="text-primary font-bold">Go back home</button>
      </div>
    );
  }

  const relatedServices = (service.relatedServiceIds || [])
    .map(id => getServiceById(id))
    .filter(Boolean);

  const handleNext = () => {
    dispatch({ type: "SELECT_SERVICE", id: service.id });
    // We can potentially store the selected problem in state too
    navigate(`/providers/${service.id}`);
  };

  const handleSuggestionSelect = (id: string) => {
    navigate(`/service-select/${id}`, { replace: true });
    setSelectedProblem(null);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [service.id]);

  return (
    <div className="min-h-full flex flex-col bg-[#F5F6FA] pb-24 relative">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3 bg-white border-b border-[#F0F2F5] animate-fade-in">
        <button 
          onClick={() => navigate("/home")} 
          className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} className="text-[#152E4B]" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-[#030916]">{service.label}</h1>
          <p className="text-[11px] text-gray-400 font-medium">Fine-tune your request</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-5 pb-5 px-5 space-y-8">
        
        {/* Section: Problems */}
        {service.commonProblems && service.commonProblems.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={18} className="text-[#152E4B]" />
              <h2 className="text-[16px] font-extrabold text-[#030916]">What's the problem?</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {service.commonProblems.map((problem) => (
                <button
                  key={problem}
                  onClick={() => setSelectedProblem(problem)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedProblem === problem 
                      ? "border-[#152E4B] bg-[#152E4B]/5 shadow-sm" 
                      : "border-white bg-white hover:border-gray-200"
                  }`}
                >
                  <span className={`text-sm font-bold ${selectedProblem === problem ? "text-[#152E4B]" : "text-[#030916]"}`}>
                    {problem}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedProblem === problem ? "border-[#152E4B] bg-[#152E4B]" : "border-gray-200"}`}>
                    {selectedProblem === problem && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
              <button
                onClick={() => setSelectedProblem("other")}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedProblem === "other" 
                    ? "border-[#152E4B] bg-[#152E4B]/5 shadow-sm" 
                    : "border-white bg-white hover:border-gray-200"
                }`}
              >
                <span className={`text-sm font-bold ${selectedProblem === "other" ? "text-[#152E4B]" : "text-[#030916]"}`}>
                  Something else / Other
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedProblem === "other" ? "border-[#152E4B] bg-[#152E4B]" : "border-gray-200"}`}>
                  {selectedProblem === "other" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Section: Suggestions */}
        {relatedServices.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-[#A95D06]" />
              <h2 className="text-[16px] font-extrabold text-[#030916]">You might also need</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {relatedServices.map((rel) => rel && (
                <button
                  key={rel.id}
                  onClick={() => handleSuggestionSelect(rel.id)}
                  className="min-w-[140px] bg-white rounded-2xl p-4 text-left border border-white hover:border-gray-200 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.97]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5F6FA] flex items-center justify-center mb-3">
                    <rel.icon size={20} className="text-[#152E4B]" />
                  </div>
                  <h3 className="text-[13px] font-bold text-[#030916] leading-tight">{rel.label}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">Suggested</p>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#F5F6FA] via-[#F5F6FA] to-transparent pointer-events-none">
        <button
          onClick={handleNext}
          className="w-full max-w-md mx-auto pointer-events-auto flex items-center justify-center gap-2 bg-[#152E4B] hover:bg-[#1C3D63] text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
        >
          <span>Find Specialists</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
