import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartsProps {
  density?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ density = 30 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 25}s`,
      size: `${10 + Math.random() * 40}px`,
      opacity: 0.1 + Math.random() * 0.4,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, [density]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float"
          style={{
            left: h.left,
            bottom: '-60px',
            animationDelay: h.delay,
            animationDuration: h.duration,
            opacity: h.opacity,
          }}
        >
          <Heart 
            className="text-red-300 fill-red-200" 
            style={{ 
              width: h.size, 
              height: h.size, 
              transform: `rotate(${h.rotation})` 
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;