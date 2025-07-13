import type { User } from '../interfaces/User';
import { BaseService } from './Service'; 

class UserService extends BaseService<User> {
  constructor() {
    super('users');
  }

  public async getMe(): Promise<User> {
    const response = await this.http.get(`/${this.endpoint}/me`);
    return response.data;
  }

  public async updateMe(data: Partial<User>): Promise<User> {
    const response = await this.http.put(`/${this.endpoint}`, data);
    return response.data;
  }

  public async deleteMe(): Promise<void> {
    await this.http.delete(`/${this.endpoint}`);
  }

}

export default new UserService();