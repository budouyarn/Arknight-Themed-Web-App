import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import GuestCard from "@/components/GuestCard";
import TableGridCell from "@/components/TableGridCell";
import type { Guest, Table, Faction } from "@shared/schema";

const mockTables: Table[] = [
  { id: "rhodes-island", name: "Rhodes Island", gridX: 2, gridY: 1 },
  { id: "lungmen", name: "Lungmen", gridX: 3, gridY: 1 },
  { id: "ursus", name: "Ursus", gridX: 0, gridY: 2 },
  { id: "victoria", name: "Victoria", gridX: 1, gridY: 2 },
  { id: "kazimierz", name: "Kazimierz", gridX: 2, gridY: 2 },
  { id: "laterano", name: "Laterano", gridX: 3, gridY: 2 },
  { id: "siesta", name: "Siesta", gridX: 4, gridY: 2 },
  { id: "bolivar", name: "Bolivar", gridX: 1, gridY: 3 },
  { id: "sargon", name: "Sargon", gridX: 2, gridY: 3 },
  { id: "yan", name: "Yan", gridX: 3, gridY: 3 },
];

const mockGuests: Guest[] = [
  { id: "1", name: "Amiya", faction: "Rhodes Island", tableId: "rhodes-island" },
  { id: "2", name: "Doctor", faction: "Rhodes Island", tableId: "rhodes-island" },
  { id: "3", name: "Kal'tsit", faction: "Rhodes Island", tableId: "rhodes-island" },
  { id: "4", name: "Closure", faction: "Rhodes Island", tableId: "rhodes-island" },
  { id: "5", name: "Ace", faction: "Rhodes Island", tableId: "rhodes-island" },
  
  { id: "6", name: "Ch'en", faction: "Lungmen", tableId: "lungmen" },
  { id: "7", name: "Hoshiguma", faction: "Lungmen", tableId: "lungmen" },
  { id: "8", name: "Swire", faction: "Lungmen", tableId: "lungmen" },
  { id: "9", name: "Lin Yuhsia", faction: "Lungmen", tableId: "lungmen" },
  { id: "10", name: "Wei Yenwu", faction: "Lungmen", tableId: "lungmen" },
  
  { id: "11", name: "Patriot", faction: "Ursus", tableId: "ursus" },
  { id: "12", name: "FrostNova", faction: "Ursus", tableId: "ursus" },
  { id: "13", name: "Zima", faction: "Ursus", tableId: "ursus" },
  { id: "14", name: "Istina", faction: "Ursus", tableId: "ursus" },
  { id: "15", name: "Gummy", faction: "Ursus", tableId: "ursus" },
  
  { id: "16", name: "Bagpipe", faction: "Victoria", tableId: "victoria" },
  { id: "17", name: "Siege", faction: "Victoria", tableId: "victoria" },
  { id: "18", name: "Reed", faction: "Victoria", tableId: "victoria" },
  { id: "19", name: "Indra", faction: "Victoria", tableId: "victoria" },
  { id: "20", name: "Morgan", faction: "Victoria", tableId: "victoria" },
  
  { id: "21", name: "Nearl", faction: "Kazimierz", tableId: "kazimierz" },
  { id: "22", name: "Platinum", faction: "Kazimierz", tableId: "kazimierz" },
  { id: "23", name: "Gravel", faction: "Kazimierz", tableId: "kazimierz" },
  { id: "24", name: "Meteor", faction: "Kazimierz", tableId: "kazimierz" },
  { id: "25", name: "Blemishine", faction: "Kazimierz", tableId: "kazimierz" },
  
  { id: "26", name: "Executor", faction: "Laterano", tableId: "laterano" },
  { id: "27", name: "Exusiai", faction: "Laterano", tableId: "laterano" },
  { id: "28", name: "Texas", faction: "Laterano", tableId: "laterano" },
  { id: "29", name: "Lappland", faction: "Laterano", tableId: "laterano" },
  { id: "30", name: "Mostima", faction: "Laterano", tableId: "laterano" },
  
  { id: "31", name: "Gavial", faction: "Siesta", tableId: "siesta" },
  { id: "32", name: "Tomimi", faction: "Siesta", tableId: "siesta" },
  { id: "33", name: "Croissant", faction: "Siesta", tableId: "siesta" },
  { id: "34", name: "Bison", faction: "Siesta", tableId: "siesta" },
  { id: "35", name: "Estelle", faction: "Siesta", tableId: "siesta" },
  
  { id: "36", name: "Tequila", faction: "Bolivar", tableId: "bolivar" },
  { id: "37", name: "La Pluma", faction: "Bolivar", tableId: "bolivar" },
  { id: "38", name: "Cutter", faction: "Bolivar", tableId: "bolivar" },
  { id: "39", name: "Beeswax", faction: "Bolivar", tableId: "bolivar" },
  { id: "40", name: "Carnelian", faction: "Bolivar", tableId: "bolivar" },
  
  { id: "41", name: "Tomimi", faction: "Sargon", tableId: "sargon" },
  { id: "42", name: "Flamebringer", faction: "Sargon", tableId: "sargon" },
  { id: "43", name: "Kafka", faction: "Sargon", tableId: "sargon" },
  { id: "44", name: "Whisperain", faction: "Sargon", tableId: "sargon" },
  { id: "45", name: "Toddifons", faction: "Sargon", tableId: "sargon" },
  
  { id: "46", name: "Dusk", faction: "Yan", tableId: "yan" },
  { id: "47", name: "Nian", faction: "Yan", tableId: "yan" },
  { id: "48", name: "Ling", faction: "Yan", tableId: "yan" },
  { id: "49", name: "Chongyue", faction: "Yan", tableId: "yan" },
  { id: "50", name: "Lee", faction: "Yan", tableId: "yan" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFactions, setSelectedFactions] = useState<Faction[]>([]);
  const [highlightedTableId, setHighlightedTableId] = useState<string | null>(null);

  const filteredGuests = useMemo(() => {
    return mockGuests.filter((guest) => {
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
    return mockGuests.filter(g => g.tableId === tableId).length;
  };

  const gridRows = Math.max(...mockTables.map(t => t.gridY)) + 1;
  const gridCols = Math.max(...mockTables.map(t => t.gridX)) + 1;

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
                    {filteredGuests.length} of {mockGuests.length}
                  </span>
                </div>
                
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredGuests.length > 0 ? (
                    filteredGuests.map((guest) => {
                      const table = mockTables.find(t => t.id === guest.tableId)!;
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
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Terra Map View</h2>
            <div 
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
              }}
            >
              {mockTables.map((table) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
