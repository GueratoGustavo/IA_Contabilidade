class BankingService {
  static async getAccounts() {
    return [
      { id: "acc1", name: "Conta Corrente", balance: 4500 },
      { id: "acc2", name: "Conta Poupança", balance: 12000.5 },
    ];
  }

  static async getTransactions() {
    return [
      { id: "tx1", description: "Supermercado", amount: -150.5 },
      { id: "tx2", description: "Salário", amount: 5000 },
    ];
  }

  static async connectBank() {
    return { message: "Banco conectado com sucesso" };
  }
}

export default BankingService;
