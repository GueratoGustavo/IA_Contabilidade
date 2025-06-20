export interface OpenBankingTransactionResponse {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  type: "credit" | "debit";
}
