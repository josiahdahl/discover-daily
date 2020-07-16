import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AlbumType, NewReleasesDto, SimpleAlbum } from '../interfaces/spotify';
import { asyncClient } from '../core/redis';

function isAxiosError(res: any): res is AxiosError {
  return (res as AxiosError).isAxiosError;
}

export interface SpotifyClient {
  newReleases(albumType?: AlbumType, country?: string): Promise<SimpleAlbum[]>;
}

async function fetchNewReleases(client: AxiosInstance, albumType: AlbumType, country: string) {
  const reqs = [];
  for (let i = 0; i < 10; i++) {
    reqs.push(client.get('/browse/new-releases', { params: { country, offset: i * 50, limit: 50 } }).catch(e => e));
  }
  const results = await Axios.all<AxiosResponse<NewReleasesDto> | AxiosError>(reqs);
  const releases = results.reduce<SimpleAlbum[]>((acc, r) => {
    if (isAxiosError(r)) {
      console.log(`Axios Error: ${r.request}`);
      return acc;
    }
    console.log(`Found ${r.data.albums.items.length} new releases`);
    for (const item of r.data.albums.items) {
      acc.push(item);
    }
    return acc;
  }, []);
  // TODO: Cache releases by country
  console.log(releases[0].album_type);
  return releases.filter(r => r.album_type === albumType);
}

export function spotify(token: string): SpotifyClient {
  const client = Axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: { Authorization: `Bearer ${token}` },
  });

  return {
    async newReleases(albumType: AlbumType = AlbumType.album, country = 'US') {
      const redisKey = `new-releases:${albumType}:${country}`;
      if (await asyncClient('exists', redisKey)) {
        console.log(`Found ${redisKey}.`);
        return JSON.parse(await asyncClient('get', redisKey));
      }
      const newReleases = await fetchNewReleases(client, albumType, country);
      await asyncClient('set', redisKey, JSON.stringify(newReleases), 'EX', 60 * 20 /* 20 minutes */);
      return newReleases;
    },
  };
}
