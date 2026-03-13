
import React from 'react';
import { IntervalOption } from '../types';

interface AlertScreenProps {
  onRelaxNow: () => void;
  onDelayRelax: () => void;
  onClose: () => void;
  onDelayChange: (seconds: number) => void;
  delayIntervals: IntervalOption[];
}

const AlertScreen: React.FC<AlertScreenProps> = ({ 
  onRelaxNow, 
  onDelayRelax, 
  onClose, 
  onDelayChange, 
  delayIntervals 
}) => {
  return (
    <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in-95 duration-700 ease-out">
      <div className="w-full h-56 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
        <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors duration-1000"></div>
        <img 
          src="/hare_relax.JPG" 
          alt="Relaxation Scene" 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-white italic tracking-tighter">
          Hare says: <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">SlowDown</span>
        </h2>
        <p className="text-slate-400 text-sm font-medium tracking-wide opacity-70">A moment for yourself is never wasted.</p>
      </div>

      <div className="grid grid-cols-1 w-full gap-4">
        <button 
          onClick={onRelaxNow}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-5 rounded-2xl transition-all duration-500 shadow-xl shadow-emerald-950/40 transform hover:-translate-y-1 active:scale-[0.98]"
        >
          RelaxNow
        </button>

        <div className="flex gap-3">
          <button 
            onClick={onDelayRelax}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl transition-all duration-500 border border-white/5 hover:border-white/10"
          >
            DelayRelax
          </button>
          <select 
            onChange={(e) => onDelayChange(parseInt(e.target.value))}
            className="w-28 bg-slate-800 border border-white/10 rounded-2xl px-3 text-white outline-none cursor-pointer text-xs font-bold transition-all hover:border-emerald-500/50"
          >
            {delayIntervals.map(opt => (
              <option key={opt.seconds} value={opt.seconds}>
                {opt.label.includes('seconds') ? '6s' : opt.label.replace(' minutes', 'm')}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={onClose}
          className="w-full text-slate-500 hover:text-red-400 font-bold py-2 rounded-xl transition-all duration-500 text-xs uppercase tracking-widest mt-2"
        >
          CloseApp
        </button>
      </div>
    </div>
  );
};

export default AlertScreen;
