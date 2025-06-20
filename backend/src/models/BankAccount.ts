// models/BankAccount.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Transaction } from "../models/Transaction";
import "reflect-metadata";

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column()
  bankName: string;

  @Column()
  accountType: "checking" | "savings" | "credit" | "investment";

  @Column()
  accountNumber: string;

  @Column({ type: "float" })
  balance: number;

  @Column()
  currency: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
