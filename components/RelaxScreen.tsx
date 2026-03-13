
import React, { useEffect } from 'react';

interface RelaxScreenProps {
  onBack: () => void;
}

const RelaxScreen: React.FC<RelaxScreenProps> = ({ onBack }) => {
  useEffect(() => {
    const handleKeyDown = () => {
      onBack();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-8 animate-in fade-in duration-[1500ms] ease-in-out cursor-none"
      onClick={onBack}
    >
      <div className="w-[45vw] aspect-video max-w-5xl rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.05)] border border-white/5 mb-16 relative group transition-transform duration-[3000ms]">
        <img 
          src="/zorza.jpg" 
          alt="Deep Relaxation" 
          className="w-full h-full object-cover opacity-60 filter grayscale-[20%] hover:grayscale-0 transition-all duration-[3000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
      </div>

      <div className="text-center space-y-6">
        <h3 className="text-5xl font-extralight text-emerald-100/40 tracking-[0.3em] uppercase">Breathe</h3>
        <p className="text-slate-600 text-lg font-light tracking-widest animate-pulse duration-[3000ms]">
          Hit any key when you're back
        </p>
      </div>

      <div className="mt-24 flex gap-6 opacity-10">
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <div className="w-1 h-1 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default RelaxScreen;
