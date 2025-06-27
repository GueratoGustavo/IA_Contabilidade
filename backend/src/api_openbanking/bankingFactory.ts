import { OpenBankingClient } from "./openBankingClient";
import { BelvoClient } from "./belvoClient";

export class BankingFactory {
  static create(provider: "belvo" | "tink" | "truelayer") {
    switch (provider) {
      case "belvo":
        return new BelvoClient(
          process.env.BELVO_API_URL!,
          process.env.BELVO_SECRET_ID!,
          process.env.BELVO_SECRET_PASSWORD!
        );

      case "tink":
        return new OpenBankingClient(
          process.env.TINK_CLIENT_ID!,
          process.env.TINK_CLIENT_SECRET!,
          Number(process.env.TINK_TIMEOUT_MS) || 15000
        );

      case "truelayer":
        return new OpenBankingClient(
          process.env.TRUELAYER_CLIENT_ID!,
          process.env.TRUELAYER_CLIENT_SECRET!,
          Number(process.env.TRUELAYER_TIMEOUT_MS) || 15000
        );

      default:
        throw new Error(`Provider '${provider}' not supported`);
    }
  }
}
