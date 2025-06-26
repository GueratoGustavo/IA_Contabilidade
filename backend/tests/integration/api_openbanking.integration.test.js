const ApiOpenBanking = require("../../api_openbanking");

describe("Integration Test - ApiOpenBanking", () => {
    test("autentica e obtém saldo com credenciais reais", async () => {
        const client = new ApiOpenBanking({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            baseUrl: process.env.API_BASE_URL,
        });

        await client.authenticate();
        const balance = await client.getAccountBalance("account-123");
        expect(typeof balance).toBe("number");
    });

    test("erro com credenciais inválidas", async () => {
        const client = new ApiOpenBanking({
            clientId: "invalid",
            clientSecret: "invalid",
            baseUrl: "https://invalid-api.test",
        });

        await expect(client.getAccountBalance("acc123")).rejects.toThrow();
    });

    test("token armazenado e reutilizado", async () => {
        const client = new ApiOpenBanking({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            baseUrl: process.env.API_BASE_URL,
        });

        await client.authenticate();
        const bal1 = await client.getAccountBalance("acc1");
        const bal2 = await client.getAccountBalance("acc2");

        expect(client.token).toBeDefined();
        expect(typeof bal1).toBe("number");
        expect(typeof bal2).toBe("number");
    });
});
