
import React from 'react';
import { IntervalOption } from '../types';

interface SetupScreenProps {
  onStart: () => void;
  onClose: () => void;
  onIntervalChange: (seconds: number) => void;
  intervals: IntervalOption[];
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onClose, onIntervalChange, intervals }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
      <div className="relative">
        <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <img 
          src="https://picsum.photos/seed/bunny-setup/200/200" 
          alt="SlowDown Hare Logo" 
          className="relative w-28 h-28 rounded-[2.5rem] border border-white/10 object-cover shadow-2xl"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-white tracking-tighter">
          SlowDown <span className="text-emerald-400">Hare</span>
        </h1>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] opacity-60">Rest your eyes, refresh your mind</p>
      </div>

      <div className="w-full space-y-6">
        <div className="flex flex-col items-start space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Activity Threshold</label>
          <div className="relative w-full group">
            <select 
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all duration-500 cursor-pointer appearance-none hover:bg-white/[0.06] hover:border-white/10"
              onChange={(e) => onIntervalChange(parseInt(e.target.value))}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.3)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.2rem center', backgroundSize: '1em' }}
            >
              {intervals.map((opt) => (
                <option key={opt.seconds} value={opt.seconds} className="bg-slate-900">{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button 
            onClick={onStart}
            className="group relative w-full overflow-hidden rounded-2xl bg-emerald-500 py-5 transition-all duration-500 hover:bg-emerald-400 active:scale-[0.98] shadow-lg shadow-emerald-950/20"
          >
            <span className="relative z-10 text-slate-950 font-black text-xl uppercase tracking-tighter">Start Activity</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          <button 
            onClick={onClose}
            className="w-full text-slate-500 hover:text-red-400/80 font-bold py-2 transition-all duration-700 text-[10px] uppercase tracking-[0.3em]"
          >
            Close App
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
