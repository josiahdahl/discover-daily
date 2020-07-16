import * as React from 'react';
import { useEffect, useState } from 'react';
import { SimpleAlbum } from '../../../../api/src/app/interfaces/spotify';
import { apiClient } from '../services/api-client';

const Releases = (props: { releases: SimpleAlbum[] }) => <section className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-1 md:gap-3">
  {props.releases.map(release => <article className="border border-r shadow flex flex-col" key={release.id}>
    <img src={release.images[0].url} className="w-full" alt={`${release.name} album art`}/>
    <div className="p-2 flex flex-col justify-between flex-grow">
      <div className="flex-grow mb-3">
        <h2 className="md:text-lg xl:text-xl">{release.name}</h2>
        <p className="text-sm">{release.artists[0].name}</p>
      </div>
    </div>
    <a href={release.external_urls.spotify} target="_blank" rel="nofollow noopenner"
       className="p-2 bg-teal-800 mx-auto block w-full text-center text-white uppercase">Listen</a>
  </article>)}
</section>;

export const Dashboard = () => {
  const [newReleases, setNewReleases] = useState<SimpleAlbum[]>([]);

  async function fetchNewReleases() {
    try {
      setNewReleases(await apiClient.newReleases());
    } catch (e) {
      setNewReleases([]);
    }
  }

  useEffect(() => {
    fetchNewReleases();
  }, []);

  return <main className="p-2">
    <h1 className="text-4xl font-bold mb-4">Discover Daily</h1>
    {newReleases.length === 0 ? <p>Fetching new releases...</p> : <Releases releases={newReleases}/>}
  </main>;
};
