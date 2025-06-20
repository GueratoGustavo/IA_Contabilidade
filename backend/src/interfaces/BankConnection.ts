export interface BankConnection {
  id: string;
  userId: string;
  provider: "Belvo" | "OpenBanking" | "Manual";
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  status: "active" | "expired" | "revoked";
  createdAt: Date;
  updatedAt: Date;
}
