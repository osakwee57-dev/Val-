
import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${12 + Math.random() * 20}s`,
      size: `${12 + Math.random() * 35}px`,
      opacity: 0.1 + Math.random() * 0.4,
    }));
  }, []);

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
            className="text-red-400 fill-red-300" 
            style={{ width: h.size, height: h.size }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
