import { type User, type InsertUser, type Guest, type InsertGuest, type Table, type InsertTable } from "@shared/schema";
import { randomUUID } from "crypto";
import { tables as initialTables, guests as initialGuests } from "@shared/wedding-data";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;
  
  getAllUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllTables(): Promise<Table[]>;
  getTable(id: string): Promise<Table | undefined>;
  createTable(table: InsertTable): Promise<Table>;
  updateTable(id: string, table: Partial<InsertTable>): Promise<Table | undefined>;
  deleteTable(id: string): Promise<boolean>;
  
  getAllGuests(): Promise<Guest[]>;
  getGuest(id: string): Promise<Guest | undefined>;
  getGuestsByTable(tableId: string): Promise<Guest[]>;
  createGuest(guest: InsertGuest): Promise<Guest>;
  updateGuest(id: string, guest: Partial<InsertGuest>): Promise<Guest | undefined>;
  deleteGuest(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  public sessionStore: session.Store;
  private users: Map<string, User>;
  private tables: Map<string, Table>;
  private guests: Map<string, Guest>;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.users = new Map();
    this.tables = new Map();
    this.guests = new Map();
    
    initialTables.forEach(table => this.tables.set(table.id, table));
    initialGuests.forEach(guest => this.guests.set(guest.id, guest));
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTables(): Promise<Table[]> {
    return Array.from(this.tables.values());
  }

  async getTable(id: string): Promise<Table | undefined> {
    return this.tables.get(id);
  }

  async createTable(insertTable: InsertTable): Promise<Table> {
    const table: Table = { ...insertTable };
    this.tables.set(table.id, table);
    return table;
  }

  async updateTable(id: string, updates: Partial<InsertTable>): Promise<Table | undefined> {
    const table = this.tables.get(id);
    if (!table) return undefined;
    
    const updatedTable: Table = { ...table, ...updates };
    this.tables.set(id, updatedTable);
    return updatedTable;
  }

  async deleteTable(id: string): Promise<boolean> {
    return this.tables.delete(id);
  }

  async getAllGuests(): Promise<Guest[]> {
    return Array.from(this.guests.values());
  }

  async getGuest(id: string): Promise<Guest | undefined> {
    return this.guests.get(id);
  }

  async getGuestsByTable(tableId: string): Promise<Guest[]> {
    return Array.from(this.guests.values()).filter(
      (guest) => guest.tableId === tableId
    );
  }

  async createGuest(insertGuest: InsertGuest): Promise<Guest> {
    const guest: Guest = { ...insertGuest };
    this.guests.set(guest.id, guest);
    return guest;
  }

  async updateGuest(id: string, updates: Partial<InsertGuest>): Promise<Guest | undefined> {
    const guest = this.guests.get(id);
    if (!guest) return undefined;
    
    const updatedGuest: Guest = { ...guest, ...updates };
    this.guests.set(id, updatedGuest);
    return updatedGuest;
  }

  async deleteGuest(id: string): Promise<boolean> {
    return this.guests.delete(id);
  }
}

export const storage = new MemStorage();
