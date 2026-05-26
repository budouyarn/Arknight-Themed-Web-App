import type { Express } from "express";
import { storage } from "./storage";
import { insertGuestSchema, insertTableSchema, updateGuestSchema, updateTableSchema } from "@shared/schema";
import { setupAuth } from "./auth";

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<void> {
  setupAuth(app);
  
  // Public routes (read-only for guests)
  app.get("/api/tables", async (req, res) => {
    const tables = await storage.getAllTables();
    res.json(tables);
  });

  app.get("/api/tables/:id", async (req, res) => {
    const table = await storage.getTable(req.params.id);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.json(table);
  });

  app.post("/api/tables", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTableSchema.parse(req.body);
      const table = await storage.createTable(validatedData);
      res.status(201).json(table);
    } catch (error) {
      res.status(400).json({ error: "Invalid table data" });
    }
  });

  app.patch("/api/tables/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateTableSchema.parse(req.body);
      const table = await storage.updateTable(req.params.id, validatedData);
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      res.json(table);
    } catch (error) {
      res.status(400).json({ error: "Invalid table data" });
    }
  });

  app.delete("/api/tables/:id", requireAuth, async (req, res) => {
    const success = await storage.deleteTable(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Table not found" });
    }
    res.status(204).send();
  });

  // Guests routes
  app.get("/api/guests", async (req, res) => {
    const guests = await storage.getAllGuests();
    res.json(guests);
  });

  app.get("/api/guests/:id", async (req, res) => {
    const guest = await storage.getGuest(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    res.json(guest);
  });

  app.get("/api/tables/:tableId/guests", async (req, res) => {
    const guests = await storage.getGuestsByTable(req.params.tableId);
    res.json(guests);
  });

  app.post("/api/guests", requireAuth, async (req, res) => {
    try {
      const validatedData = insertGuestSchema.parse(req.body);
      const guest = await storage.createGuest(validatedData);
      res.status(201).json(guest);
    } catch (error) {
      res.status(400).json({ error: "Invalid guest data" });
    }
  });

  app.patch("/api/guests/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = updateGuestSchema.parse(req.body);
      
      if (validatedData.tableId) {
        const table = await storage.getTable(validatedData.tableId);
        if (!table) {
          return res.status(400).json({ error: "Invalid table ID" });
        }
      }
      
      const guest = await storage.updateGuest(req.params.id, validatedData);
      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }
      res.json(guest);
    } catch (error) {
      res.status(400).json({ error: "Invalid guest data" });
    }
  });

  app.delete("/api/guests/:id", requireAuth, async (req, res) => {
    const success = await storage.deleteGuest(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Guest not found" });
    }
    res.status(204).send();
  });

}
