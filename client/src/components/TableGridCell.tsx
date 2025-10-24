import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import type { Table } from "@shared/schema";

interface TableGridCellProps {
  table: Table;
  guestCount: number;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export default function TableGridCell({ table, guestCount, isHighlighted, onClick }: TableGridCellProps) {
  return (
    <Card 
      className={`hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 overflow-visible ${
        isHighlighted ? 'ring-2 ring-primary shadow-lg' : ''
      }`}
      style={{
        clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"
      }}
      onClick={onClick}
      data-testid={`cell-table-${table.id}`}
    >
      <div className="p-4 min-h-[120px] flex flex-col justify-between">
        <div>
          <h4 className="font-brand font-bold text-sm uppercase tracking-wide text-foreground mb-2" data-testid={`text-table-name-${table.id}`}>
            {table.name}
          </h4>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-3 h-3" />
          <span className="text-xs font-display font-semibold" data-testid={`text-guest-count-${table.id}`}>
            {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
          </span>
        </div>
      </div>
    </Card>
  );
}
