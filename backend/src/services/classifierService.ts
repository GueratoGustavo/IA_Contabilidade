import axios from "axios";

const CLASSIFIER_URL = process.env.CLASSIFIER_URL || "http://localhost:8000";

export const classifyDocumentService = async (
  text: string
): Promise<string> => {
  try {
    interface ClassifierResponse {
      prediction: string;
    }

    const response = await axios.post(`${CLASSIFIER_URL}/predict`, { text });
    const data = response.data as ClassifierResponse;
    return data.prediction;
  } catch (error) {
    console.error("Erro ao chamar o classificador:", error);
    throw new Error("Falha na classificação do documento");
  }
};
