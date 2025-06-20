import axios, { AxiosInstance } from "axios";

export class BelvoClient {
  private axiosInstance: AxiosInstance;

  constructor(apiUrl: string, secretId: string, secretPassword: string) {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      auth: { username: secretId, password: secretPassword },
      timeout: 15000,
    });
  }

  async get<T>(endpoint: string) {
    const response = await this.axiosInstance.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data?: any) {
    const response = await this.axiosInstance.post<T>(endpoint, data);
    return response.data;
  }
}
