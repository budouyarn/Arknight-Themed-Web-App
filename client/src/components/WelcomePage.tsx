import terraMapBg from '@assets/generated_images/Terra_map_background_white_4b255bfe.png';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface WelcomePageProps {
  onEnter: () => void;
}

export default function WelcomePage({ onEnter }: WelcomePageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-10"
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
            hsl(var(--foreground) / 0.1) 2px,
            hsl(var(--foreground) / 0.1) 4px
          )`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <h1 className="font-brand text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight" data-testid="text-title">
              Leandro Kim and Sherine Lim
            </h1>
            <div className="h-1 bg-primary mt-3" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)" }} />
          </div>
          
          <p className="font-display text-3xl sm:text-4xl font-semibold text-foreground/90" data-testid="text-date">
            December 7, 2024
          </p>
          
          <p className="font-display text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mt-8">
            Welcome, Operators. Locate your designated table for the celebration.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-base text-muted-foreground font-sans mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>50 Operators Deployed</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onEnter}
        size="lg"
        className="fixed bottom-8 right-8 font-display text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
        data-testid="button-enter"
      >
        Enter
        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
