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
    // We use a slightly smaller area than the full screen to prevent overflow/scrolling
    const padding = 60;
    const btnWidth = 140;
    const btnHeight = 60;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // Generate random coordinates
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    setNoButtonPos({ x: randomX, y: randomY });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex items-center justify-center overflow-hidden px-4"
    >
      <FloatingHearts density={appState === AppState.ACCEPTED ? 60 : 25} />

      {appState === AppState.PROPOSING ? (
        <div className="z-10 glass-card p-10 md:p-14 rounded-[3rem] text-center max-w-md w-full animate-pop-in">
          <div className="mb-8 flex justify-center">
            <div className="bg-red-50 p-6 rounded-full shadow-inner animate-heartbeat">
              <HeartIcon className="w-16 h-16 text-red-500 fill-red-500" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-cursive text-red-600 mb-10 leading-tight">
            Will you be my Valentine?
          </h1>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center min-h-[160px] relative">
            <button
              onClick={handleYes}
              className="bg-red-500 hover:bg-red-600 text-white px-14 py-5 rounded-full font-bold text-2xl shadow-xl transform hover:scale-110 active:scale-95 transition-all flex items-center gap-3 z-10"
            >
              <Check className="w-8 h-8" />
              Yes!
            </button>

            <button
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              style={noButtonPos ? {
                position: 'fixed',
                left: `${noButtonPos.x}px`,
                top: `${noButtonPos.y}px`,
                zIndex: 50,
                transition: 'all 0.1s ease-out'
              } : {}}
              className="bg-white/80 border-2 border-pink-200 text-gray-400 px-12 py-5 rounded-full font-bold text-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap hover:text-red-300"
            >
              <X className="w-6 h-6" />
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="z-10 text-center animate-pop-in">
          <div className="mb-10 flex justify-center relative">
            <div className="absolute -inset-4 bg-red-200/50 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white p-10 rounded-full shadow-[0_0_60px_rgba(255,0,0,0.2)]">
              <HeartIcon className="w-32 h-32 text-red-600 fill-red-600 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-cursive text-red-700 mb-6 drop-shadow-md">
            I knew you'd say yes!
          </h2>
          
          <p className="text-rose-900 font-bold text-2xl md:text-3xl tracking-wide">
            See you on February 14th! ❤️
          </p>
          
          <button 
            onClick={() => { setAppState(AppState.PROPOSING); setNoButtonPos(null); }}
            className="mt-16 text-pink-600 font-bold hover:text-red-700 transition-colors block mx-auto py-2 px-6 rounded-full bg-white/40 border border-white/60 hover:bg-white/60"
          >
            Ask me again? ✨
          </button>
        </div>
      )}
    </div>
  );
};

export default App;