import axios from "axios";

export class OpenBankingClient {
  private client: ReturnType<typeof axios.create>;

  constructor(baseURL: string, apiKey: string, timeoutMs = 15000) {
    this.client = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${apiKey}` },
      timeout: timeoutMs,
    });
  }

  async getResource<T>(path: string): Promise<T> {
    try {
      const resp = await this.client.get<T>(path);
      return resp.data;
    } catch (err: unknown) {
      console.error(`OpenBankingClient GET [${path}] error:`, err);
      throw err;
    }
  }

  async createResource<T>(path: string, body: any): Promise<T> {
    try {
      const resp = await this.client.post<T>(path, body);
      return resp.data;
    } catch (err: unknown) {
      console.error(`OpenBankingClient POST [${path}] error:`, err);
      throw err;
    }
  }
}
