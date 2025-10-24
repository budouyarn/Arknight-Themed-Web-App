import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Plus, Pencil, Trash2, Users, ArrowRight, LogOut, Home as HomeIcon } from "lucide-react";
import type { Guest, Table, Faction } from "@shared/schema";
import { factions } from "@shared/schema";
import FactionBadge from "@/components/FactionBadge";

export default function Admin() {
  const { toast } = useToast();
  const { logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isEditGuestOpen, setIsEditGuestOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);

  const { data: tables = [], isLoading: tablesLoading } = useQuery<Table[]>({
    queryKey: ["/api/tables"],
  });

  const { data: guests = [], isLoading: guestsLoading } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  const deleteGuestMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/guests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guests"] });
      toast({
        title: "Guest deleted",
        description: "Guest has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete guest. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateGuestMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Guest> }) => {
      return await apiRequest("PATCH", `/api/guests/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guests"] });
      toast({
        title: "Guest updated",
        description: "Guest has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update guest. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleMoveGuest = (guestId: string, newTableId: string) => {
    updateGuestMutation.mutate({ id: guestId, data: { tableId: newTableId } });
  };

  const guestsByTable = guests.reduce((acc, guest) => {
    if (!acc[guest.tableId]) {
      acc[guest.tableId] = [];
    }
    acc[guest.tableId].push(guest);
    return acc;
  }, {} as Record<string, Guest[]>);

  if (tablesLoading || guestsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-brand font-bold text-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-brand font-bold text-4xl text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground font-display">
              Manage seating assignments and guest lists
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              data-testid="button-home"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-guest">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Guest
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-brand">Add New Guest</DialogTitle>
                </DialogHeader>
                <AddGuestForm
                  tables={tables}
                  onSuccess={() => setIsAddGuestOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid="button-add-table">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Table
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-brand">Add New Table</DialogTitle>
                </DialogHeader>
                <AddTableForm onSuccess={() => setIsAddTableOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          {tables.map((table) => {
            const tableGuests = guestsByTable[table.id] || [];
            return (
              <Card key={table.id} data-testid={`card-table-${table.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="font-brand text-2xl">{table.name}</CardTitle>
                      <FactionBadge faction={table.name as Faction} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-display">
                      <Users className="w-4 h-4" />
                      <span>{tableGuests.length} guests</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tableGuests.map((guest) => (
                      <GuestCard
                        key={guest.id}
                        guest={guest}
                        tables={tables}
                        onMove={handleMoveGuest}
                        onEdit={(guest) => {
                          setSelectedGuest(guest);
                          setIsEditGuestOpen(true);
                        }}
                        onDelete={(id) => deleteGuestMutation.mutate(id)}
                      />
                    ))}
                    {tableGuests.length === 0 && (
                      <div className="col-span-full text-center py-8 text-muted-foreground font-display">
                        No guests assigned to this table
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Dialog open={isEditGuestOpen} onOpenChange={setIsEditGuestOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-brand">Edit Guest</DialogTitle>
            </DialogHeader>
            {selectedGuest && (
              <EditGuestForm
                guest={selectedGuest}
                tables={tables}
                onSuccess={() => {
                  setIsEditGuestOpen(false);
                  setSelectedGuest(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function GuestCard({
  guest,
  tables,
  onMove,
  onEdit,
  onDelete,
}: {
  guest: Guest;
  tables: Table[];
  onMove: (guestId: string, tableId: string) => void;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
}) {
  const [selectedTableId, setSelectedTableId] = useState<string>("");

  return (
    <div
      className="p-4 border-2 border-primary/20 rounded-md bg-card hover-elevate"
      style={{
        clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
      }}
      data-testid={`card-guest-${guest.id}`}
    >
      <div className="space-y-3">
        <div>
          <h4 className="font-brand font-bold text-foreground">{guest.name}</h4>
          <p className="text-xs text-muted-foreground font-display mt-1">
            {guest.faction}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedTableId}
            onValueChange={(value) => {
              setSelectedTableId(value);
              onMove(guest.id, value);
            }}
          >
            <SelectTrigger className="flex-1 h-8" data-testid={`select-move-guest-${guest.id}`}>
              <SelectValue placeholder="Move to..." />
            </SelectTrigger>
            <SelectContent>
              {tables
                .filter((t) => t.id !== guest.tableId)
                .map((table) => (
                  <SelectItem key={table.id} value={table.id}>
                    {table.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(guest)}
            data-testid={`button-edit-guest-${guest.id}`}
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(guest.id)}
            data-testid={`button-delete-guest-${guest.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddGuestForm({
  tables,
  onSuccess,
}: {
  tables: Table[];
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    faction: "" as Faction | "",
    tableId: "",
  });

  const addGuestMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/guests", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guests"] });
      toast({
        title: "Guest added",
        description: "Guest has been added successfully.",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to add guest. Please check the data and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGuestMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="guest-id">ID</Label>
        <Input
          id="guest-id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="guest-1"
          required
          data-testid="input-guest-id"
        />
      </div>

      <div>
        <Label htmlFor="guest-name">Name</Label>
        <Input
          id="guest-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Guest Name"
          required
          data-testid="input-guest-name"
        />
      </div>

      <div>
        <Label htmlFor="guest-faction">Faction</Label>
        <Select
          value={formData.faction}
          onValueChange={(value) =>
            setFormData({ ...formData, faction: value as Faction })
          }
        >
          <SelectTrigger id="guest-faction" data-testid="select-guest-faction">
            <SelectValue placeholder="Select faction" />
          </SelectTrigger>
          <SelectContent>
            {factions.map((faction) => (
              <SelectItem key={faction} value={faction}>
                {faction}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="guest-table">Table</Label>
        <Select
          value={formData.tableId}
          onValueChange={(value) => setFormData({ ...formData, tableId: value })}
        >
          <SelectTrigger id="guest-table" data-testid="select-guest-table">
            <SelectValue placeholder="Select table" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table.id} value={table.id}>
                {table.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={addGuestMutation.isPending} data-testid="button-submit-guest">
        {addGuestMutation.isPending ? "Adding..." : "Add Guest"}
      </Button>
    </form>
  );
}

function EditGuestForm({
  guest,
  tables,
  onSuccess,
}: {
  guest: Guest;
  tables: Table[];
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: guest.name,
    faction: guest.faction as Faction,
    tableId: guest.tableId,
  });

  const editGuestMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("PATCH", `/api/guests/${guest.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guests"] });
      toast({
        title: "Guest updated",
        description: "Guest has been updated successfully.",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update guest. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editGuestMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="edit-guest-name">Name</Label>
        <Input
          id="edit-guest-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          data-testid="input-edit-guest-name"
        />
      </div>

      <div>
        <Label htmlFor="edit-guest-faction">Faction</Label>
        <Select
          value={formData.faction}
          onValueChange={(value) =>
            setFormData({ ...formData, faction: value as Faction })
          }
        >
          <SelectTrigger id="edit-guest-faction" data-testid="select-edit-guest-faction">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {factions.map((faction) => (
              <SelectItem key={faction} value={faction}>
                {faction}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="edit-guest-table">Table</Label>
        <Select
          value={formData.tableId}
          onValueChange={(value) => setFormData({ ...formData, tableId: value })}
        >
          <SelectTrigger id="edit-guest-table" data-testid="select-edit-guest-table">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table.id} value={table.id}>
                {table.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={editGuestMutation.isPending} data-testid="button-submit-edit-guest">
        {editGuestMutation.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}

function AddTableForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: "",
    name: "" as Faction | "",
    gridX: 0,
    gridY: 0,
  });

  const addTableMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/tables", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tables"] });
      toast({
        title: "Table added",
        description: "Table has been added successfully.",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to add table. Please check the data and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTableMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="table-id">ID</Label>
        <Input
          id="table-id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="table-name"
          required
          data-testid="input-table-id"
        />
      </div>

      <div>
        <Label htmlFor="table-name">Name (Faction)</Label>
        <Select
          value={formData.name}
          onValueChange={(value) =>
            setFormData({ ...formData, name: value as Faction })
          }
        >
          <SelectTrigger id="table-name" data-testid="select-table-name">
            <SelectValue placeholder="Select faction" />
          </SelectTrigger>
          <SelectContent>
            {factions.map((faction) => (
              <SelectItem key={faction} value={faction}>
                {faction}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="table-grid-x">Grid X</Label>
          <Input
            id="table-grid-x"
            type="number"
            value={formData.gridX}
            onChange={(e) =>
              setFormData({ ...formData, gridX: parseInt(e.target.value) })
            }
            required
            data-testid="input-table-grid-x"
          />
        </div>

        <div>
          <Label htmlFor="table-grid-y">Grid Y</Label>
          <Input
            id="table-grid-y"
            type="number"
            value={formData.gridY}
            onChange={(e) =>
              setFormData({ ...formData, gridY: parseInt(e.target.value) })
            }
            required
            data-testid="input-table-grid-y"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={addTableMutation.isPending} data-testid="button-submit-table">
        {addTableMutation.isPending ? "Adding..." : "Add Table"}
      </Button>
    </form>
  );
}
