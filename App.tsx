
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, ACTIVITY_INTERVALS, DELAY_INTERVALS } from './types';
import SetupScreen from './components/SetupScreen';
import RunningScreen from './components/RunningScreen';
import AlertScreen from './components/AlertScreen';
import RelaxScreen from './components/RelaxScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>(AppState.SETUP);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedInterval, setSelectedInterval] = useState<number>(ACTIVITY_INTERVALS[0].seconds);
  const [selectedDelay, setSelectedDelay] = useState<number>(DELAY_INTERVALS[0].seconds);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = useCallback((seconds: number) => {
    setTimeLeft(seconds);
    setCurrentScreen(AppState.COUNTDOWN);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setCurrentScreen(AppState.ALERT);
          
          // Odtwarzanie dźwięku powiadomienia
          const audio = new Audio('/soundreality-notification-piano-443094.mp3');
          audio.play().catch(e => console.log("Audio play blocked or failed:", e));
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleStartActivity = () => {
    startTimer(selectedInterval);
  };

  const handleRelaxNow = () => {
    setCurrentScreen(AppState.RELAXING);
  };

  const handleDelayRelax = () => {
    startTimer(selectedDelay);
  };

  const handleCloseApp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentScreen(AppState.EXITED);
  };

  const handleRelaxFinished = () => {
    setCurrentScreen(AppState.SETUP);
  };

  const handleRestart = () => {
    setCurrentScreen(AppState.SETUP);
  };

  // State: EXITED - Simulating the app being closed
  if (currentScreen === AppState.EXITED) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-slate-500 font-mono transition-opacity duration-1000 animate-in fade-in">
        <div className="text-center space-y-4">
          <p className="text-sm tracking-widest opacity-40">PROCESS_TERMINATED</p>
          <p className="text-xs opacity-20 italic">SlowDown HareApp session ended.</p>
          <button 
            onClick={handleRestart}
            className="mt-8 text-[10px] border border-slate-800 px-6 py-2 rounded-full hover:bg-slate-900 transition-all duration-500 hover:text-slate-300"
          >
            REBOOT SYSTEM
          </button>
        </div>
      </div>
    );
  }

  // State: COUNTDOWN - Hidden UI
  if (currentScreen === AppState.COUNTDOWN) {
    return <RunningScreen timeLeft={timeLeft} onCancel={handleCloseApp} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 transition-colors duration-1000">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse"></div>
      </div>

      {currentScreen !== AppState.RELAXING && (
        <div className="w-full max-w-lg bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden transition-all duration-1000 animate-in fade-in slide-in-from-bottom-8">
          {/* Custom Window Controls Decorator */}
          <div className="flex items-center gap-2 p-5 bg-white/[0.02] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/60 cursor-pointer hover:bg-red-400 transition-colors" onClick={handleCloseApp}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
            <span className="ml-3 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">SlowDown Hare v1.0</span>
          </div>

          <div className="p-8 md:p-10">
            {currentScreen === AppState.SETUP && (
              <SetupScreen 
                onStart={handleStartActivity} 
                onClose={handleCloseApp}
                onIntervalChange={setSelectedInterval}
                intervals={ACTIVITY_INTERVALS}
              />
            )}

            {currentScreen === AppState.ALERT && (
              <AlertScreen 
                onRelaxNow={handleRelaxNow}
                onDelayRelax={handleDelayRelax}
                onClose={handleCloseApp}
                onDelayChange={setSelectedDelay}
                delayIntervals={DELAY_INTERVALS}
              />
            )}
          </div>
        </div>
      )}

      {currentScreen === AppState.RELAXING && (
        <RelaxScreen onBack={handleRelaxFinished} />
      )}
    </div>
  );
};

export default App;
