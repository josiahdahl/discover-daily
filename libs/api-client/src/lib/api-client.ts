import Axios, { AxiosError, AxiosInstance } from 'axios';
import { SimpleAlbum } from '@discover-daily/integrations/spotify';
import { Result, Ok, Err } from '@hqoss/monads';

export class ApiClient {
  private readonly http: AxiosInstance;

  constructor(private readonly baseURL: string) {
    this.http = Axios.create({ baseURL });
  }

  get loginUrl() {
    return `${this.baseURL}/api/auth/spotify`;
  }

  async newReleases(): Promise<Result<SimpleAlbum[], AxiosError>> {
    try {
      const response = await this.http.get('/api/new-releases');
      return Ok(response.data);
    } catch (e) {
      return Err(e);
    }
  }

  logout() {
    return this.http.post('/api/auth/logout');
  }
}
