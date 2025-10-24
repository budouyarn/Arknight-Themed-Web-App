import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import FactionBadge from "./FactionBadge";
import type { Guest, Table, Faction } from "@shared/schema";

interface GuestCardProps {
  guest: Guest;
  table: Table;
  onClick?: () => void;
}

export default function GuestCard({ guest, table, onClick }: GuestCardProps) {
  return (
    <Card 
      className="hover-elevate active-elevate-2 cursor-pointer overflow-visible transition-all duration-150"
      style={{
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)"
      }}
      onClick={onClick}
      data-testid={`card-guest-${guest.id}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-lg text-foreground mb-1 truncate" data-testid={`text-guest-name-${guest.id}`}>
              {guest.name}
            </h3>
          </div>
          <FactionBadge faction={guest.faction as Faction} showIcon={false} />
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="font-brand text-sm font-bold uppercase tracking-wide" data-testid={`text-table-${guest.id}`}>
            {table.name}
          </span>
        </div>
      </div>
    </Card>
  );
}
