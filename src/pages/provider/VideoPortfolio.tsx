import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Video, Camera, ImagePlus, X, Play, RotateCcw,
  CheckCircle2, ChevronRight, Clock, FileText, Upload,
  Trash2, Plus, Sparkles, AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface PhotoPair {
  id: string;
  before: string | null;
  after: string | null;
  caption: string;
}

interface Certificate {
  id: string;
  name: string;
  uri: string;
}

const VideoPortfolio = () => {
  const navigate = useNavigate();

  // Video state
  const [videoState, setVideoState] = useState<'idle' | 'recording' | 'recorded' | 'uploaded'>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  // Photos state
  const [photoPairs, setPhotoPairs] = useState<PhotoPair[]>([]);

  // Certificates state
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Recording simulation
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = () => {
    setVideoState('recording');
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 30) {
          stopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setVideoState('recorded');
    setVideoUri('simulated-video.mp4'); 
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, []);

  const resetRecording = () => {
    setVideoState('idle');
    setRecordingSeconds(0);
    setVideoUri(null);
  };

  const acceptVideo = async () => {
    setVideoState('uploaded');
  };

  // Photo pair management
  const addPhotoPair = () => {
    if (photoPairs.length >= 5) {
      toast.error('You can upload up to 5 before/after photo pairs.');
      return;
    }
    const id = Date.now().toString();
    setPhotoPairs([...photoPairs, { id, before: null, after: null, caption: '' }]);
  };

  const removePhotoPair = (id: string) => {
    setPhotoPairs(photoPairs.filter((p) => p.id !== id));
  };

  // Certificate management
  const addCertificate = () => {
    if (certificates.length >= 5) {
      toast.error('You can upload up to 5 certificates.');
      return;
    }
    const id = Date.now().toString();
    setCertificates([...certificates, { id, name: 'ITI Certificate.pdf', uri: 'cert.pdf' }]);
  };

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  const canProceed = videoState === 'uploaded';

  const handleNext = () => {
    navigate('/provider/gps-consent');
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Allow "Enter" key to proceed if allowed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canProceed]);

  return (
    <div className="flex flex-col min-h-screen bg-[#EEF2F7]">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={22} className="text-[#152E4B]" strokeWidth={2.5} />
        </button>
        <h1 className="text-[17px] font-bold text-[#152E4B]">Video Portfolio</h1>
        <span className="text-xs font-semibold text-gray-500">Step 4 of 6</span>
      </div>

      <div className="flex-1 p-5 pb-20 space-y-8 overflow-y-auto">
        {/* ═══ SECTION 1: VIDEO INTRODUCTION ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#152E4B] flex items-center justify-center">
              <Video size={14} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#152E4B]">Video Introduction</h2>
              <p className="text-xs text-gray-500 mt-0.5">Required · 30 seconds max</p>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(3,9,22,0.06)]">
            {/* Idle state */}
            {videoState === 'idle' && (
              <>
                <div className="rounded-2xl overflow-hidden mb-4 h-[260px] bg-[#1a1a1a] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-3 w-full h-full bg-gray-100">
                    <Camera size={48} className="text-gray-400" strokeWidth={1.5} />
                    <p className="text-[13px] text-gray-500">Camera preview will appear here</p>
                  </div>
                </div>

                <div className="flex bg-amber-500/10 rounded-xl p-3.5 mb-4 border border-amber-500/20">
                  <Sparkles size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 ml-2.5">
                    <p className="text-xs font-bold text-[#152E4B] mb-1">What to say:</p>
                    <p className="text-xs text-gray-500 leading-relaxed italic">
                      "Hi, I'm [your name]. I've been a [your service] for [X] years. I specialize in [your specialty]. I'm reliable and always clean up after the job."
                    </p>
                  </div>
                </div>

                <button 
                  onClick={startRecording}
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors rounded-xl py-4 flex items-center justify-center gap-2.5"
                >
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <span className="text-[15px] font-bold text-white">Start Recording</span>
                </button>
              </>
            )}

            {/* Recording state */}
            {videoState === 'recording' && (
              <>
                <div className="rounded-2xl overflow-hidden mb-4 h-[260px] bg-[#0a0a0a] relative flex items-center justify-center">
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600/90 px-2.5 py-1 rounded-md z-10">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[11px] font-extrabold text-white tracking-widest">REC</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <Camera size={48} className="text-gray-500" strokeWidth={1.5} />
                    <p className="text-[13px] text-gray-400">Recording...</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 mb-2.5">
                  <Clock size={18} className="text-red-600" />
                  <span className="text-2xl font-bold text-red-600 tabular-nums">{formatTime(recordingSeconds)}</span>
                  <span className="text-base font-medium text-gray-400"> / 00:30</span>
                </div>

                <div className="h-1.5 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${(recordingSeconds / 30) * 100}%` }}
                  />
                </div>

                <button 
                  onClick={stopRecording}
                  className="w-full bg-[#030916] hover:bg-black active:bg-neutral-800 transition-colors rounded-xl py-4 flex items-center justify-center gap-2.5"
                >
                  <div className="w-3.5 h-3.5 rounded-sm bg-red-600" />
                  <span className="text-[15px] font-bold text-white">Stop Recording</span>
                </button>
              </>
            )}

            {/* Recorded state */}
            {videoState === 'recorded' && (
              <>
                <div className="rounded-2xl overflow-hidden mb-4 h-[260px] bg-[#0a0a0a] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 w-full h-full justify-center">
                    <Play size={48} className="text-white ml-2" strokeWidth={1.5} />
                    <p className="text-[13px] text-gray-400">{formatTime(recordingSeconds)} recorded</p>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors">
                    <Play size={18} className="text-[#152E4B]" />
                    <span className="text-[13px] font-bold text-[#152E4B]">Play</span>
                  </button>

                  <button 
                    onClick={resetRecording}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw size={18} className="text-[#152E4B]" />
                    <span className="text-[13px] font-bold text-[#152E4B]">Re-record</span>
                  </button>

                  <button 
                    onClick={acceptVideo}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-emerald-600 border border-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle2 size={18} className="text-white" />
                    <span className="text-[13px] font-bold text-white">Accept</span>
                  </button>
                </div>
              </>
            )}

            {/* Uploaded state */}
            {videoState === 'uploaded' && (
              <div className="flex flex-col items-center py-6 gap-2">
                <CheckCircle2 size={40} className="text-emerald-600 mb-1" fill="currentColor" />
                <h3 className="text-xl font-bold text-[#152E4B]">Video uploaded!</h3>
                <p className="text-[13px] text-gray-500 text-center leading-relaxed max-w-[280px]">
                  Your 30-second intro is ready. Customers will see this before booking you.
                </p>
                <button 
                  onClick={resetRecording}
                  className="flex items-center gap-1.5 mt-2 hover:opacity-80 transition-opacity"
                >
                  <RotateCcw size={14} className="text-[#152E4B]" />
                  <span className="text-[13px] font-semibold text-[#152E4B]">Re-record video</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ═══ SECTION 2: BEFORE/AFTER PHOTOS ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#A95D06] flex items-center justify-center">
              <ImagePlus size={14} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#152E4B]">Before & After Photos</h2>
              <p className="text-xs text-gray-500 mt-0.5">Optional · Up to 5 pairs</p>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(3,9,22,0.06)]">
            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
              Show your best work. Upload before and after photos from past jobs to build trust with customers.
            </p>

            {photoPairs.map((pair, index) => (
              <div key={pair.id} className="bg-gray-100 rounded-xl p-3.5 mb-3">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[13px] font-bold text-[#152E4B]">Job {index + 1}</span>
                  <button onClick={() => removePhotoPair(pair.id)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2.5">
                  <div className="flex-1">
                    <div className="h-[90px] rounded-lg bg-white border border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                      <Camera size={20} className="text-gray-400" />
                      <span className="text-[10px] font-semibold text-gray-400">Before</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                  <div className="flex-1">
                    <div className="h-[90px] rounded-lg bg-white border border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                      <Camera size={20} className="text-gray-400" />
                      <span className="text-[10px] font-semibold text-gray-400">After</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={addPhotoPair}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-[#152E4B]/30 bg-white hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} className="text-[#152E4B]" />
              <span className="text-sm font-bold text-[#152E4B]">
                {photoPairs.length === 0 ? 'Add Before & After Photos' : 'Add Another Pair'}
              </span>
            </button>
          </div>
        </section>

        {/* ═══ SECTION 3: CERTIFICATES ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <FileText size={14} className="text-neutral-900" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#152E4B]">Certificates & Licenses</h2>
              <p className="text-xs text-gray-500 mt-0.5">Optional · PDF or image</p>
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(3,9,22,0.06)]">
            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
              Upload any professional certifications, trade licenses, or training certificates. These boost your profile credibility.
            </p>

            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center gap-3 bg-gray-100 rounded-xl p-3.5 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#152E4B]/5 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-[#152E4B]" />
                </div>
                <span className="flex-1 text-sm font-semibold text-[#152E4B] truncate">
                  {cert.name}
                </span>
                <button onClick={() => removeCertificate(cert.id)} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors shrink-0">
                  <X size={18} className="text-gray-400" />
                </button>
              </div>
            ))}

            <button 
              onClick={addCertificate}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-[#152E4B]/30 bg-white hover:bg-gray-50 transition-colors mt-1"
            >
              <Upload size={18} className="text-[#152E4B]" />
              <span className="text-sm font-bold text-[#152E4B]">Upload Certificate</span>
            </button>

            <div className="mt-3.5 p-3 rounded-xl bg-gray-100">
              <p className="text-[11px] font-bold text-[#152E4B] mb-1">Examples:</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                ITI certificate, electrician license, pest control certification, plumbing trade certificate, safety training diploma
              </p>
            </div>
          </div>
        </section>

        {/* ═══ CONTINUE BUTTON ═══ */}
        <section className="pt-4">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all ${
              canProceed 
                ? 'bg-[#152E4B] hover:bg-[#1C3D63] shadow-md' 
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            <span className={`text-base font-bold ${canProceed ? 'text-white' : 'text-gray-400'}`}>
              Continue to GPS Consent
            </span>
            <ChevronRight size={18} className={canProceed ? 'text-white' : 'text-gray-400'} />
          </button>

          {!canProceed && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <AlertCircle size={14} className="text-gray-400" />
              <p className="text-xs text-gray-400">Record and accept your video introduction to continue</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VideoPortfolio;
