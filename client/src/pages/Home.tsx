import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import WelcomePage from "@/components/WelcomePage";
import SearchBar from "@/components/SearchBar";
import InteractiveTerraMap from "@/components/InteractiveTerraMap";
import CircularTable from "@/components/CircularTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FactionBadge from "@/components/FactionBadge";
import { Map, List } from "lucide-react";
import type { Faction, Guest, Table } from "@shared/schema";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTableId, setHighlightedTableId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogFaction, setDialogFaction] = useState<Faction | null>(null);
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);

  const { data: tables = [], isLoading: tablesLoading } = useQuery<Table[]>({
    queryKey: ["/api/tables"],
  });

  const { data: guests = [], isLoading: guestsLoading } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  const handleTableClick = (tableId: string) => {
    setHighlightedTableId(tableId);
  };

  const getTableGuestCount = (tableId: string) => {
    return guests.filter(g => g.tableId === tableId).length;
  };

  const guestCounts = useMemo(() => {
    return tables.reduce((acc, table) => {
      acc[table.id] = getTableGuestCount(table.id);
      return acc;
    }, {} as Record<string, number>);
  }, [tables, guests]);

  const handleMapFactionSelect = (faction: Faction) => {
    setSelectedFaction(faction);
    setDialogFaction(faction);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedFaction(null);
    }
  };

  const getGuestsForFaction = (faction: Faction) => {
    const table = tables.find(t => t.name === faction);
    if (!table) return [];
    return guests.filter(g => g.tableId === table.id);
  };

  const tablesByGuest = useMemo(() => {
    return tables.map(table => ({
      table,
      guests: guests.filter(g => g.tableId === table.id)
    })).filter(item => item.guests.length > 0);
  }, [tables, guests]);

  if (tablesLoading || guestsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-brand font-bold text-foreground">Loading seating plan...</div>
        </div>
      </div>
    );
  }

  if (!hasEntered) {
    return <WelcomePage onEnter={() => setHasEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="map" className="space-y-6" data-testid="view-tabs">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2" data-testid="tabs-list">
            <TabsTrigger value="map" data-testid="tab-map">
              <Map className="w-4 h-4 mr-2" />
              Interactive Map
            </TabsTrigger>
            <TabsTrigger value="list" data-testid="tab-list">
              <List className="w-4 h-4 mr-2" />
              Guest List
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4" data-testid="content-map">
            <div className="mb-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                guests={guests}
                tables={tables}
              />
            </div>
            <div className="w-full">
              <InteractiveTerraMap
                tables={tables}
                guestCounts={guestCounts}
                selectedFaction={selectedFaction}
                onFactionSelect={handleMapFactionSelect}
              />
            </div>
          </TabsContent>

          <TabsContent value="list" data-testid="content-list">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tablesByGuest.map(({ table, guests: tableGuests }) => (
                <Card key={table.id} className="overflow-hidden" data-testid={`table-card-${table.id}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-location text-xl flex items-center justify-between">
                      <span>{table.name}</span>
                      <span className="text-sm text-muted-foreground font-sans">
                        {tableGuests.length} {tableGuests.length === 1 ? 'guest' : 'guests'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tableGuests.map((guest) => (
                        <div
                          key={guest.id}
                          className="flex items-center justify-between p-2 rounded-md hover-elevate active-elevate-2 cursor-pointer transition-colors"
                          data-testid={`guest-item-${guest.id}`}
                        >
                          <span className="font-sans font-medium text-sm">{guest.name}</span>
                          <FactionBadge faction={guest.faction as Faction} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="faction-dialog">
          {dialogFaction && (
            <>
              <DialogHeader>
                <DialogTitle className="font-brand text-2xl uppercase tracking-wide flex items-center gap-3">
                  <FactionBadge faction={dialogFaction} />
                  {dialogFaction}
                </DialogTitle>
                <DialogDescription className="font-display text-base">
                  Seating arrangement for this table
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6">
                <CircularTable 
                  guests={getGuestsForFaction(dialogFaction)} 
                  tableName={dialogFaction}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
