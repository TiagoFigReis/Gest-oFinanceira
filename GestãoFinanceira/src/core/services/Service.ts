import httpClient from '../../auth/httpConfig';

export class BaseService<T> {
  protected endpoint: string;
  protected http = httpClient

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public async getAll(): Promise<T[]> {
    const response = await this.http.get(`/${this.endpoint}`);
    return response.data;
  }

  public async getById(id: string | number): Promise<T> {
    const response = await this.http.get(`/${this.endpoint}/${id}`);
    return response.data;
  }

  public async create(data: T): Promise<T> {
    const response = await this.http.post(`/${this.endpoint}`, data);
    return response.data;
  }

  public async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await this.http.put(`/${this.endpoint}/${id}`, data);
    return response.data;
  }

  public async delete(id: string | number): Promise<void> {
    await this.http.delete(`/${this.endpoint}/${id}`);
  }
}