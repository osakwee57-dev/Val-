
import React, { useState, useCallback, useRef } from 'react';
import { X, Check, Heart as HeartIcon } from 'lucide-react';
import { AppState, Position } from './types';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.PROPOSING);
  const [noButtonPos, setNoButtonPos] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setAppState(AppState.ACCEPTED);
  };

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const padding = 50;
    const btnWidth = 120;
    const btnHeight = 60;

    // Generate a random position that keeps the button fully within view
    const maxX = containerRect.width - btnWidth - padding;
    const maxY = containerRect.height - btnHeight - padding;
    
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    setNoButtonPos({ x: randomX, y: randomY });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center overflow-hidden px-4"
    >
      <FloatingHearts />

      {appState === AppState.PROPOSING ? (
        <div className="z-10 bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50 text-center max-w-md w-full transition-all duration-500 scale-100">
          <div className="mb-6 flex justify-center">
            <div className="bg-pink-100 p-4 rounded-full animate-bounce">
              <HeartIcon className="w-12 h-12 text-red-500 fill-red-500" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-cursive text-red-600 mb-8 leading-tight">
            Will you be my Valentine?
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center min-h-[140px] relative">
            <button
              onClick={handleYes}
              className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg transform hover:scale-110 active:scale-95 transition-all flex items-center gap-2 z-10"
            >
              <Check className="w-6 h-6" />
              Yes!
            </button>

            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={noButtonPos ? {
                position: 'fixed',
                left: `${noButtonPos.x}px`,
                top: `${noButtonPos.y}px`,
                zIndex: 50,
              } : {}}
              className="bg-gray-400 hover:bg-gray-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <X className="w-6 h-6" />
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="z-10 text-center animate-pop-in">
          <div className="relative flex justify-center items-center mb-10">
            <div className="absolute animate-ping inline-flex h-40 w-40 rounded-full bg-red-400 opacity-75"></div>
            <div className="relative bg-white p-8 rounded-full shadow-2xl">
              <HeartIcon className="w-24 h-24 text-red-600 fill-red-600 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-cursive text-red-700 drop-shadow-lg mb-4">
            I knew you'd say yes!
          </h2>
          
          <p className="text-pink-800 font-medium text-xl md:text-2xl">
            See you on February 14th! ❤️
          </p>
          
          <button 
            onClick={() => { setAppState(AppState.PROPOSING); setNoButtonPos(null); }}
            className="mt-12 text-pink-600 underline hover:text-red-600 transition-colors block mx-auto"
          >
            Ask me again?
          </button>
        </div>
      )}
      
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
