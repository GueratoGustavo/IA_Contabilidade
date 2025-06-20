// models/BankConnection.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class BankConnection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  provider: "Belvo" | "OpenBanking" | "Manual";

  @Column()
  accessToken: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true, type: "timestamp" })
  expiresAt?: Date;

  @Column()
  status: "active" | "expired" | "revoked";

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
