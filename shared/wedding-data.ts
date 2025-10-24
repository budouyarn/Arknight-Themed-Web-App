import type { Guest, Table } from "./schema";

export const tables: Table[] = [
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

export const guests: Guest[] = [
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
