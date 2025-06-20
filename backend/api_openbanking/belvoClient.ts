import axios from "axios";

export class BelvoClient {
  private client: ReturnType<typeof axios.create>;

  /**
   * @param apiUrl Base URL da API Belvo
   * @param secretId ID secreto para autenticação
   * @param secretPassword Senha secreta para autenticação
   * @param timeoutMs Tempo máximo de resposta em ms
   */
  constructor(
    apiUrl: string,
    secretId: string,
    secretPassword: string,
    timeoutMs = 15000
  ) {
    this.client = axios.create({
      baseURL: apiUrl,
      auth: { username: secretId, password: secretPassword },
      timeout: timeoutMs,
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const resp = await this.client.get<T>(endpoint);
      return resp.data;
    } catch (err: unknown) {
      console.error(`BelvoClient GET [${endpoint}] error:`, err);
      throw err;
    }
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const resp = await this.client.post<T>(endpoint, data);
      return resp.data;
    } catch (err: unknown) {
      console.error(`BelvoClient POST [${endpoint}] error:`, err);
      throw err;
    }
  }
}
