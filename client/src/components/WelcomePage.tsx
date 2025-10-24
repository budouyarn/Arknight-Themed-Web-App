import terraMapBg from '@assets/generated_images/Terra_map_background_white_4b255bfe.png';
import { ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface WelcomePageProps {
  onEnter: () => void;
}

export default function WelcomePage({ onEnter }: WelcomePageProps) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !sliderRef.current || !thumbRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const thumbWidth = thumbRef.current.offsetWidth;
    const maxPosition = sliderRect.width - thumbWidth;
    
    let newPosition = clientX - sliderRect.left - thumbWidth / 2;
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));
    
    setSliderPosition(newPosition);

    if (newPosition >= maxPosition * 0.95) {
      onEnter();
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (sliderRef.current && thumbRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const thumbWidth = thumbRef.current.offsetWidth;
      const maxPosition = sliderRect.width - thumbWidth;
      
      if (sliderPosition < maxPosition * 0.95) {
        setSliderPosition(0);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => handleEnd();
    const handleTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, sliderPosition]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${terraMapBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.05) 2px,
            rgba(255, 255, 255, 0.05) 4px
          )`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <h1 className="font-brand text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight" data-testid="text-title">
              Leandro Kim and Sherine Lim
            </h1>
            <div className="h-1 bg-primary mt-3" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)" }} />
          </div>
          
          <p className="font-display text-3xl sm:text-4xl font-semibold text-gray-100" data-testid="text-date">
            December 7, 2024
          </p>
          
          <p className="font-display text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mt-8">
            Welcome, Operators. Locate your designated table for the celebration.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-base text-gray-400 font-sans mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>50 Operators Deployed</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 w-80">
        <div
          ref={sliderRef}
          className="relative h-16 bg-gray-800/90 backdrop-blur-sm border-2 border-gray-700 rounded-md overflow-hidden shadow-xl"
          data-testid="slider-enter"
        >
          <div 
            className="absolute inset-0 bg-primary/20 transition-all duration-300"
            style={{ 
              width: `${sliderPosition}px`,
              clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)"
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Slide to Enter
            </span>
            <ChevronRight className="w-5 h-5 ml-2 text-gray-300 animate-pulse" />
          </div>

          <div
            ref={thumbRef}
            className="absolute left-0 top-0 h-full w-20 bg-white hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors shadow-lg flex items-center justify-center group"
            style={{ 
              transform: `translateX(${sliderPosition}px)`,
              clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)"
            }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            data-testid="slider-thumb"
          >
            <ChevronRight className="w-6 h-6 text-gray-900 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
