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
          process.env.TINK_TOKEN_URL!,
          process.env.TINK_API_URL!,
          process.env.TINK_SCOPES!.split(",")
        );

      case "truelayer":
        return new OpenBankingClient(
          process.env.TRUELAYER_CLIENT_ID!,
          process.env.TRUELAYER_CLIENT_SECRET!,
          process.env.TRUELAYER_TOKEN_URL!,
          process.env.TRUELAYER_API_URL!,
          process.env.TRUELAYER_SCOPES!.split(" ")
        );

      default:
        throw new Error("Provider not supported");
    }
  }
}
