export interface Transaction {
  id: string;
  accountId: string;
  date: Date;
  description: string;
  amount: number;
  type: "credit" | "debit" | "transfer" | "payment" | "receipt";

  paymentMethod?:
    | "pix"
    | "ted"
    | "doc"
    | "boleto"
    | "cartao_credito"
    | "cartao_debito"
    | "dinheiro"
    | "transferencia_interna"
    | "outros";

  category?: string;
  classifiedBy: "manual" | "ai";
  createdAt: Date;
  updatedAt: Date;
}
