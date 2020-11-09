import Axios, { AxiosInstance } from 'axios';
import { SimpleAlbum } from '@discover-daily/integrations/spotify';

export class ApiClient {
  private readonly http: AxiosInstance;

  constructor(private readonly baseURL: string) {
    this.http = Axios.create({ baseURL });
  }

  get loginUrl() {
    return `${this.baseURL}/api/auth/spotify`;
  }

  async newReleases(): Promise<SimpleAlbum[]> {
    const { data } = await this.http.get('/api/new-releases');
    return data;
  }

  logout() {
    return this.http.post('/api/auth/logout');
  }
}
