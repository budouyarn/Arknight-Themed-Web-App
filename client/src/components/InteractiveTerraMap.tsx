import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin } from "lucide-react";
import FactionBadge from "./FactionBadge";
import type { Table, Faction } from "@shared/schema";
import { Shield, Star, Users as UsersIcon, Globe, Sword, Crown, Sun, Flame, Mountain, Sparkles } from "lucide-react";
import terraMapBg from '@assets/generated_images/Terra_map_background_white_4b255bfe.png';
import { useState, useEffect } from "react";

interface InteractiveTerraMapProps {
  tables: Table[];
  guestCounts: Record<string, number>;
  selectedFaction: Faction | null;
  onFactionSelect: (faction: Faction) => void;
}

const factionIcons: Record<Faction, typeof Shield> = {
  "Rhodes Island": Shield,
  "Lungmen": Star,
  "Ursus": Flame,
  "Victoria": Crown,
  "Kazimierz": Sword,
  "Laterano": Sparkles,
  "Siesta": Sun,
  "Bolivar": Mountain,
  "Sargon": Globe,
  "Yan": UsersIcon,
};

const factionColors: Record<Faction, string> = {
  "Rhodes Island": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Lungmen": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Ursus": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Victoria": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Kazimierz": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Laterano": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Siesta": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Bolivar": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Sargon": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
  "Yan": "from-slate-500 to-slate-600 border-slate-400 hover:from-slate-500 hover:to-slate-600",
};

const radarColors: Record<Faction, string> = {
  "Rhodes Island": "rgba(100, 116, 139, 0.3)",
  "Lungmen": "rgba(100, 116, 139, 0.3)",
  "Ursus": "rgba(100, 116, 139, 0.3)",
  "Victoria": "rgba(100, 116, 139, 0.3)",
  "Kazimierz": "rgba(100, 116, 139, 0.3)",
  "Laterano": "rgba(100, 116, 139, 0.3)",
  "Siesta": "rgba(100, 116, 139, 0.3)",
  "Bolivar": "rgba(100, 116, 139, 0.3)",
  "Sargon": "rgba(100, 116, 139, 0.3)",
  "Yan": "rgba(100, 116, 139, 0.3)",
};

type FactionPosition = {
  left: string;
  top: string;
};

const factionPositions: Record<Faction, FactionPosition> = {
  "Rhodes Island": { left: "50%", top: "50%" },
  "Lungmen": { left: "75%", top: "40%" },
  "Yan": { left: "80%", top: "55%" },
  "Victoria": { left: "15%", top: "35%" },
  "Kazimierz": { left: "20%", top: "55%" },
  "Ursus": { left: "45%", top: "15%" },
  "Laterano": { left: "65%", top: "70%" },
  "Siesta": { left: "35%", top: "75%" },
  "Bolivar": { left: "15%", top: "70%" },
  "Sargon": { left: "85%", top: "25%" },
};

const factionAnimationDelays: Record<Faction, [number, number]> = {
  "Rhodes Island": [0, 1.5],
  "Lungmen": [0.3, 1.8],
  "Yan": [0.6, 2.1],
  "Victoria": [0.9, 2.4],
  "Kazimierz": [1.2, 2.7],
  "Ursus": [1.5, 0.3],
  "Laterano": [1.8, 0.6],
  "Siesta": [2.1, 0.9],
  "Bolivar": [2.4, 1.2],
  "Sargon": [2.7, 1.5],
};

function TypewriterText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      {displayText}
      <span className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle" style={{ opacity: showCursor ? 1 : 0 }} />
    </>
  );
}

export default function InteractiveTerraMap({ tables, guestCounts, selectedFaction, onFactionSelect }: InteractiveTerraMapProps) {
  const factionTables = tables.reduce((acc, table) => {
    const faction = table.name as Faction;
    acc[faction] = table;
    return acc;
  }, {} as Record<Faction, Table>);

  const handleRegionClick = (faction: Faction) => {
    onFactionSelect(faction);
  };

  const factions = Object.keys(factionTables) as Faction[];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 p-8">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${terraMapBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative flex items-center justify-center min-h-[700px]">
          <div className="relative w-full aspect-[16/10]">
            <div className="absolute inset-0">
              <div className="relative w-full h-full">
                {factions.map((faction) => {
                  const table = factionTables[faction];
                  if (!table) return null;
                  
                  const Icon = factionIcons[faction];
                  const guestCount = guestCounts[table.id] || 0;
                  const isSelected = selectedFaction === faction;
                  const position = factionPositions[faction];
                  const color = radarColors[faction];
                  const [delay1, delay2] = factionAnimationDelays[faction];
                  
                  return (
                    <div
                      key={faction}
                      className="absolute"
                      style={{
                        left: position.left,
                        top: position.top,
                        transform: "translate(-50%, -50%)"
                      }}
                    >
                      <div className="relative">
                        <div 
                          className="absolute inset-0 rounded-full animate-radar-ping"
                          style={{
                            backgroundColor: color,
                            animation: `radar-pulse 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                            animationDelay: `${delay1}s`
                          }}
                        />
                        
                        <div 
                          className="absolute inset-0 rounded-full animate-radar-ping"
                          style={{
                            backgroundColor: color,
                            animation: `radar-pulse 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                            animationDelay: `${delay2}s`
                          }}
                        />

                        <button
                          onClick={() => handleRegionClick(faction)}
                          className="group relative z-10 w-48"
                          data-testid={`button-map-region-${faction.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div
                            className={`
                              relative overflow-hidden rounded-md border-2 transition-all duration-300
                              bg-gradient-to-br backdrop-blur-md
                              ${isSelected 
                                ? 'from-red-800 to-red-900 border-red-600 ring-4 ring-red-500 scale-110 shadow-2xl' 
                                : `${factionColors[faction]} scale-100 hover:scale-105`
                              }
                              active-elevate-2
                            `}
                            style={{
                              clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)"
                            }}
                          >
                            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                            
                            <div className="relative p-3 flex items-center gap-2.5">
                              <div className={`
                                p-2 rounded-full bg-card/60 backdrop-blur-sm border border-white/30
                                transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12
                              `}>
                                <Icon className="w-4 h-4 text-foreground" />
                              </div>
                              
                              <div className="flex-1 text-left min-w-0">
                                <h4 className="font-brand font-bold text-xs uppercase tracking-wide text-gray-300 truncate">
                                  {faction}
                                </h4>
                                
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Users className="w-3 h-3 flex-shrink-0 text-gray-300" />
                                  <span className="text-xs font-display font-semibold text-gray-300">
                                    {guestCount}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="absolute inset-0 border-2 border-red-400 rounded-md animate-pulse pointer-events-none" />
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute top-4 left-4">
                  <h2 className="font-brand font-bold text-xl uppercase tracking-wide text-foreground mb-2 min-h-[28px]">
                    <TypewriterText text="PRTS SYNTHESIZE INFORMATION ANALYSIS" speed={60} />
                  </h2>
                  <p className="text-sm text-muted-foreground font-display">
                    Wedding Seating Plan
                  </p>
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">
                      {tables.length} Tables • {Object.values(guestCounts).reduce((a, b) => a + b, 0)} Guests
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
