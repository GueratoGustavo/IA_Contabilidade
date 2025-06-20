export interface ClassificationResult {
  transactionId: string;
  predictedCategory: string;
  confidence: number;
  modelVersion: string;
}
