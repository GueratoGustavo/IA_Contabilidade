import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCashflowService = async (userId: string) => {
  const accounts = await prisma.account.findMany({
    where: { userId },
    select: { id: true },
  });
  const accountIds = accounts.map((acc: { id: string }) => acc.id);

  if (accountIds.length === 0) {
    return { income: 0, expenses: 0, balance: 0 };
  }

  const incomes = await prisma.transaction.aggregate({
    where: {
      accountId: { in: accountIds },
      type: "income",
    },
    _sum: { amount: true },
  });

  const expenses = await prisma.transaction.aggregate({
    where: {
      accountId: { in: accountIds },
      type: "expense",
    },
    _sum: { amount: true },
  });

  const incomeSum = incomes._sum.amount ?? 0;
  const expensesSum = expenses._sum.amount ?? 0;

  return {
    income: incomeSum,
    expenses: expensesSum,
    balance: incomeSum - expensesSum,
  };
};

export const getSummaryService = async (userId: string) => {
  const accounts = await prisma.account.findMany({
    where: { userId },
    select: { id: true },
  });
  const accountIds = accounts.map((acc: { id: string }) => acc.id);

  const totalAccounts = accounts.length;

  const totalTransactions = await prisma.transaction.count({
    where: {
      accountId: { in: accountIds },
    },
  });

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const monthlyIncomeAgg = await prisma.transaction.aggregate({
    where: {
      accountId: { in: accountIds },
      type: "income",
      date: { gte: startOfMonth },
    },
    _sum: { amount: true },
  });

  const monthlyExpensesAgg = await prisma.transaction.aggregate({
    where: {
      accountId: { in: accountIds },
      type: "expense",
      date: { gte: startOfMonth },
    },
    _sum: { amount: true },
  });

  return {
    totalAccounts,
    totalTransactions,
    monthlyIncome: monthlyIncomeAgg._sum.amount ?? 0,
    monthlyExpenses: monthlyExpensesAgg._sum.amount ?? 0,
  };
};

export const getPredictionsService = async (userId: string) => {
  const cashflow = await getCashflowService(userId);

  const nextMonthBalance =
    cashflow.balance - cashflow.expenses * 1.05 + cashflow.income;

  return {
    nextMonthBalance,
    expenseTrend: "Aumentando 5%",
    incomeTrend: "Estável",
  };
};
