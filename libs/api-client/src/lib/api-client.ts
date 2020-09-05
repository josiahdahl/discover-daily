import Axios, { AxiosInstance } from 'axios';
import { SimpleAlbum } from '../../../integrations/spotify/src/lib/interfaces/spotify';

export class ApiClient {
  private readonly http: AxiosInstance;

  constructor(private readonly baseURL: string) {
    this.http = Axios.create({ baseURL });
  }

  get loginUrl() {
    return `${this.baseURL}/api/auth/login`;
  }

  async hasSession() {
    try {
      const res = await this.http.get('/api/auth/session');
      return res.status === 200;
    } catch (e) {
      return false;
    }
  }

  async newReleases(): Promise<SimpleAlbum[]> {
    const { data } = await this.http.get('/api/new-releases');
    return data;
  }
}
