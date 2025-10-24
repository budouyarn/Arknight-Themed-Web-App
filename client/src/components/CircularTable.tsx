import { useMemo } from "react";
import FactionBadge from "./FactionBadge";
import type { Guest, Faction } from "@shared/schema";

interface CircularTableProps {
  guests: Guest[];
  tableName: string;
}

export default function CircularTable({ guests, tableName }: CircularTableProps) {
  const positions = useMemo(() => {
    const guestCount = guests.length;
    if (guestCount === 0) return [];

    const radius = 140;
    const angleStep = (2 * Math.PI) / guestCount;
    const startAngle = -Math.PI / 2;

    return guests.map((guest, index) => {
      const angle = startAngle + index * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      return {
        guest,
        x,
        y,
        seatNumber: index + 1,
      };
    });
  }, [guests]);

  if (guests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No guests assigned to this table yet.
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ minHeight: '400px' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: '400px', height: '400px' }}>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-muted bg-muted/20 flex items-center justify-center"
            style={{ width: '180px', height: '180px' }}
          >
            <div className="text-center">
              <div className="text-sm text-muted-foreground font-display">
                {guests.length} {guests.length === 1 ? 'Seat' : 'Seats'}
              </div>
            </div>
          </div>

          {positions.map(({ guest, x, y, seatNumber }) => (
            <div
              key={guest.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <div className="relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-display border-2 border-background">
                  {seatNumber}
                </div>
                
                <div 
                  className="bg-card border-2 border-border rounded-lg p-3 shadow-lg hover-elevate active-elevate-2 transition-all min-w-[160px]"
                  data-testid={`seat-${guest.id}`}
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)"
                  }}
                >
                  <div className="space-y-1.5">
                    <div className="font-display font-semibold text-sm text-foreground text-center leading-tight">
                      {guest.name}
                    </div>
                    <div className="flex justify-center">
                      <FactionBadge faction={guest.faction as Faction} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
