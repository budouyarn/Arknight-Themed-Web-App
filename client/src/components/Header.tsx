import terraMapBg from '@assets/generated_images/Terra_map_background_white_4b255bfe.png';

export default function Header() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30 border-b-2 border-primary/20">
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
        <div className="text-center space-y-4">
          <div className="inline-block">
            <h1 className="font-brand text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight" data-testid="text-title">
              WEDDING OF LEANDRO KIM AND SHERINE LIM
            </h1>
            <div className="h-1 bg-primary mt-2" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)" }} />
          </div>
          
          <p className="font-display text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome, Operators. Locate your designated table for the celebration.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-sans">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>50 Operators Deployed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
