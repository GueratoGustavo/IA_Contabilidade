import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

interface OAuthTokenResponse {
  access_token: string;
  token_type?: string;
  expires_in: number;
  scope?: string;
  refresh_token?: string;
}

export class OpenBankingClient {
  private axiosInstance: AxiosInstance;
  private token?: string;
  private tokenExpiresAt?: number;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private tokenUrl: string,
    private apiBaseUrl: string,
    private scopes?: string[]
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.apiBaseUrl,
      timeout: 15000,
    });
  }

  private async fetchToken(): Promise<void> {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", this.clientId);
    params.append("client_secret", this.clientSecret);
    if (this.scopes) {
      params.append("scope", this.scopes.join(" "));
    }

    const response = await axios.post<OAuthTokenResponse>(
      this.tokenUrl,
      params.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    this.token = response.data.access_token;
    this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000 - 60000;
  }

  private async ensureTokenValid(): Promise<void> {
    if (
      !this.token ||
      !this.tokenExpiresAt ||
      Date.now() >= this.tokenExpiresAt
    ) {
      await this.fetchToken();
    }
  }

  private async request<T>(
    method: "get" | "post" | "put" | "delete",
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    await this.ensureTokenValid();
    const response = await this.axiosInstance.request<T>({
      method,
      url: endpoint,
      headers: { Authorization: `Bearer ${this.token}` },
      ...config,
    });
    return response.data;
  }

  get<T>(endpoint: string, config?: AxiosRequestConfig) {
    return this.request<T>("get", endpoint, config);
  }

  post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("post", endpoint, { ...config, data });
  }
}
