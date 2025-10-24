import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin } from "lucide-react";
import FactionBadge from "./FactionBadge";
import type { Table, Faction } from "@shared/schema";
import { Shield, Star, Users as UsersIcon, Globe, Sword, Crown, Sun, Flame, Mountain, Sparkles } from "lucide-react";
import terraMapBg from '@assets/generated_images/Terra_map_background_white_4b255bfe.png';

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
  "Rhodes Island": "from-blue-500/20 to-blue-600/30 border-blue-400/40 hover:from-blue-500/30 hover:to-blue-600/40",
  "Lungmen": "from-amber-500/20 to-amber-600/30 border-amber-400/40 hover:from-amber-500/30 hover:to-amber-600/40",
  "Ursus": "from-red-500/20 to-red-600/30 border-red-400/40 hover:from-red-500/30 hover:to-red-600/40",
  "Victoria": "from-purple-500/20 to-purple-600/30 border-purple-400/40 hover:from-purple-500/30 hover:to-purple-600/40",
  "Kazimierz": "from-yellow-500/20 to-yellow-600/30 border-yellow-400/40 hover:from-yellow-500/30 hover:to-yellow-600/40",
  "Laterano": "from-cyan-500/20 to-cyan-600/30 border-cyan-400/40 hover:from-cyan-500/30 hover:to-cyan-600/40",
  "Siesta": "from-orange-500/20 to-orange-600/30 border-orange-400/40 hover:from-orange-500/30 hover:to-orange-600/40",
  "Bolivar": "from-green-500/20 to-green-600/30 border-green-400/40 hover:from-green-500/30 hover:to-green-600/40",
  "Sargon": "from-teal-500/20 to-teal-600/30 border-teal-400/40 hover:from-teal-500/30 hover:to-teal-600/40",
  "Yan": "from-pink-500/20 to-pink-600/30 border-pink-400/40 hover:from-pink-500/30 hover:to-pink-600/40",
};

type CommandRegion = "Central Command" | "West Command" | "East Command" | "North Command" | "South Command";

const commandRegions: Record<CommandRegion, Faction[]> = {
  "Central Command": ["Rhodes Island"],
  "East Command": ["Yan", "Lungmen"],
  "West Command": ["Victoria", "Kazimierz"],
  "North Command": ["Ursus"],
  "South Command": ["Siesta", "Bolivar", "Sargon", "Laterano"],
};

const commandColors: Record<CommandRegion, string> = {
  "Central Command": "from-blue-600/10 to-blue-700/20 border-blue-500/30",
  "East Command": "from-amber-600/10 to-pink-700/20 border-amber-500/30",
  "West Command": "from-purple-600/10 to-yellow-700/20 border-purple-500/30",
  "North Command": "from-red-600/10 to-red-700/20 border-red-500/30",
  "South Command": "from-orange-600/10 to-teal-700/20 border-orange-500/30",
};

export default function InteractiveTerraMap({ tables, guestCounts, selectedFaction, onFactionSelect }: InteractiveTerraMapProps) {
  const factionTables = tables.reduce((acc, table) => {
    const faction = table.name as Faction;
    acc[faction] = table;
    return acc;
  }, {} as Record<Faction, Table>);

  const handleRegionClick = (faction: Faction) => {
    onFactionSelect(faction);
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 p-6">
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

        <div 
          className="absolute inset-0 bg-grid-pattern opacity-5"
        />

        <div className="relative space-y-6">
          {Object.entries(commandRegions).map(([command, factions]) => {
            const commandFactions = factions.filter(f => factionTables[f]);
            
            return (
              <div key={command} className="space-y-3">
                <div 
                  className={`p-4 rounded-lg border-2 bg-gradient-to-r ${commandColors[command as CommandRegion]} backdrop-blur-sm`}
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)"
                  }}
                >
                  <h3 className="font-brand font-bold text-lg uppercase tracking-wide text-foreground">
                    {command}
                  </h3>
                  <p className="text-xs text-muted-foreground font-display mt-1">
                    {commandFactions.length} {commandFactions.length === 1 ? 'Region' : 'Regions'}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pl-4">
                  {commandFactions.map((faction) => {
                    const table = factionTables[faction];
                    if (!table) return null;
                    
                    const Icon = factionIcons[faction];
                    const guestCount = guestCounts[table.id] || 0;
                    const isSelected = selectedFaction === faction;
                    
                    return (
                      <button
                        key={faction}
                        onClick={() => handleRegionClick(faction)}
                        className="group relative"
                        data-testid={`button-map-region-${faction.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div
                          className={`
                            relative overflow-hidden rounded-md border-2 transition-all duration-300
                            bg-gradient-to-br ${factionColors[faction]}
                            ${isSelected ? 'ring-4 ring-primary scale-105 shadow-xl' : 'scale-100'}
                            active-elevate-2
                          `}
                          style={{
                            clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
                          }}
                        >
                          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                          
                          <div className="relative p-4 min-h-[120px] flex flex-col items-center justify-center text-center space-y-2">
                            <div className={`
                              p-2 rounded-full bg-card/50 backdrop-blur-sm border border-white/20
                              transition-transform duration-200 group-hover:scale-110
                            `}>
                              <Icon className="w-5 h-5 text-foreground" />
                            </div>
                            
                            <div>
                              <h4 className="font-brand font-bold text-xs uppercase tracking-wide text-foreground mb-1">
                                {faction}
                              </h4>
                              
                              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                                <Users className="w-3 h-3" />
                                <span className="text-xs font-display font-semibold">
                                  {guestCount}
                                </span>
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="absolute inset-0 border-2 border-primary rounded-md animate-pulse pointer-events-none" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedFaction && (
        <div className="mt-6 p-4 bg-card/50 backdrop-blur-sm border-2 border-primary/40 rounded-md" style={{
          clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)"
        }}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground font-display">Selected Region</p>
                <p className="font-brand font-bold text-lg text-foreground">{selectedFaction}</p>
              </div>
            </div>
            <FactionBadge faction={selectedFaction} />
          </div>
        </div>
      )}
    </div>
  );
}
