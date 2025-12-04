import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(0, 229, 255, 0.2)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      className={`relative bg-zinc-900 cursor-pointer focus:outline-none ${className}`}
      style={{ 
        overflow: 'hidden',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity,
          background: `radial-gradient(circle 400px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          transition: 'opacity 500ms',
          borderRadius: '24px'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export {SpotlightCard};