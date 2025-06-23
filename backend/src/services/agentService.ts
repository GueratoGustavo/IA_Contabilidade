interface Task {
  id: string;
  description: string;
}

export const agentConversationService = (message: string): string => {
  return `IA: Recebi sua mensagem "${message}". Como posso te ajudar mais?`;
};

export const getAgentTasksService = (): Task[] => {
  return [
    { id: "task1", description: "Analisar fluxo de caixa" },
    { id: "task2", description: "Recomendar investimentos" },
  ];
};

export const createAgentTaskService = (description: string): Task => {
  // Aqui você pode gerar um ID real, armazenar em banco, etc.
  return { id: "task3", description };
};
