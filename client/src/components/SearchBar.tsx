import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, UserCircle2 } from "lucide-react";
import FactionBadge from "./FactionBadge";
import { type Faction, type Guest, type Table } from "@shared/schema";
import { useState, useRef, useEffect, useMemo } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  guests: Guest[];
  tables: Table[];
}

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  guests,
  tables
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return guests
      .filter(guest => guest.name.toLowerCase().includes(query))
      .slice(0, 8)
      .map(guest => ({
        guest,
        table: tables.find(t => t.id === guest.tableId)
      }));
  }, [searchQuery, guests, tables]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleSelectSuggestion = (guestName: string) => {
    onSearchChange(guestName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex].guest.name);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search by guest name..."
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (searchQuery.trim()) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className="pl-9 font-sans"
          data-testid="input-search"
          autoComplete="off"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={() => {
              onSearchChange('');
              setShowSuggestions(false);
            }}
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-card border-2 border-primary/20 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
            data-testid="search-suggestions"
          >
            <div className="p-2">
              <div className="text-xs font-display font-semibold text-muted-foreground px-3 py-2">
                Suggestions
              </div>
              {suggestions.map((item, index) => (
                <button
                  key={item.guest.id}
                  onClick={() => handleSelectSuggestion(item.guest.name)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md transition-all
                    hover-elevate active-elevate-2
                    ${selectedIndex === index ? 'bg-primary/10' : ''}
                  `}
                  data-testid={`suggestion-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <UserCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-sans font-semibold text-sm text-foreground truncate">
                        {item.guest.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <FactionBadge faction={item.guest.faction as Faction} />
                        {item.table && (
                          <span className="text-xs text-muted-foreground font-display">
                            Table: {item.table.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
