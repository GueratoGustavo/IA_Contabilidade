// models/Transaction.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => BankAccount, (account) => account.transactions)
  account: BankAccount;

  @Column({ type: "date" })
  date: Date;

  @Column()
  description: string;

  @Column({ type: "float" })
  amount: number;

  @Column()
  type: "credit" | "debit" | "transfer" | "payment" | "receipt";

  @Column({
    nullable: true,
  })
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

  @Column({ nullable: true })
  category?: string;

  @Column()
  classifiedBy: "manual" | "ai";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
