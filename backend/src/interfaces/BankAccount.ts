export interface BankAccount {
  id: string;
  userId: string;
  bankName: string;
  accountType: "checking" | "savings" | "credit" | "investment";
  accountNumber: string;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
