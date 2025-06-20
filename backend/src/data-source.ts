import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./models/User";
import { BankAccount } from "./models/BankAccount";
import { Transaction } from "./models/Transaction";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "agente_db",
  synchronize: true,
  logging: true,
  entities: [User, BankAccount, Transaction],
});
