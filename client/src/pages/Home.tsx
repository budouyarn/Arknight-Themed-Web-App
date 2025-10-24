import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import WelcomePage from "@/components/WelcomePage";
import SearchBar from "@/components/SearchBar";
import InteractiveTerraMap from "@/components/InteractiveTerraMap";
import CircularTable from "@/components/CircularTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FactionBadge from "@/components/FactionBadge";
import { Map, List, X, Heart } from "lucide-react";
import type { Faction, Guest, Table } from "@shared/schema";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTableId, setHighlightedTableId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogFaction, setDialogFaction] = useState<Faction | null>(null);
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const [currentView, setCurrentView] = useState<"map" | "list">("map");
  const [chatOpen, setChatOpen] = useState(false);
  const [showChatBadge, setShowChatBadge] = useState(false);

  useEffect(() => {
    if (hasEntered) {
      const timer = setTimeout(() => {
        setShowChatBadge(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasEntered]);

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
      {/* View Tabs - Top Right */}
      <div className="fixed top-6 right-6 z-40 flex gap-2">
        <Button 
          variant={currentView === "map" ? "default" : "outline"}
          onClick={() => setCurrentView("map")}
          data-testid="button-view-map"
        >
          <Map className="w-4 h-4 mr-2" />
          Table Map
        </Button>
        <Button 
          variant={currentView === "list" ? "default" : "outline"}
          onClick={() => setCurrentView("list")}
          data-testid="button-view-list"
        >
          <List className="w-4 h-4 mr-2" />
          Guest List
        </Button>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Table Map View */}
        {currentView === "map" && (
          <div className="space-y-4" data-testid="content-map">
            <div className="mb-6 max-w-md">
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
          </div>
        )}

        {/* Guest List View */}
        {currentView === "list" && (
          <div data-testid="content-list">
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
          </div>
        )}
      </div>

      {/* Faction Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="faction-dialog">
          {dialogFaction && (
            <>
              <DialogHeader className="text-center">
                <DialogTitle className="font-brand text-2xl uppercase tracking-wide flex items-center justify-center gap-3">
                  <FactionBadge faction={dialogFaction} />
                  {dialogFaction}
                </DialogTitle>
                <DialogDescription className="font-display text-base text-center">
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

      {/* Chat Notification - Phone-like Interface */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {chatOpen && (
          <div 
            className="mb-4 w-96 bg-background rounded-lg shadow-2xl border-2 animate-in slide-in-from-bottom-5 duration-300"
            data-testid="chat-window"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Leandro & Sherine</div>
                  <div className="text-xs opacity-90">The Couple</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChatOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20"
                data-testid="button-close-chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto bg-muted/30">
              <div className="flex flex-col gap-3">
                {/* Message Bubble */}
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex-shrink-0 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-background rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border">
                      <p className="text-sm leading-relaxed">
                        Thank you for joining us on our special day! 🎉
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 ml-2">Just now</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex-shrink-0 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-background rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border">
                      <p className="text-sm leading-relaxed">
                        We're thrilled to celebrate this moment with you. Please find your seat and enjoy the celebration! 💕
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 ml-2">Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Bubble Button */}
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setShowChatBadge(false);
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center relative"
          data-testid="button-chat-toggle"
        >
          <Heart className="w-8 h-8 text-white fill-white" />
          {showChatBadge && !chatOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
