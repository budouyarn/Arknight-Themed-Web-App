import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import GuestCard from "@/components/GuestCard";
import TableGridCell from "@/components/TableGridCell";
import InteractiveTerraMap from "@/components/InteractiveTerraMap";
import { Button } from "@/components/ui/button";
import { Map, Grid3x3 } from "lucide-react";
import { tables, guests } from "@shared/wedding-data";
import type { Faction } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFactions, setSelectedFactions] = useState<Faction[]>([]);
  const [highlightedTableId, setHighlightedTableId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFaction = selectedFactions.length === 0 || selectedFactions.includes(guest.faction as Faction);
      return matchesSearch && matchesFaction;
    });
  }, [searchQuery, selectedFactions]);

  const handleFactionToggle = (faction: Faction) => {
    setSelectedFactions(prev =>
      prev.includes(faction)
        ? prev.filter(f => f !== faction)
        : [...prev, faction]
    );
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedFactions([]);
    setHighlightedTableId(null);
  };

  const handleGuestClick = (tableId: string) => {
    setHighlightedTableId(tableId);
    const element = document.getElementById(`table-${tableId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleTableClick = (tableId: string) => {
    setHighlightedTableId(tableId);
  };

  const getTableGuestCount = (tableId: string) => {
    return guests.filter(g => g.tableId === tableId).length;
  };

  const gridRows = Math.max(...tables.map(t => t.gridY)) + 1;
  const gridCols = Math.max(...tables.map(t => t.gridX)) + 1;

  const guestCounts = tables.reduce((acc, table) => {
    acc[table.id] = getTableGuestCount(table.id);
    return acc;
  }, {} as Record<string, number>);

  const handleMapFactionSelect = (faction: Faction) => {
    if (selectedFactions.includes(faction)) {
      setSelectedFactions([]);
    } else {
      setSelectedFactions([faction]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-8">
          <div className="space-y-6">
            <div className="sticky top-4 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Find Your Table</h2>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedFactions={selectedFactions}
                  onFactionToggle={handleFactionToggle}
                  onClearAll={handleClearAll}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Search Results
                  </h3>
                  <span className="text-sm text-muted-foreground font-sans">
                    {filteredGuests.length} of {guests.length}
                  </span>
                </div>
                
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredGuests.length > 0 ? (
                    filteredGuests.map((guest) => {
                      const table = tables.find(t => t.id === guest.tableId)!;
                      return (
                        <GuestCard
                          key={guest.id}
                          guest={guest}
                          table={table}
                          onClick={() => handleGuestClick(guest.tableId)}
                        />
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="font-display">No operators found</p>
                      <p className="text-sm mt-1">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold text-foreground">Terra Map View</h2>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  data-testid="button-view-map"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Interactive Map
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  data-testid="button-view-grid"
                >
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  Grid Layout
                </Button>
              </div>
            </div>

            {viewMode === 'map' ? (
              <InteractiveTerraMap
                tables={tables}
                guestCounts={guestCounts}
                selectedFaction={selectedFactions[0] || null}
                onFactionSelect={handleMapFactionSelect}
              />
            ) : (
              <div 
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
                }}
              >
                {tables.map((table) => (
                  <div
                    key={table.id}
                    id={`table-${table.id}`}
                    style={{
                      gridColumn: table.gridX + 1,
                      gridRow: table.gridY + 1
                    }}
                  >
                    <TableGridCell
                      table={table}
                      guestCount={getTableGuestCount(table.id)}
                      isHighlighted={highlightedTableId === table.id}
                      onClick={() => handleTableClick(table.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
