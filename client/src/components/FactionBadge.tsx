import { Shield, Star, Users, Globe, Sword, Crown, Sun, Flame, Mountain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Faction } from "@shared/schema";

const factionConfig: Record<Faction, { color: string; icon: typeof Shield; bgColor: string }> = {
  "Rhodes Island": { 
    color: "text-blue-600", 
    icon: Shield,
    bgColor: "bg-blue-50 border-blue-200"
  },
  "Lungmen": { 
    color: "text-amber-600", 
    icon: Star,
    bgColor: "bg-amber-50 border-amber-200"
  },
  "Ursus": { 
    color: "text-red-600", 
    icon: Flame,
    bgColor: "bg-red-50 border-red-200"
  },
  "Victoria": { 
    color: "text-purple-600", 
    icon: Crown,
    bgColor: "bg-purple-50 border-purple-200"
  },
  "Kazimierz": { 
    color: "text-yellow-600", 
    icon: Sword,
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  "Laterano": { 
    color: "text-cyan-600", 
    icon: Sparkles,
    bgColor: "bg-cyan-50 border-cyan-200"
  },
  "Siesta": { 
    color: "text-orange-600", 
    icon: Sun,
    bgColor: "bg-orange-50 border-orange-200"
  },
  "Bolivar": { 
    color: "text-green-600", 
    icon: Mountain,
    bgColor: "bg-green-50 border-green-200"
  },
  "Sargon": { 
    color: "text-teal-600", 
    icon: Globe,
    bgColor: "bg-teal-50 border-teal-200"
  },
  "Yan": { 
    color: "text-pink-600", 
    icon: Users,
    bgColor: "bg-pink-50 border-pink-200"
  },
};

interface FactionBadgeProps {
  faction: Faction;
  showIcon?: boolean;
}

export default function FactionBadge({ faction, showIcon = true }: FactionBadgeProps) {
  const config = factionConfig[faction];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={`${config.bgColor} ${config.color} font-display text-xs uppercase tracking-wider border no-default-hover-elevate whitespace-nowrap`}
      data-testid={`badge-faction-${faction.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {faction}
    </Badge>
  );
}
