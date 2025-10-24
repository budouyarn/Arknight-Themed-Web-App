import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import FactionBadge from "./FactionBadge";
import { factions, type Faction } from "@shared/schema";
import { useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFactions: Faction[];
  onFactionToggle: (faction: Faction) => void;
  onClearAll: () => void;
}

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  selectedFactions, 
  onFactionToggle,
  onClearAll 
}: SearchBarProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 font-sans"
          data-testid="input-search"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={() => onSearchChange('')}
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-display font-semibold text-foreground">Filter by Faction</span>
          {selectedFactions.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              data-testid="button-clear-filters"
            >
              Clear All
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {factions.map((faction) => (
            <button
              key={faction}
              onClick={() => onFactionToggle(faction)}
              className={`transition-opacity ${
                selectedFactions.length === 0 || selectedFactions.includes(faction)
                  ? 'opacity-100'
                  : 'opacity-40'
              }`}
              data-testid={`button-faction-${faction.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <FactionBadge faction={faction} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
