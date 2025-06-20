import { Transaction } from "./Transaction"; 
export interface ParsedDocument {
  id: string;
  userId: string;
  source: "csv" | "pdf" | "openbanking" | "belvo";
  parsedAt: Date;
  transactions: Transaction[];
}
