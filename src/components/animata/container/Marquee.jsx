import React, { useState } from 'react';

export default function Marquee({ children, className = '', reverse = false, pauseOnHover = false }) {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div 
      className={`relative flex overflow-x-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`flex ${isPaused ? 'paused' : ''} ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} whitespace-nowrap`}
      >
        {React.Children.map(children, (child, index) => (
          <div className="mx-4" key={index}>
            {child}
          </div>
        ))}
      </div>
      <div 
        className={`flex ${isPaused ? 'paused' : ''} ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} whitespace-nowrap`}
      >
        {React.Children.map(children, (child, index) => (
          <div className="mx-4" key={`clone-${index}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}