
import React from 'react';

interface RunningScreenProps {
  timeLeft: number;
  onCancel: () => void;
}

const RunningScreen: React.FC<RunningScreenProps> = ({ timeLeft, onCancel }) => {
  // Ekran podczas aktywności jest "ukryty" - renderujemy tylko mały, 
  // niemal niewidoczny przycisk w rogu na wypadek, gdyby użytkownik chciał przerwać.
  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-end p-4">
      <button 
        onClick={onCancel}
        className="pointer-events-auto opacity-0 hover:opacity-100 bg-white/5 text-white/20 hover:text-white/60 px-3 py-1 rounded text-[10px] uppercase tracking-tighter transition-all"
        title="Cancel activity timer"
      >
        Hare is watching... [Cancel]
      </button>
    </div>
  );
};

export default RunningScreen;
